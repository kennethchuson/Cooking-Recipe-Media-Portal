import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Bar, Pie } from 'react-chartjs-2'




function Statistics() {

    const [countUsers, setCountUsers] = useState([]) 
    const [countMeals, setCountMeals] = useState([]) 
    const [countIngredients, setCountIngredients] = useState([]) 
    const [countCategories, setCountCategories] = useState([])

    const [switchChart, setSwitchChart] = useState(true) 


    useEffect(() => {
        Axios.get("http://localhost:3001/api/get").then((response) => {
          setCountUsers(response.data) 
        })
    }, [])
    
    useEffect(() => {
        Axios.get("http://localhost:3001/api/get3").then((response) => {
          setCountMeals(response.data) 
        })
    }, [])

    useEffect(() => {
        Axios.get("http://localhost:3001/api/get2").then((response) => {
          setCountIngredients(response.data) 
        })
    }, [])
    
    useEffect(() => {
        Axios.get("http://localhost:3001/api/get4").then((response) => {
          setCountCategories(response.data) 
        })
    }, [])
    
    
    const getCountUsers = () => {
        let arr = [] 
        let result = 0 
        const test = Object.keys(countUsers).map((key) => {
            arr.push(key)
        }) 
        result = test.length
        return result 
    }

     
    const getCountMeals = () => {
        let arr = [] 
        let result = 0 
        const test = Object.keys(countMeals).map((key) => {
            arr.push(key)
        }) 
        result = test.length
        return result 
    }
    
     
    const getCountIngredients = () => {
        let arr = [] 
        let result = 0 
        const test = Object.keys(countIngredients).map((key) => {
            arr.push(key)
        }) 
        result = test.length
        return result 
    }
    
     
    const getCountCategories = () => {
        let arr = [] 
        let result = 0 
        const test = Object.keys(countCategories).map((key) => {
            arr.push(key)
        }) 
        result = test.length
        return result 
    }


    const getTotalData = () => {
        let list_data = [getCountUsers() , getCountMeals(), getCountIngredients(), getCountCategories()]
        let total = 0 
        for (let i = 0; i < list_data.length; i++) {
            total += list_data[i] 
        }
        return total 
    }



    const getMeanData = () => {
        let list_data = [getCountUsers() , getCountMeals(), getCountIngredients(), getCountCategories()]
        let sum = 0 
        let result = 0 
        for (let i = 0; i < list_data.length; i++) {
            sum += list_data[i] 
        }
        result = sum / list_data.length; 
        return result
        
    }

    const getstandardDeviationData = () => {
        let list_data = [getCountUsers() , getCountMeals(), getCountIngredients(), getCountCategories()]
        let part1 = [] 
        let part2 = 0
        let part3 = 0 
        let result = 0 

        for (let i = 0; i < list_data.length; i++) {
            part1.push(Math.pow((list_data[i] - getMeanData()), 2)) 
        }

        for (let i = 0; i < part1.length; i++) {
            part2 += part1[i] 
        }

        part3 = (1 / getTotalData()) * (part2) 
        result = Math.sqrt(part3) 

        return result
        
      
    }

    const determineTotalDataHighlight = () => {
        if (getTotalData() > 20) {
            return "TotalData-Stats-high"
        }
        if ((getTotalData() > 10 && getTotalData() < 20)) {
            return "TotalData-Stats-middle"
        }
        if (getTotalData() < 10) {
            return "TotalData-Stats-low"
        }
        return "TotalData-Stats" 
    }

    const determineMeanDataHighlight = () => {
        if (getMeanData() > 5.00) {
            return "Mean-Stats-high"
        }
        if ((getMeanData() > 2.00 && getMeanData() < 5.00)) {
            return "Mean-Stats-middle"
        }
        if (getMeanData() < 2.00) {
            return "Mean-Stats-low"
        }
        return "Mean-Stats" 
    }

    const determineSDDataHighlight = () => {
        if (getstandardDeviationData() > 1.21200000000) {
            return "SD-Stats-high"
        }
        if ((getstandardDeviationData() > 1.100000000 && getstandardDeviationData() < 1.21200000000)) {
            return "SD-Stats-middle"
        }
        if (getstandardDeviationData() < 1.10000000) {
            return "SD-Stats-low"
        }
        return "SD-Stats" 
    }




   

    const switchingChart = () => {
        setSwitchChart(!switchChart)
    }
    


    return (
        <div>
            <h1>Statistics</h1>
        
            <div className="BarGraph">
                {
                    switchChart === true? (
                        <Bar data={{
                            labels: ['Users', 'Meals', 'Ingredients', 'Categories'], 
                            datasets: [ 
                                    {
                                        data: [getCountUsers() , getCountMeals(), getCountIngredients(), getCountCategories()], 
                                        backgroundColor: ['orange', 'yellow', 'blue', 'violet']
                                    },
                                ],
                            }}
                            height={400}
                            width={600} 
                            options={{
                                maintainAspectRatio: false,
                            }}
                        />
                    ) 
                    : 
                    (
                        <Pie data={{
                            labels: ['Users', 'Meals', 'Ingredients', 'Categories'], 
                            datasets: [ 
                                    {
                                        data: [getCountUsers() , getCountMeals(), getCountIngredients(), getCountCategories()], 
                                        backgroundColor: ['orange', 'yellow', 'blue', 'violet']
                                    },
                                ],
                            }}
                            height={400}
                            width={600} 
                            options={{
                                maintainAspectRatio: false,
                            }}
                        />
                    )
                }
                
            </div>

            <div className="SelectionChart">
                <button className="switchChart_button" onClick={switchingChart}>Switch Chart</button> 
            </div> 
            
            <div className="description-Stats">
                <h5 className="text-TotalData">Total Data:  <h5 className={determineTotalDataHighlight()}>{getTotalData()}</h5></h5>
                <h5 className="text-MeanData">Mean Data:  <h5 className={determineMeanDataHighlight()}>{getMeanData()}</h5></h5>
                <h5 className="text-SDData">Standard Deviation Data:  <h5 className={determineSDDataHighlight()}>{getstandardDeviationData()}</h5></h5>


            </div>
        </div>
    )
}

export default Statistics

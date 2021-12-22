import React, {useState, useEffect} from 'react'
import MealLists from "../components/MealLists"
import Axios from 'axios'


function CreateMeal({Author, Settings}) {

    const [regionCountry, setRegionCountry] = useState("") 
    const [name, setName] = useState("") 
    const [servingSizes, setServingSizes] = useState("") 
    const [meals, setMeals] = useState([])

    const [expirationDate, setExpirationDate] = useState(0) 



    const submitMeal = () => {
        Axios.post("http://localhost:3001/api/insert3", 
        {
          regionCountry: regionCountry, 
          name: name, 
          servingSizes: servingSizes, 
          author: Author, 
          expirationDate: expirationDate
        }
        ).then(() => {
            alert("Meal Created!")
            window.location.reload(false);
        })
        .catch((e) => {
            console.log("submit meal ERROR: ", e) 
        })  
    }





    useEffect(() => {
        Axios.get("http://localhost:3001/api/get3").then((response) => {  
          console.log(response.data)       
          setMeals(response.data) 
        })
      }, [])

    return (
        <div>
            <h1>Create Meal</h1> 
            <div className="form">

                <input type="text" name="regionCountry" onChange={(e) => setRegionCountry(e.target.value)} placeholder="Region/Country" />
                <input type="text" name="Name" onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                <input type="text" name="ServingSizes" onChange={(e) => setServingSizes(e.target.value)} placeholder="Serving Sizes (1-10)"/>
                <input type="number" name="expirationDate" onChange={(e) => setExpirationDate(e.target.value * 1000)} placeholder="Expiration Date (seconds)"/>
                
                <button onClick={submitMeal} className="submit">Submit</button>
            </div>
            <div>
                <MealLists title={"Meals: "} MealLists={meals} authorName={Author} Setting_point={Settings}/>
            </div> 
            <div>
                
            </div>
        </div>
    )
}

export default CreateMeal

import React, {useState} from 'react'
import CreateIngredients from '../pages/CreateIngredients'
import Countdown from 'react-countdown'
import Axios from 'axios'

function MealLists({title, MealLists, authorName, Setting_point}) {

    const [search, setSearch] = useState("") 
    const [showIngredients, setshowIngredients] = useState(false) 
    const [mealName, setmealName] = useState("") 
    const [mealID, setMealID] = useState(0) 
    const [ingredientName, setIngredientName] = useState([])

    const [newRegionCountry, setNewRegionCountry] = useState("")
    const [newName, setNewName] = useState("") 
    const [newServingSizes, setServingSizes] = useState(0) 


 

    //  const deleteSubmit2 = (id, name) => {
    //    Axios.delete(`http://localhost:3001/delete_Meal/${id}`).then((res) => {
    //     alert(`${name} is deleted!`)
    //     window.location.reload(false);
    //    }).catch((err) => {
    //      alert(`${name} could not be deleted!`)
    //    })
    // }

    const updateNewRegionCountry = (id) => {
      Axios.put("http://localhost:3001/update_one", 
      {
        regionCountry: newRegionCountry, 
        name: newName, 
        servingSizes: newServingSizes, 
        id: id 
      }
      ).then((res) => {
        alert("newRegionCountry updated!")
        window.location.reload(false);
      }).catch((e) => console.log("ERROR: ", e))
    }

    const editMeal = (id, name) => {
        setshowIngredients(cur => !cur)
        setmealName(name) 
        setMealID(id) 
    }

    const nameCallback = (data) => {
      setIngredientName([data, data + 1])
    }

   
    const getTime = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        return <span style={{color: "red"}}>EXPIRED</span>
      }
      else {
        return  <span style={{color: "green"}}> {hours}:{minutes}:{seconds} </span>
      }
    }



    


    return (
        <div>
            <h1>{title}</h1> 
              <div className="search_bar">
                <h4>Search: </h4> 
                <input type="text" onChange={(e) => { setSearch(e.target.value)}}/>
              </div>
              { 
                MealLists.filter((val) => {
                  if (search === "") {
                    return val
                  }
                  else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                    return val
                  }
                  else if (val.author.toLowerCase().includes(search.toLowerCase())) {
                    return val
                  }
                }).map((val) => {
                  return (
                    <div className="card_MealPost">
                      <h3 className="name_MealPost">

                        {val.name}
                        

                        {
                          authorName === val.author? 
                          (
                            <div>
                              {/* <button onClick={() => deleteSubmit2(val.MealID, val.name)} className="button_mealLists_delete">x</button>  */}
                              <button onClick={() => editMeal(val.MealID, val.name)} className="button_mealLists_edit">✎</button>
                              {
                              Setting_point !== false? 
                              (
                                <div>
                                  <input type="text" onChange={(event) => {
                                    setNewRegionCountry(event.target.value)
                                  }} placeholder="Region/Country"/> 
                                  <input type="text" onChange={(event) => {
                                    setNewName(event.target.value)
                                  }} placeholder="Name"/> 
                                  <input type="text" onChange={(event) => {
                                    setServingSizes(event.target.value)
                                  }} placeholder="serving Sizes"/> 

                                  <button className="button_update" onClick={() => updateNewRegionCountry(val.MealID)}>UPDATE</button>
                                </div> 
                              ): null
                            }
                            </div> 
                          ) : null
                        }
                      
                      </h3>
                      <p>Author: <b>{val.author}</b></p> 
                      {
                          mealName === val.name? 
                          (
                            <div>
                              {
                                ingredientName.map((name) => {
                                  return <li className="ingredientMealLists">{name}</li>
                                })
                              }
                            </div>
                          ): null
                      }

                    <div>
                   
                    <p>
                      Expiration: 
                      <Countdown date={Date.now() + val.expirationDate} renderer={getTime} />
                      <Countdown/>
                    </p>
                    
                    </div>
                  </div>
                  )
                })
              }
              <div>
              {
                showIngredients !== false? (
                <div>
                  <CreateIngredients mealName={mealName} nameCallback={nameCallback} mealID={mealID} /> 
                </div> 
                ): null
              }
              </div>
        </div>
    )
}

export default MealLists

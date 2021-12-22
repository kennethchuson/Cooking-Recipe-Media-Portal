import React, {useState, useEffect} from 'react'
import Axios from 'axios'

function IngredientLists({title, ingredientLists, nameCallback, mealName}) {

  const [search, setSearch] = useState("") 



  const [specificMealIngredients, setSpecificMealIngredients] = useState([]) 






  useEffect(() => {
  
    Axios.get(`http://localhost:3001/api/get5/${mealName}`).then((res) => {
      setSpecificMealIngredients(res.data) 
    })
    
  }, [])


    const deleteSubmit2 = (id, name) => {
       Axios.delete(`http://localhost:3001/delete_Ingredient/${id}`).then((res) => {
        alert(`${name} is deleted!`)
        window.location.reload(false);
       }).catch((err) => {
         alert(`${name} could not be deleted!`)
       })
    }

    const addSubmit = (name) => {
      nameCallback(name) 

      console.log("list call: ", name) 
    }






    return (
        <div>
              <div className="search_bar">
                <h4>Search: </h4> 
                <input type="text" onChange={(e) => { setSearch(e.target.value)}}/>
              </div>
              <div className="ingredient_Container">
                { 
                  ingredientLists.filter((val) => {
                    if (search === "") {
                      return val
                    }
                    else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                      return val
                    }
                  }).map((val) => {
                    return (
                      <div className="card_IngredientPost">
                        <h3 className="name_IngredientPost">
                          {val.name}
                          <button onClick={() => deleteSubmit2(val.RecipeID, val.name)} className="button_ingredientLists_delete">x</button> 
                        </h3>
                      </div>
                    )
                  })
                }
              </div> 
              <br/>
              <h4>Ingredients for {mealName}</h4>
              <div>
                {
                  specificMealIngredients.map((val, idx) => {
                    return (
                      <div key={idx} className="specific_Ingredient">
                        <h5 style={{color: "white"}}>⁕ {val.name}</h5>
                      </div> 
                    )
                  })
                }
              </div>
        </div>
    )
}

export default IngredientLists

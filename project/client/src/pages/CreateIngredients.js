import React, {useState, useEffect} from 'react'
import IngredientsLists from "../components/IngredientLists"
import Axios from 'axios'



function CreateIngredients({mealName, nameCallback, mealID}) {

    const [ingredient_name, setIngredient_name] = useState('') 
    const [ingredients, setIngredients] = useState([])


      
    const submitIngredient = () => {
        Axios.post(`http://localhost:3001/api/insert2/${mealID}`, 
          {
            ingredient_name: ingredient_name, 
          }
        ).then(() => {
          alert("Ingredient Created!")
          window.location.reload(false);
        })
    }

    useEffect(() => {
      Axios.get("http://localhost:3001/api/get2").then((response) => {
        setIngredients(response.data) 
      })
    }, [])

    const callbackFunc = (childName) => {
      nameCallback(childName)
    }
    
    return (
        <div className="user_work">
            <div className="Ingredient">
            <h1>Ingredients</h1> 
            
            <div className="form">
                <input type="text" name="name_ingredient" onChange={(e) => setIngredient_name(e.target.value)} placeholder="Name"/>

                <button onClick={submitIngredient} className="submit">Submit</button>
            </div>
            <IngredientsLists title={"Ingredients: "} ingredientLists={ingredients} nameCallback={callbackFunc} mealName={mealName} />
            </div>
        </div>
    )
}

export default CreateIngredients

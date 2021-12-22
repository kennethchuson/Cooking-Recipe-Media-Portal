import React, {useState, useEffect} from 'react'
import CategoryLists from '../components/CategoryLists'
import Axios from "axios" 

function CreateCategory() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("") 
    const [categories, setCategories] = useState([])

    const submitCategory = () => {
        Axios.post("http://localhost:3001/api/insert4", 
        {
          name: name, 
          description: description
        }
        ).then(() => {
            alert("Category Created!")
            window.location.reload(false);
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/api/get4").then((response) => {        
          setCategories(response.data) 
        }, [])

      }, [categories])

    return (
        <div className="user_category">
            <div className="Category">
                <h1>Create Categories</h1> 
                
                <div className="form">
                    <input type="text" name="name_category" onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                    <input type="text" name="description_category" onChange={(e) => setDescription(e.target.value)} placeholder="Description"/> 
                    
                    <button onClick={submitCategory} className="submit">Submit</button>
                </div>
            </div> 
            <div>
                <CategoryLists title={"Categories: "} CategoryLists={categories} />
            </div>
        </div>
    )
}

export default CreateCategory

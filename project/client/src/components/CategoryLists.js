import React, {useState} from 'react'
import Axios from "axios"

function CategoryLists({title, CategoryLists}) {


    const [search, setSearch] = useState("") 





    const deleteSubmit3 = (id, name) => {
        Axios.delete(`http://localhost:3001/delete_Category/${id}`).then((res) => {
         alert(`${name} is deleted!`)
         window.location.reload(false);
        }).catch((err) => {
          alert(`${name} could not be deleted!`)
        })
     }


    return (
        <div>
            <h1>{title}</h1>
            <div className="search_bar">
                <h4>Search: </h4> 
                <input type="text" onChange={(e) => { setSearch(e.target.value)}}/>
            </div>
            {
                CategoryLists.filter((val) => {
                    if (search === "") {
                        return val
                    }
                    else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                        return val
                    }
                    else if (val.description.toLowerCase().includes(search.toLowerCase())) {
                        return val
                    }
                }).map((val, id) => {
                    return (  
                        <div className="card_usersCategories">
                            <div className="name_usersCategories" key={id}>
                                <h3>{val.name}</h3> 
                                <p>{val.description}</p> 
                            </div>
                            <button onClick={() => deleteSubmit3(val.CategoryID, val.name)} className="button_CategoryLists_delete">x</button> 
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CategoryLists

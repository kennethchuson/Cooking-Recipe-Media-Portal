import React, {useState} from 'react'
//import Axios from 'axios'
import {Link} from 'react-router-dom'

function UsersLists({title, usersLists}) {

    // const deleteSubmit = async (id, name) => {

    //     Axios.delete(`http://localhost:3001/delete_User/${id}`).then((res) => {
    //         alert(`${name} is deleted!`)
    //         window.location.reload(false);
    //     }).catch((err) => {
    //         alert(`${name} could not be deleted!`)
    //     })
    //  }

    const [search, setSearch] = useState("") 


    return (
        <div>
            <h1>{title}</h1>
            <div className="search_bar">
                <h4>Search: </h4> 
                <input type="text" onChange={(e) => { setSearch(e.target.value)}}/>
            </div>
            {
                usersLists.filter((val) => {
                    if (search === "") {
                        return val
                    }
                    else if (val.firstName.toLowerCase().includes(search.toLowerCase())) {
                        return val
                    }
                    else if (val.lastName.toLowerCase().includes(search.toLowerCase())) {
                        return val
                    }
                }).map((val, id) => {
                    return (
                        <div className="card_usersLists">
                            <h3 className="name_usersLists" key={id}>
                                {val.firstName} {val.lastName} 
                                <Link to={"/user/"+val.firstName}>
                                    <button className="button_usersLists">Enter</button>
                                </Link>      
                            </h3>
                            {/* <button className="users_button_delete" onClick={() => deleteSubmit(val.UserID, val.firstName)}>Delete</button>                           */}

                        </div>
                    )
                })
            }
        </div>
    )
}

export default UsersLists

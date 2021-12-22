import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import UsersLists from "../components/UsersLists"

function CreateUsers() {


  const [firstName, setfirstName] = useState('') 
  const [lastName, setlastName] = useState('') 
  const [password, setPassword] = useState('')
  const [age, setAge] = useState(0)
  const [nationality, setNationality] = useState('')
  const [users, setUsers] = useState([])




  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setUsers(response.data) 
    })

    Axios.get('http://localhost:3001/logout').then((res) => {
    }).catch((err) => {
    })
  }, [])


  const submitUser = () => {
    Axios.post("http://localhost:3001/api/insert", 
     {
       firstName: firstName, 
       lastName: lastName, 
       age: age, 
       nationality: nationality, 
       password: password
     }
   ).then((response) => {
     alert("User Created!")
     window.location.reload(false);
   })
 }


    return (
        <div>

            <div className="createUser">
            <h1>Create User</h1> 
            
            <div className="form">
                <input type="text" name="firstName" onChange={(e) => setfirstName(e.target.value)} placeholder="First Name"/>
                <input type="text" name="lastName" onChange={(e) => setlastName(e.target.value)} placeholder="Last Name"/> 
                <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/> 
                <input type="number" name="age" onChange={(e) => setAge(Number(e.target.value))} placeholder="Age"/> 
                <input type="text" name="nationality" onChange={(e) => setNationality(e.target.value)} placeholder="Nationality"/>

                <button onClick={submitUser} className="submit">Submit</button>
            </div>
            <UsersLists title="Users: " usersLists={users}/>
            </div> 
        </div>
    )
}

export default CreateUsers

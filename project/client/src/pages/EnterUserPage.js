import React, {useState, useEffect} from 'react'
import Axios from "axios"
import UserPageEnter from './UserPageEnter'
import {withRouter} from 'react-router-dom'

function EnterUserPage(props) {

    const [passwordEnter, setPasswordEnter] = useState("") 
    const [loginStatus, setLoginStatus] = useState(false)


    Axios.defaults.withCredentials = true 


    const login = () => {
        Axios.post('http://localhost:3001/login_insert', {
            userNameEnter: props.match.params.id,
            passwordEnter: passwordEnter
        }).then((response) => {
            if (response.data === 'wrong password!') {
                alert("wrong password!") 
            }
            else {
                window.location.reload(false);
            }
        })
    }

    const logout  = () => {
        Axios.get('http://localhost:3001/logout').then((res) => {
            window.location.reload(false);
        }).catch((err) => {
            console.err("ERROR: ", err) 
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login_insert").then((response) => {
          if (response.data.loggedIn) {
            setLoginStatus(cur => !cur)
          }
        })
      }, [])
    
    
    

    return (

        <div>           
            { loginStatus !== false? 
                (
                <div>
                    <button onClick={logout} className="submit_logout">Logout</button>
                    <UserPageEnter name={props.match.params.id} /> 
                </div> 
                )
                : 
                (
                <div>
                    <h1 className="usersChoose_title">Login for {props.match.params.id}</h1> 
                    <div className="Login-tab">
                        <label className="userChoose_title2">Enter password for {props.match.params.id} </label>
                        <br/>
                        <input onChange={(e) => setPasswordEnter(e.target.value)}className="Login-input" type="text"/>
                        <br/>
                        <button onClick={login} className="submit_login">Submit</button>
                    </div>
                </div>
                )
            } 
        </div>
    )
}

export default withRouter(EnterUserPage) 

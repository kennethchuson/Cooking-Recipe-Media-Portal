import React, {useEffect} from 'react'
import Axios from 'axios'
import img from '../images/img1.gif'

function Home() {

    useEffect(() => {
        Axios.get('http://localhost:3001/logout').then((res) => {
        }).catch((err) => {
            console.err("ERROR: ", err) 
        })
    }, [])



    return (
        <div>
            <img className="image_one" src={img} alt="body img"/>
            <div className="footer">
                <h3>CSC675</h3>
            </div>

        </div>
    )
}

export default Home

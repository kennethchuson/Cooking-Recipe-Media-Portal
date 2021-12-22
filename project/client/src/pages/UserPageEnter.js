import React, {useState} from 'react'
import CreateMeal from './CreateMeal'
import CreateCategory from './CreateCategory'

function UserPageEnter({name}) {
    const [turnSettings, setTurnSettings] = useState(false) 

    const settings = () => {
        setTurnSettings((cur) => !cur)
    }
    return (
        <div>

            <div className="userWork_tab_container">
                <h1>You Cook {name}! </h1>
                <button onClick={settings} className="settings_button">⚙️</button>
                <div className="user_work">
                    <CreateMeal Author={name} Settings={turnSettings}/> 
                </div>
                <div className="user_work">
                    <CreateCategory />
                </div>
            </div>
        </div> 
    )
}

export default UserPageEnter

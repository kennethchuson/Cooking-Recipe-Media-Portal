require('dotenv').config()


const express = require("express") 
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql2") 
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const session = require("express-session")



const PORT = 3001
const app = express()


const db = mysql.createPool({
    host: 'localhost', 
    user: 'root', 
    password: 'passwordroot', 
    database: 'CookingRecipePortalDB_2'
})

app.use(cors({
    origin: ["http://localhost:3000"], 
    methods: ["GET", "POST", "DELETE", "PUT"], 
    credentials: true
}))

app.use(cookieParser()) 
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    key: "UserID", 
    secret: "keysecret", 
    resave :false,
    saveUninitialized: false


}))




app.get("/login_insert", (req, res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } 
    else {
        res.send({loggedIn: false})
    }
})

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.send({loggedIn: false})
        if (err) {
            res.send(`ERROR: ${err}`)
        }
    })
})

//-----------------------------------------------------MySQL------------------------------------
app.get("/", (req, res) => {
    res.send("the server is running working") 
})


app.get('/api/get', (req, res) => {

    const sqlSelect = "SELECT * FROM User"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })

})

app.get('/api/get2', (req, res) => {
    const sqlSelect = "SELECT * FROM Ingredient"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })

})

app.get('/api/get3', (req, res) => {
    const sqlSelect = "SELECT * FROM Meal"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })

})

app.get('/api/get4', (req, res) => {
    const sqlSelect = "SELECT * FROM Category"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })

})


app.get('/api/get5/:name', (req, res) => {
    const MealName = req.params.name
    const sqlSelect = "SELECT I.name FROM Ingredient I, Meal M WHERE M.MealID = I.Meal_MealID AND M.name = ?"
    db.query(sqlSelect, MealName, (err, result) => {
        res.send(result)
    })
})

app.get('/api/get6/:name', (req, res) => {
    const CategoryName = req.params.name

    const sqlSelect = "SELECT M.name FROM Meal M, Category C WHERE M.Category_CategoryID = C.CategoryID AND C.name = ?"
    db.query(sqlSelect, CategoryName, (err, result) => {
        res.send(result) 
    })
})


app.get('/api/get7', (req, res) => {
    const sqlSelect = "SELECT * FROM Rating;"
    db.query(sqlSelect, (err, result) => {
        res.send(result) 
    })
})




app.get('/api/get9', (req, res) => {
    const sqlSelect = "SELECT * FROM Meal_numberSource"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})



app.post("/api/insert", (req, res) => {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const password = req.body.password
    const age = req.body.age
    const nationality = req.body.nationality


    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.send(err) 
        }
        const sqlInsert = "INSERT INTO User (firstName, lastName, age, nationality, password) VALUES (?,?,?,?,?);"
        db.query(sqlInsert, [firstName, lastName, age, nationality, hash], (err, result) => {
            if (err) {
                res.send(`ERROR: ${err}`)
            }
        })
    })
   

    res.send("User Created!")
   
})

app.post("/api/insert2/:mealID", (req, res) => {

    const ingredient_name = req.body.ingredient_name
    const FK_UserID = req.session['user'][0]['UserID']
    const FK_MealID = req.params.mealID


    const sqlInsert = "INSERT INTO Ingredient (name, User_UserID, Meal_MealID) VALUES (?,?,?);"
    db.query(sqlInsert, [ingredient_name, FK_UserID, FK_MealID], (err, result) => {
        if (err) {
            res.send(`ERROR: ${err}`)
        }
    })

    res.send("Ingredient Created!")
   
})

app.post("/api/insert3", (req, res) => {

    const regionCountry = req.body.regionCountry
    const name = req.body.name 
    const servingSizes = req.body.servingSizes
    const expirationDate = req.body.expirationDate
    const author = req.body.author 

    const FK_UserID = req.session['user'][0]['UserID']
    


    const sqlInsert = "INSERT INTO Meal (regionCountry, name, servingSizes, author, expirationDate, User_UserID, Category_CategoryID, Rating_RatingID, Meal_InfoType_Meal_InfoTypeID, Meal_numberSource_Meal_numberSourceID) VALUES (?,?,?,?,?,?,null,null,null,null);"

    db.query(sqlInsert, [regionCountry, name, servingSizes, author, expirationDate, FK_UserID], (err, result) => {
        if (err) {
            res.send(`ERROR: ${err}`)
        }
    })

    res.send("Meal Created!")


})

app.post("/api/insert4", (req, res) => {
    const name = req.body.name
    const description = req.body.description

    const FK_UserID = req.session['user'][0]['UserID']

    const sqlInsert = "INSERT INTO Category (name, description, User_UserID) VALUES (?,?,?);"

    db.query(sqlInsert, [name, description, FK_UserID], (err, result) => {
        if (err) {
            res.send(`ERROR: ${err}`)
        }
    })
    res.send("Category Created!")
})

app.post("/api/insert5", (req, res) => {
    const cuisineType = req.body.cuisineType
    const mealType = req.body.mealType 
    const dishType = req.body.dishType 

    const sqlInsert = "INSERT INTO Meal_InfoType (cuisineType, mealType, dishType) VALUES (?,?,?);"

    db.query(sqlInsert, [cuisineType, mealType, dishType], (err, result) => {
        if (err) {
            res.send(`ERROR: ${err}`)
        }
    })
    res.send("MealInfo Created!")
})

app.post("/api/insert6", (req , res) => {
    const mealSourceTotal = req.body.mealSourceTotal
    const sqlInsert = "INSERT INTO Meal_numberSource (MealSourceTotal) VALUES (?);"

    db.query(sqlInsert, [mealSourceTotal], (err, result) => {
        if (err) {
            res.send(`ERROR: ${err}`)
        }
    })
    res.send("MealInfo Created!")
})

app.delete('/delete_Ingredient/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM Ingredient WHERE RecipeID = ?", id, (err, result) => {
        if (err) {
            res.send(`ERROR: ${err}`)
        }
    })
    res.send("Ingredient Deleted!")

})



app.delete('/delete_Meal/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM Meal WHERE MealID = ?", id, (err, result) => {
        if (err) {
            res.send(`ERROR: ${err}`)
        }
    })
    res.send("Meal Deleted!")

})


app.delete('/delete_User/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM User WHERE UserID = ?", id, (err, result) => {
        if (err) {
            res.send(`ERROR: ${err}`)
        }
    })
    res.send("User Deleted!")
})

app.delete('/delete_Category/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM Category WHERE CategoryID = ?", id, (err, result) => {
        if (err) {
            res.send(`ERROR: ${err}`)
        }
    })
    res.send("User Deleted!")
})






app.post("/login_insert", (req, res) => {
    const username = req.body.userNameEnter
    const password = req.body.passwordEnter 


    db.query("SELECT * FROM User WHERE firstName = ?;", 
    username, 
        (err, result) => {
            if (err) {
                res.send(`ERROR: ${err}`)
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if (response) {
                        req.session.user = result
                        res.send(result) 
                    }
                    else {
                        res.send("wrong password!") 
                    }
                })
            }
            else {
                res.send(result) 
            }
        }
    )
})


app.put('/update_one', (req, res) => {
    const id = req.body.id 
    const regionCountry = req.body.regionCountry
    const name = req.body.name 
    const servingSizes = req.body.servingSizes 

    db.query("UPDATE Meal SET regionCountry = ?, name = ?, servingSizes = ? WHERE MealID = ?", [regionCountry, name, servingSizes, id], (err, result) => {
        if (err) {
            res.send(`ERROR: ${err}`)
        }
        else {
            res.send(result) 
        }
    })
}) 




app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
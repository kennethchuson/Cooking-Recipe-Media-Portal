
import React from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from "./pages/Header"
import Home from "./pages/Home"
import Users from "./pages/CreateUsers"
import EnterUserPage from './pages/EnterUserPage'
import Statistics from "./pages/Statistics"
import './App.css';



function App() {


  return (
    <Router>
      <div className="App">
        <Header/>
      </div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/Users" component={Users}/>
          <Route path="/Statistics" component={Statistics}/>
          <Route path="/user/:id"><EnterUserPage/></Route>
        </Switch>
      </Router>
    </Router>
    
  );
}

export default App;


import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';


class App extends Component {
 
  render() {
    return (
      <Router>
        <div className="App">
         <ul>
            <li>
               <Link to="/">Subjects</Link>
            </li>
            <li>
               <Link to="/voting">Voting</Link>
            </li>
          </ul>

            <Route path="/" exact strict render={
               () => {
               return ( <h1>All Subjects</h1>);
               }
            }/>
            <Route path="/voting" exact strict render={
               () => {
               return ( <h1>Welcome About</h1>);
               }
            }/>
        
         </div>
      </Router>
    );
  }
}

export default App;
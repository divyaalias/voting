import React, {Component, useState } from 'react';
import './App.css';
import { BrowserRouter as Router , Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import AddFormComponent from './components/AddFormComponent';



class Items extends Component {
  render() {
    let subjects = this.props.subjects
    let items = this.props.items.map((item, key) => {
      return <li key={key} class="todo-item ui-state-default pending">
      <div class="item-list">
        <span class="item-name">{item}</span>
        <span class="item-status">
          <button name="active" class="active" onClick={(e)=>{this.props.setUpdate(item)}}>{subjects.includes(item)? 'Active' : 'Inactive'}</button>
        </span>

        <span class="item-trash">
          <button name="clear" class="trash"  onClick={() => {this.props.removeItem(item)}}>X</button>
        </span></div>
      </li>
    })
    return (
      <ul class="list-unstyled">
        {items}
      </ul>
    )
  } 
 
}

class Voting extends Component {
  render() {
    let {count} = this.props.count
    let subjects = this.props.subjects.map((sub, key) => {
      return <li key={key} class="todo-item ui-state-default pending">
      <div class="item-list">
        <span class="item-name">{sub}</span>
         <span class="item-status">{this.props.count}</span>
         <span class="item-status">
           <button class="active" onClick={() => {this.props.increment(count)}}>
          Click me
        </button>
          
        </span>
        </div>
      </li>
    })
    return (
      <ul>
        {subjects}
      </ul>
    )
  } 
 
}

/* ===== parent component ===== */
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { items: [], subjects: [], count: 0}
    
  }
  addItem(item) {
    this.setState({
      items: this.state.items.concat(item)
    })
  }

  removeItem(value) {
    let filtered = this.state.items.filter((item) =>{
      return item !== value
    })
    let sub_filtered = this.state.subjects.filter((item) =>{
      return item !== value
    })
    this.setState({
      items: filtered,
      subjects: sub_filtered
    })
  }

  setUpdate(item){
    console.log("subjects:"+this.state.subjects);
    console.log("items:"+this.state.items);
    this.setState({
      subjects: this.state.subjects.concat(item)
    })
  }

  increment(val) {
      this.setState({
        count: this.state.count + 1
      })
    }
  
  componentWillMount() {
    let itemsList = localStorage.getItem('items') 
    if (itemsList) {
      this.setState({
        items: JSON.parse(localStorage.getItem('items'))
      })
    }

    let subList = localStorage.getItem('subjects') 
    if (subList) {
      this.setState({
        subjects: JSON.parse(localStorage.getItem('subjects'))
      })
    }
  }

  componentDidUpdate() {
    localStorage.setItem('items', JSON.stringify(this.state.items));
    localStorage.setItem('subjects', JSON.stringify(this.state.subjects));
  }

  render() {
    return (
      <Router>
        <div className="voting-app">
        <header><h1>All languages</h1></header>
         <ul class="sub-tab">
            <li class="list-tab"> 
               <span class="tab"> <Link to="/">Subjects</Link></span>
            
               <span class="tab"><Link to="/voting">Voting</Link></span>
            </li>
          </ul>

          <Route path="/" exact strict render={
             () => {
             return (
                <div className="app1">
                  <AddFormComponent addItem={this.addItem.bind(this)} />
                  <Items items={this.state.items} subjects={this.state.subjects} removeItem = {this.removeItem.bind(this)}  setUpdate = {this.setUpdate.bind(this)}/>
                </div>
              );
             }
          }/>
          <Route path="/voting" exact strict render={
             () => {
             return (
                <div className="app1">
                  <Voting subjects={this.state.subjects} setUpdate = {this.setUpdate.bind(this)} count= {this.state.count} increment = {this.increment.bind(this)}/>
                </div>
             );
             }
          }/>
         </div>
      </Router>
    )
  }

}


export default App;




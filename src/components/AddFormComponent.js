import React, { Component } from 'react';

class AddFormComponent extends Component {
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
      
         <input type="text" ref="listItem" class="form-control" placeholder="Add New Subject"/>

         <input type="submit" value="Add" class="form-control add-new" />

      </form>
    )
  }
  handleSubmit(e) {
    e.preventDefault()
    let val = this.refs.listItem.value
    val && this.props.addItem(val)
    this.refs.listItem.value = '' 
  }
}

export default AddFormComponent;
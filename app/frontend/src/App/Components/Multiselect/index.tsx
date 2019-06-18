import React, { Component } from 'react';
import './App.css';
const  Multiselect =  require('multiselect-dropdown-react');

const data = [{
  name: 'one',
  value: 'one'
},
{
    name: 'two',
    value: 'two'
  },
  {
    name: 'three',
    value: 'three'
  },
  {
    name: 'four',
    value: 'four'
  },
  {
    name: 'five',
    value: 'five'
  },
  {
    name: 'six',
    value: 'six'
  }];
class App extends Component {
  result(params: any) {
    console.log(params);
  }
  render() {
    return (
      <div className="App">
        <Multiselect options={data} onSelectOptions={this.result} />
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person'
import './App.css';


class App extends Component {
  state = {
    persons: [
      { id: '00', name: 'Max', age: 28 },
      { id: '01', name: 'Manu', age: 29 },
      { id: '02', name: 'Stephanie', age: 26 }
    ],
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const show = this.state.showPersons;
    this.setState({showPersons: !show});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {...this.state.persons[personIndex]}
    const persons = [...this.state.persons];

    person.name = event.target.value;
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  render() {
    const buttonStyle = {
      backgroundColor:  'green',
      color:            'white',
      font:             'inherit',
      padding:          '8px',
      cursor:           'pointer',
      margin:           '10px',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );

      buttonStyle.backgroundColor = 'red';
      buttonStyle[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <=1 ) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App.</h1>
          <p className={classes.join(' ')}>This is really working</p>
          <button
            style={buttonStyle}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);

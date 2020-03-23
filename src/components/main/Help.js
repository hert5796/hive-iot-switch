import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Help extends Component {
  render(){
    return(
      <section>
        <Link to='/'>
          <button>Return to homepage</button>
        </Link>
        <h3>Help</h3>
        <ol>
          <li>Create a new switch</li>
          <li>Test the switch</li>
          <li>Toggle the switch</li>
          <li>Poll the switch</li>
        </ol>
      </section>
    )
  }
}

export default Help;
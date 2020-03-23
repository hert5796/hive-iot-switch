import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <section>
        <h3>Hive IoT switch</h3>
        <ul>
          <li>
            <Link to='/create'>
              <button>Create a new switch</button>
            </Link>
          </li>
          <li>
            <Link to='/manage'>
              <button>Manage an existing switch</button>
            </Link>
          </li>
          <li>
            <Link to='/help'>
              <button>Help</button>
            </Link>
          </li>
        </ul>
      </section>
    )
  }
}

export default Home
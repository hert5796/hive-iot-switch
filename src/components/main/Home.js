import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faInfo } from '@fortawesome/free-solid-svg-icons';

class Home extends Component {
  render() {
    return (
      <section className='hero is-fullheight'>
        <section className='hero-body'>
          <section className='container has-text-centered'>
            <section className='content is-large'>
              <h1>Hive IoT switch</h1>
              <section>
                <p className=''>
                  <Link to='/create'>
                    <button className='button is-warning'>
                      <span class="icon">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      <span>Create a new switch</span>
                    </button>
                  </Link>
                </p>
                <p className=''>
                  <Link to='/manage'>
                    <button className='button is-primary'>
                      <span class="icon">
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </span>
                      <span>Manage an existing switch</span>
                    </button>
                  </Link>
                </p>
                <p className=''>
                  <Link to='/help'>
                    <button className='button is-dark'>
                      <span class="icon">
                        <FontAwesomeIcon icon={faInfo} />
                      </span>
                      <span>Help</span>
                    </button>
                  </Link>
                </p>
              </section>
            </section>
          </section>
        </section>
      </section>
    )
  }
}

export default Home
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
              <section class='card-content is-flex is-horizontal-center'>
                <figure class="image is-128x128">
                  <img
                    alt='hive-logo'
                    src="/hive-logo.png" />
                </figure>
              </section>
              <h1>Hive IoT switch</h1>
              <section>
                <p className=''>
                  <Link to='/create'>
                    <button className='button is-warning'>
                      <span className="icon">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      <span>Create a new switch</span>
                    </button>
                  </Link>
                </p>
                <p className=''>
                  <Link to='/manage'>
                    <button className='button is-primary'>
                      <span className="icon">
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </span>
                      <span>Manage an existing switch</span>
                    </button>
                  </Link>
                </p>
                <p className=''>
                  <Link to='/help'>
                    <button className='button is-dark'>
                      <span className="icon">
                        <FontAwesomeIcon icon={faInfo} />
                      </span>
                      <span>How to use the switch</span>
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
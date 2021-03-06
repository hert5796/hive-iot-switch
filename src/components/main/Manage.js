import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faToggleOff, faToggleOn, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

import { ReturnHome } from '../mini'

import { methods } from '../../database';
const { getSwitch } = methods;

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _isMounted: false,
      searchName: '',
      searchNameErr: '',
      switchData: {},
    }
  }

  componentDidMount = () => {
    let { _isMounted } = this.state;
    const { switchName } = this.props;
    _isMounted = true;
    if (switchName && _isMounted) {
      getSwitch(switchName,
        switchData => this.setState({
          switchData
        })
      )
    }
    this.setState({ _isMounted })
  }

  handleToggle = toggle_state => {
    const { switchName } = this.props;
    fetch(`https://us-central1-hive-iot-switch.cloudfunctions.net/toggle/${switchName}/${toggle_state ? 'on' : 'off'}`, { mode: 'no-cors' })
      // .then(console.log)
      .catch(console.log)
  }

  handleSearchNameChange = event => {
    this.setState({ searchName: event.target.value.toLowerCase() })
  }

  handleSearchName = event => {
    event.preventDefault();
    const { searchName } = this.state;
    const { switchName, setSwitchName } = this.props;

    searchName
      ? getSwitch(searchName,
        switchData => {
          if (switchData) {
            if (switchData.switchName !== switchName) setSwitchName(switchData.name);
            this.setState({ switchData });
          } else this.setState({ searchNameErr: 'switch was not found. consider trying again or creating a new switch' })
        })
      : this.setState({ searchNameErr: 'switch name was not provided. please enter a name' })
  }

  handleReset = () => {
    const { setSwitchName } = this.props;
    setSwitchName('');
    this.setState({ searchName: '', searchNameErr: '', switchData: {} })
  }


  render() {
    const { switchName } = this.props;
    const { searchName, searchNameErr, switchData, } = this.state;
    const { active, createdAt } = switchData || {};
    return (
      <section className='hero is-fullheight-with-navbar'>
        <ReturnHome />
        <section className='hero-body'>
          <section className='container has-text-centered'>
            <section className='content'>
              {switchName
                ? <section>
                  <section className='content'>
                    <section className='section'>
                      <h1 className={`is-large ${active ? 'has-text-success' : 'has-text-danger'}`}>{switchName}</h1>
                      <p>Created on {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </section>
                    <button className='button is-success' onClick={() => this.handleToggle(true)} disabled={active}>
                      <span className="icon">
                        <FontAwesomeIcon icon={faToggleOn} />
                      </span>
                      <span>
                        Toggle on
                      </span>
                    </button>
                    <button className='button is-danger ml2' onClick={() => this.handleToggle(false)} disabled={!active}>
                      <span className="icon">
                        <FontAwesomeIcon icon={faToggleOff} />
                      </span>
                      <span>
                        Toggle off
                      </span>
                    </button>
                    <br /><br />
                    <section className=''>
                      <button className='button is-warning' onClick={this.handleReset}>
                        <span className="icon">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                        <span>
                          Manage another switch
                        </span>
                      </button>
                    </section>
                  </section>
                </section>
                : <section>
                  <p>
                    You don't seem to have a switch set up to manage.
                  </p>
                  <form onSubmit={this.handleSearchName}>
                    <section className="field is-horizontal">
                      <section className="field-label is-normal">
                        <label className="label">Switch's name</label>
                      </section>
                      <section className="field-body">
                        <section className="field has-addons">
                          <section className="control is-expanded">
                            <input
                              className="input" type="text"
                              value={searchName}
                              placeholder='team-11'
                              onChange={this.handleSearchNameChange} />
                          </section>
                          <section className='control'>
                            <button className='button is-warning' type='submit'>
                              <span className="icon">
                                <FontAwesomeIcon icon={faSearch} />
                              </span>
                              <span>Search</span>
                            </button>
                          </section>
                        </section>
                      </section>
                    </section>
                  </form>
                  <p className="help is-danger">
                    {!!searchNameErr && <span>* {searchNameErr}</span>}
                  </p>
                  <hr />
                  <Link to='/create'>
                    <button className='button is-primary'>
                      <span className="icon">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      <span>
                        Create a new switch
                      </span>
                    </button>
                  </Link>
                </section>
              }
            </section>
          </section>
        </section>
      </section>
    )
  }
}

export default Manage;
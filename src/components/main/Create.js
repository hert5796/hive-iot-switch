import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPlus, faCheck, faToggleOn } from '@fortawesome/free-solid-svg-icons';

import { ReturnHome } from '../mini'

import { methods } from '../../database';
const { createSwitch, unusedSwitch } = methods;



class Create extends Component {
  constructor(props) {
    super(props);
    const { switchName, setSwitchName } = props;
    this.state = {
      ...this.initState(switchName),
      setSwitchName
    };
  }

  initState = name => ({
    createdAt: 0,
    name,
    nameErr: '',
    active: false,
  })

  checkSwitchName = switchName => {
    let nameErr = '';
    if (switchName.length < 3) nameErr = 'switch name must have at least 3 letters';
    else if (switchName.includes(' ')) nameErr = 'switch name must not include a space'
    else if (switchName.length > 19) nameErr = 'switch name should have less than 20 chars'
    else if ((/(?![a-z0-9-]+)(.+)/g).test(switchName)) nameErr = 'switch name can only have letters, numbers and hyphens'
    this.setState({ nameErr });
  }

  handleChange = (prop, event) => {
    const parse = ['active'];
    const state = this.state;
    const value = event.target.value.toLowerCase();
    state[prop] = parse.includes(prop) ? JSON.parse(value) : value;
    this.setState(state);

    // In-time error catching
    if (prop === 'name') this.checkSwitchName(state.name);
  }

  handleSubmit = event => {
    event.preventDefault();
    const { setSwitchName, name, nameErr, active } = this.state;
    const createdAt = Date.now();
    this.checkSwitchName(name);
    !!name && !nameErr && unusedSwitch(name)
      .then(isUnused => {
        if (isUnused) {
          createSwitch(name, { name, active, createdAt })
            .then(() => {
              setSwitchName(name);
              this.setState({ createdAt });
            })
        } else this.setState({ nameErr: "this name is taken, please try another" })
      })
  }

  handleReset = () => {
    const { setSwitchName } = this.state;
    setSwitchName('');
    this.setState(this.initState(''));
  }

  render() {
    const { name, nameErr, active } = this.state;
    const { switchName } = this.props;
    return (
      <section className='hero is-fullheight-with-navbar'>
        <ReturnHome />
        <section className='hero-body'>
          <section className='container has-text-centered'>
            <section className='content'>
              {switchName
                ? <section>
                  <p>You already have a switch!</p>
                  <section className='section'>
                    <h1 className='is-large'>{name}</h1>
                  </section>
                  <section className=''>
                    <p>
                      <Link to={`/manage`}>
                        <button className='button is-warning'>
                          <span className="icon">
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </span>
                          <span>
                            Manage your switch
                          </span>
                        </button>
                      </Link>
                    </p>
                    <p>
                      <button className='button is-primary' onClick={this.handleReset}>
                        <span className="icon">
                          <FontAwesomeIcon icon={faPlus} />
                        </span>
                        <span>
                          Create another switch
                        </span>
                      </button>
                    </p>
                  </section>
                </section>
                : <section>
                  <p className='section'>Make a new switch by completing the form below</p>
                  <form className='has-text-left' onSubmit={this.handleSubmit}>
                    <section className='field is-horizontal'>
                      <section className='field-label is-normal'>
                        <label className='label' htmlFor='name'>Switch's name </label>
                      </section>

                      <section className='field-body'>
                        <section className='field'>
                          <section className='control has-icons-left'>
                            <input className='input' type="text" value={name} placeholder="team-bee" onChange={e => this.handleChange('name', e)} />
                            <span className="icon is-small is-left">
                              <FontAwesomeIcon icon={faToggleOn} />
                            </span>
                          </section>
                          <p className="help is-danger">
                            {!!nameErr && <span>* {nameErr}</span>}
                          </p>
                        </section>
                      </section>
                    </section>

                    <section className='field is-horizontal'>

                      <section className="field-label">
                        <label className="label" htmlFor='active'>Activate switch ?</label>
                      </section>

                      <section className="field-body">
                        <section className="field">
                          <section className="control">
                            <label className="radio">
                              <input type="radio" id="active-true" name="active" value={true} onChange={e => this.handleChange('active', e)} checked={active} />
                              <span className="ml05">Yes</span>
                            </label>
                            <label className="radio">
                              <input type="radio" id="active-false" name="active" value={false} onChange={e => this.handleChange('active', e)} checked={!active} />
                              <span className="ml05">No</span>
                            </label>
                          </section>

                        </section>
                      </section>

                    </section>
                    <br />
                    <section className="field is-horizontal">
                      <section className="field-label"></section>
                      <section className="field-body">
                        <section className="field">
                          <section className="control">
                            <button className='button is-warning' type="submit">
                              <span className="icon">
                                <FontAwesomeIcon icon={faCheck} />
                              </span>
                              <span>
                                Create switch
                              </span>
                            </button>
                          </section>
                        </section>
                      </section>
                    </section>
                  </form>
                </section>
              }
            </section>
          </section>
        </section>
      </section>
    )
  }
}

export default Create;
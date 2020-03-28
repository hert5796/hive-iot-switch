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
    let err = '';
    if (switchName.length < 3) err = 'switch name must have at least 3 letters';
    else if (switchName.length > 19) err = 'switch name should have less than 20 chars'
    else if (switchName.includes(' ')) err = 'switch name must not include a space'
    return err;
  }

  handleChange = (prop, event) => {
    const parse = ['active']
    const state = this.state;
    const value = event.target.value.toLowerCase();
    state[prop] = parse.includes(prop) ? JSON.parse(value) : value;

    // In-time error catching
    if (prop === 'name') state.nameErr = this.checkSwitchName(state.name);

    this.setState(state);
  }

  handleSubmit = event => {
    event.preventDefault();
    const { setSwitchName, name, active } = this.state;
    const createdAt = Date.now();
    !!name && unusedSwitch(name)
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
                            {!!nameErr && <p>* {nameErr}</p>}
                          </p>
                        </section>
                      </section>
                    </section>

                    <section className='field is-horizontal'>

                      <section className="field-label">
                        <label className="label" htmlFor='active'>Activate switch?</label>
                      </section>

                      <section className="field-body">
                        <section className="field is-narrow">
                          <section className="control">
                            <label className="radio">
                              <input type="radio" id="active-true" name="active" value={true} onChange={e => this.handleChange('active', e)} checked={active} />
                              Yes
                            </label>
                            <label className="radio">
                              <input type="radio" id="active-false" name="active" value={false} onChange={e => this.handleChange('active', e)} checked={!active} />
                              No
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
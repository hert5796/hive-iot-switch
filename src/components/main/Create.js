import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    unusedSwitch(name)
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
      <section>
        <Link to='/'>
          <button>Return to homepage</button>
        </Link>
        <h3>Create</h3>

        {switchName
          ? <section>
            You have a switch at {name}
            <ul>
              <li>
                <Link to={`/manage`}>
                  <button>Manage your switch</button>
                </Link>
              </li>
              <li>
                <button onClick={this.handleReset}>Create another switch</button>
              </li>
            </ul>
          </section>
          : <section>
            <p>Make a new switch by completing the form below</p>
            <form onSubmit={this.handleSubmit}>
              <section>
                <label htmlFor='name'>Switch's name:</label>
                <input type="text" value={name} placeholder="team-bee" onChange={e => this.handleChange('name', e)} />
                {!!nameErr && <p>* {nameErr}</p>}
              </section>
              <section>
                <label htmlFor='active'>Activate switch:</label>
                <input type="radio" id="active-true" name="active" value={true} onChange={e => this.handleChange('active', e)} checked={active} />
                <label htmlFor="active-true">yes</label>
                <input type="radio" id="active-false" name="active" value={false} onChange={e => this.handleChange('active', e)} checked={!active} />
                <label htmlFor="active-false">no</label>
              </section>
              <input type="submit" value="Create switch" />
            </form>
          </section>
        }
      </section>
    )
  }
}

export default Create;
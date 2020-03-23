import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { methods } from '../../database';
const { createSwitch } = methods;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      created: false,
      switch_id: '',
      created_at: 0,
      name: '',
      name_error: false,
      name_error_message: '',
      active: false,
      secured: false,
      passkey: '',
      passkey_error: false,
      passkey_error_message: '',
      passkey_visible: false,
    }
  }

  handleChange = (prop, event) => {
    const parse = ['active', 'secured', 'passkey_visible']
    const state = this.state;
    const value = event.target.value;
    state[prop] = parse.includes(prop) ? JSON.parse(value) : value;

    if (prop === 'name') {
      state.name_error = true;
      if (!value) state.name_error_message = "you must provide a name"
      else if (value.includes(' ')) state.name_error_message = "name must not include space"
      else { state.name_error = false; state.name_error_message = "" }
    }
    else if (prop === 'passkey') {
      state.passkey_error = true;
      if (value.length < 3) state.passkey_error_message = "your passkey must provide at least 3 chars"
      else { state.passkey_error = false; state.passkey_error_message = "" }
    }

    console.log(state);
    this.setState(state);
  }

  handleSubmit = event => {
    this.setState({ submitted: true });
    const { name, active, secured, passkey } = this.state;
    const created_at = Date.now();
    createSwitch({ name, active, secured, passkey, created_at })
      .then(switch_id => this.setState({ created: true, switch_id, created_at }))
    event.preventDefault();
  }

  render() {
    const {
      submitted, created, switch_id, name, name_error,
      name_error_message, active, secured,
      passkey, passkey_error, passkey_error_message,
      passkey_visible } = this.state;
    const error = name_error || passkey_error;
    return (
      <section>
        <Link to='/'>
          <button>Return to homepage</button>
        </Link>
        <h3>Create</h3>
        <p>Make a new switch by completing the form below</p>
        {!submitted &&
          <form onSubmit={this.handleSubmit}>
            <section>
              <label htmlFor='name'>Switch's name:</label>
              <input type="text" value={name} placeholder="team-bee" onChange={e => this.handleChange('name', e)} />
              {name_error && <p>* {name_error_message}</p>}
            </section>
            <section>
              <label htmlFor='active'>Activate switch:</label>
              <input type="radio" id="active-true" name="active" value={true} onChange={e => this.handleChange('active', e)} checked={active} />
              <label htmlFor="active-true">yes</label>
              <input type="radio" id="active-false" name="active" value={false} onChange={e => this.handleChange('active', e)} checked={!active} />
              <label htmlFor="active-false">no</label>
            </section>
            <section>
              <label htmlFor='secured'>Make secured:</label>
              <input type="radio" id="secured-true" name="secured" value={true} onChange={e => this.handleChange('secured', e)} checked={secured} />
              <label htmlFor="secured-true">yes</label>
              <input type="radio" id="secured-false" name="secured" value={false} onChange={e => this.handleChange('secured', e)} checked={!secured} />
              <label htmlFor="secured-false">no</label>
              {secured &&
                <section>
                  <label htmlFor='name'>Switch passkey:</label>
                  <input type={passkey_visible ? "text" : "password"} placeholder="codingRocks" value={passkey} onChange={e => this.handleChange('passkey', e)} />
                  <button type="button" value={!passkey_visible} onClick={e => this.handleChange('passkey_visible', e)}>
                    {passkey_visible ? "hide" : "show"} passkey
                </button>
                  {passkey_error && <p>* {passkey_error_message}</p>}
                </section>
              }
            </section>

            {!error && !!name && <input type="submit" value="Create switch" />}
          </form>
        }
        {created &&
          <section>
            Created successfully at {switch_id}
            <br />
            <Link to={`/manage/${switch_id}`}>
              <button>Manage your switch</button>
            </Link>
          </section>
        }
      </section>
    )
  }
}

export default Create;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { methods } from '../../database';
const { getSwitch } = methods;

class Manage extends Component {
  constructor(props) {
    super(props);
    const { switch_id } = props.match.params
    this.state = {
      switch_id,
      switch_data: {},
      not_found: false,
      searched: false
    }
  }

  componentDidMount() {
    const state = this.state;

    getSwitch(state.switch_id,
      switch_data => this.setState({
        searched: true,
        not_found: !switch_data,
        switch_data
      })
    )
  }


  render() {
    const { searched, not_found, switch_data } = this.state;
    const { name, active, secured, passkey } = switch_data;
    console.log(switch_data)
    return (
      <section>
        <Link to='/'>
          <button>Return to homepage</button>
        </Link>
        <h3>Manage</h3>
        {searched
          ? <section>
            {not_found
              ? <section>
                No data found
              </section>
              : <section>
                <ul>
                  <li>name: {name}</li>
                  <li>state: {active ? 'on' : 'off'}</li>
                  <li>secured: {secured ? 'yes' : 'no'}</li>
                  {secured &&
                    <li>passkey: {passkey}</li>
                  }
                </ul>
              </section>
            }
          </section>
          : <section>Loading</section>
        }
      </section>
    )
  }
}

export default Manage;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    this.setState({_isMounted})
  }

  handleToggle = toggle_state => {
    const { switchName } = this.props;
    fetch(`https://us-central1-hive-iot-switch.cloudfunctions.net/toggle/${switchName}/${toggle_state ? 'on' : 'off'}`)
      .then(console.log)
      .catch(console.log)
  }

  handleSearchNameChange = event => {
    this.setState({ searchName: event.target.value.toLowerCase() })
  }

  handleSearchName = () => {
    const { searchName } = this.state;
    const { switchName, setSwitchName } = this.props;
    // final syntactic validation of switchName
    getSwitch(searchName,
      switchData => {
        if (switchData) {
          if (switchData.switchName !== switchName) setSwitchName(switchData.name);
          this.setState({ switchData });
        } else this.setState({ searchNameErr: 'switch was not found. consider trying again or creating a new switch' })
      })
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
      <section>
        <Link to='/'>
          <button>Return to homepage</button>
        </Link>
        <h3>Manage</h3>
        {switchName
          ? <section>
            <ul>
              <li>switchName: {switchName}</li>
              <li>state: {active ? 'on' : 'off'}</li>
              <li>createdAt: {createdAt}</li>
              <li>
                <button onClick={() => this.handleToggle(true)}>toggle on</button>
              </li>
              <li>
                <button onClick={() => this.handleToggle(false)}>toggle off</button>
              </li>
              <li>
                <button onClick={this.handleReset}>manage another switch</button>
              </li>
            </ul>
          </section>
          : <section>
            <p>
              You don't seem to have a switch set up to manage.
            </p>
            <section>
              <label>find your switch</label><br />
              <input placeholder='team-11' value={searchName} onChange={this.handleSearchNameChange} />
              <button onClick={this.handleSearchName}>search</button>
              {searchNameErr && <p>* {searchNameErr}</p>}
              <br /><hr />
            </section>
            <Link to='/create'>
              <button>Create a new switch</button>
            </Link>
          </section>
        }
      </section>
    )
  }
}

export default Manage;
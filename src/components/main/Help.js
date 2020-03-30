import React, { Component } from 'react';
import { ReturnHome } from '../mini';

class Help extends Component {
  render() {
    return (
      <section className='hero is-fullheight-with-navbar'>
        <ReturnHome />
        <section className='hero-body'>
          <section className='container'>
            <section className="content">
              <h1 id="using-the-iot-switch">Using the IoT switch</h1>
              <hr />
              <p>There are four steps to using the switch.</p>
              <ol>
                <li>Create a new switch</li>
                <li>Test the switch on the manage page</li>
                <li>Toggle the switch programatically</li>
                <li>Poll the switch on the receiver to get the signal</li>
              </ol>
              <h2 id="toggle">Toggle</h2>
              <hr />
              <p>
                Once you’ve created a new switch and tested it, you can use it in your project!<br />
                To activate the switch online, once you’re ready to turn it on. Make a request to
              </p>
              <p className='box has-text-link'>
                https://us-central1-hive-iot-switch.cloudfunctions.net/toggle/test-switch/on
              </p>
              <p>
                but replace <code>test-switch</code> with the name of your switch.
                To turn it off, you simply make a similar request to
              </p>
              <p className='box has-text-link'>
                https://us-central1-hive-iot-switch.cloudfunctions.net/toggle/test-switch/off
              </p>
              <p>and again replace <code>test-switch</code> with the name of your switch.</p>
              <h2 id="poll">Poll</h2>
              <hr /> 
              <p>
                Polling is how we get the signal on the receiving raspberry pi. You should read up on how polling works and
                implement the procedure yourself. The api endpoint to get the status of your switch is
              </p>
              <p className='box has-text-link'>
                https://us-central1-hive-iot-switch.cloudfunctions.net/status/test-switch
              </p>
              <p>
                It should respond with text <code>active</code> or <code>inactive</code> depending on the state of your switch.
                </p>
            </section>
          </section>
        </section>
      </section>
    )
  }
}

export default Help;
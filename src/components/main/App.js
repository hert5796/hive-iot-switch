import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import { Home, Help, Create, Manage } from './'

import 'bulma/css/bulma.css'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			switchName: ''
		}
	}

	componentWillMount() {
		const switchName = localStorage.getItem('switchName');
		!!switchName && this.setState({ switchName });
	}

	setSwitchName = switchName => {
		localStorage.setItem('switchName', switchName);
		this.setState({ switchName });
	};

	render() {
		const { switchName } = this.state;
		return (
			<section>
				<BrowserRouter>
					<section data-testid="main-router">
						<Route exact path='/' component={Home} />
						<Route exact path='/help' component={Help} />
						<Route exact path='/manage' render={() => <Manage switchName={switchName} setSwitchName={this.setSwitchName} />} />
						<Route exact path='/create' render={() => <Create switchName={switchName} setSwitchName={this.setSwitchName} />} />
					</section>
				</BrowserRouter>
			</section>
		)
	}
}

export default App;

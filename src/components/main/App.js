import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import {Home, Help, Create, Manage} from './'

class App extends Component {
	render() {
		return (
			<section>
				<BrowserRouter>
					<section data-testid="main-router">
						<Route exact path='/' component={Home} />
						<Route exact path='/help' component={Help} />
						<Route exact path='/create' component={Create} />
						<Route path='/manage/:switch_id' component={Manage} />
					</section>
				</BrowserRouter>
			</section>
		)
	}
}

export default App;

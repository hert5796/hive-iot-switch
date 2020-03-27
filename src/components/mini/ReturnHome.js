import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ReturnHome() {
	return (
		<section className='hero-head'>
			<section className='navbar'>
				<section className='container'>
					<section className="navbar-brand">
						<span className="navbar-item">
							<Link to='/'>
								<button className='button is-dark'>
									<span className="icon">
										<FontAwesomeIcon icon={faArrowLeft} />
									</span>
									<span>
										Return to homepage
                      </span>
								</button>
							</Link>
						</span>
					</section>
				</section>
			</section>
		</section>
	)
}

export default ReturnHome;
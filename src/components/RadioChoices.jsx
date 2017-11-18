import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, List } from 'material-ui';

import GenresCollection from './GenresCollection.jsx';
import LocationCollection from './LocationCollection.jsx';
import * as GenreActions from '../actions/GenreActions';
import * as AudioActions from '../actions/AudioActions';
import * as LocationActions from '../actions/LocationActions.jsx';

export default class RadioChoices extends PureComponent {
	static propTypes = {
		genres: PropTypes.object,
		locations: PropTypes.object,
		dispatch: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);

		const { genres, locations, dispatch } = this.props;
		console.info('locations', locations);
		if (!genres.genres) {
			dispatch(GenreActions.getGenres());
		}
		if (!locations.has('results')) {
			dispatch(LocationActions.getLocations());
		}
	}

	startGenreRadio = (id) => {
		const { dispatch } = this.props;
		dispatch(AudioActions.startGenreRadio(id));
	}

	renderLocations() {
		const { locations } = this.props;
		if (locations.has('results')) {
			return (
				<LocationCollection
					locations={locations.get('results')}
					cols={4}
					/>
			);
		}
		return (
			<List />
		);
	}

	renderGenres() {
		const { genres } = this.props;
		if (genres.results) {
			return (
				<GenresCollection
					genres={genres.results}
					cols={4}
					/>
			);
		} else {
			return <List></List>;
		}
	}

	render() {
		return (
			<Tabs>
				<Tab label={'Genres'}>
					{this.renderGenres()}
				</Tab>
				<Tab label={'Location'}>
					{this.renderLocations()}
				</Tab>
			</Tabs>
		);
	}

}

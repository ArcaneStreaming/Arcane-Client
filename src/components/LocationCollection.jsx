import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { GridTile, GridList } from 'material-ui';
import Tile from './Tile';
import MediaQuery from 'react-responsive';
import { host } from '../constants/host';

const LocationCollection = (props) => {
	const { locations, cols } = props;
	console.info('in LocationCollection', props);

	const renderLocationTiles = () => {
		if (locations) {
			return locations.map((tile) => (
				<GridTile
					className='boxTile'
					cols={1}
					key={'locationTile_' + tile.get('id')}
					rows={1}
					>
					<Tile
						{...props}
						id={tile.get('id')}
						imgURL={tile.has('icon') ? tile.get('icon') : host + 'static/images/locations/default.jpg'}
						title={tile.get('name')}
						type={'location'}
						/>
				</GridTile>
			));
		}
	};

	const renderGrid = (cols) => {
		if (locations) {
			return (
				<GridList
					cols={cols}
					style={{ margin: 2, maxWidth: '100%', maxHeight: '100%' }}
					>
					{renderLocationTiles()}
				</GridList>
			);
		}
	};

	return (
		<div style={{ width:'100%',height:'100%' }}>
			<MediaQuery query='(min-device-width: 560px)'>
				<MediaQuery query='(max-width: 559px)'>
					{renderGrid(cols/2)}
				</MediaQuery>
				<MediaQuery query='(min-width: 560px)'>
					{renderGrid(cols)}
				</MediaQuery>
			</MediaQuery>
			<MediaQuery query='(max-device-width: 559px)'>
				{renderGrid(cols/2)}
			</MediaQuery>
		</div>
	);
};

LocationCollection.propTypes = {
	locations: ImmutablePropTypes.list.isRequired,
	cols: PropTypes.number,
};

export default LocationCollection;

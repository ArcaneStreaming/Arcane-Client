import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { GridTile, GridList } from 'material-ui';
import Tile from './Tile';
import MediaQuery from 'react-responsive';
import { host } from '../constants/host';

const styles = {
	flexGrid: {
		width: '100%',
		height: '100%',
		display: 'grid',
		gridAutoFlow: 'row',
		justifyItems: 'center',
	},
};

const LocationCollection = (props) => {
	const { locations, cols } = props;

	const renderLocationTiles = () => {
		if (locations) {
			return locations.map((tile) => (
				<Tile
					{...props}
					id={tile.get('id')}
					imgURL={tile.has('icon') ?
						tile.get('icon') : host + 'static/images/locations/default.jpg'}
					title={tile.get('name')}
					type={'location'}
					/>
			));
		}
	};

	const renderGrid = () => {
		if (locations) {
			return (
				<div>
					{// <GridList
					// 	cols={cols}
					// 	style={{ margin: 2, maxWidth: '100%', maxHeight: '100%' }}
					// 	>
					renderLocationTiles()
					// </GridList>
					}
				</div>
			);
		}
	};

	return (
		<div style={styles.flexGrid}>
			{renderGrid()}
		</div>
	);
	// return (
	// 	<div style={{ width:'100%',height:'100%' }}>
	// 		<MediaQuery query='(min-device-width: 560px)'>
	// 			<MediaQuery query='(max-width: 559px)'>
	// 				{renderGrid(cols/2)}
	// 			</MediaQuery>
	// 			<MediaQuery query='(min-width: 560px)'>
	// 				{renderGrid(cols)}
	// 			</MediaQuery>
	// 		</MediaQuery>
	// 		<MediaQuery query='(max-device-width: 559px)'>
	// 			{renderGrid(cols/2)}
	// 		</MediaQuery>
	// 	</div>
	// );
};

LocationCollection.propTypes = {
	locations: ImmutablePropTypes.list.isRequired,
	cols: PropTypes.number,
};

export default LocationCollection;

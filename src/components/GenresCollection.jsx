import React from 'react';
import PropTypes from 'prop-types';
import { GridTile, GridList } from 'material-ui';
import Tile from './Tile';
import MediaQuery from 'react-responsive';
import { host } from '../constants/host';

const GenresCollection = (props) => {
	const { genres, cols } = props;
	console.info('in GenreCollection', props);

	const renderGenreTiles = () => {
		if (genres) {
			let arr = genres.map((tile) => (
				<GridTile
					className="boxTile"
					cols={1}
					key={'genreTile_'+ tile.id}
					rows={1}
					>
					<Tile
						{...props}
						artists={tile.artists}
						cols={cols}
						id={tile.id}
						imgURL={tile.icon ? tile.icon : host + 'static/images/genres/hip_hop.jpg'}
						title={tile.name}
						type={'genre'}
						/>
				</GridTile>
			));
			return arr;
		}
	};

	const renderGrid = (cols) => {
		if(genres){
			return(
				<GridList
					cols={cols}
					style={{ margin:2, maxWidth:'100%', maxHeight:'100%' }}
					>
					{renderGenreTiles()}
				</GridList>
			);
		}
	};

	return(
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

GenresCollection.propTypes = {
	genres: PropTypes.array,
	cols: PropTypes.number,
};

export default GenresCollection;

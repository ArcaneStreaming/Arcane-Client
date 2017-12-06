import { getGenres } from './GenreActions';
import { getArtists } from './ArtistActions';
import { getAlbums } from './AlbumActions';
import { getTracks } from './TrackActions';

export function fetchData() {
	return (dispatch) => {
		dispatch(getGenres());
		dispatch(getArtists());
		dispatch(getAlbums());
		dispatch(getTracks());
	}
}

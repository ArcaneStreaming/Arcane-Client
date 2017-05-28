import React, { Component, PropTypes } from 'react';
import { Dialog, TextField, IconButton, FlatButton, SelectField, MenuItem } from 'material-ui';
import ImageUploader from './ImageUploader';

export default class AlbumForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedGenre: null
      }
   }

   handleGenreSelect = (event, index, value) => {
      this.setState({selectedGenre: value});
   }

   renderGenreOptions = (genres) => {
      const genreOptions = [];
      genres.map((genre, index) => {
         genreOptions.push(<MenuItem value={genre} key={"genre_" + index} primaryText={genre} />);
      });

      return genreOptions;
   }

   renderActions() {
      return [
         <FlatButton
            label='Cancel'
            primary={true}
            onTouchTap={this.props.handleCancel}
            />,
         <FlatButton
            label='Submit'
            primary={true}
            onTouchTap={this.props.handleSubmit}
            />
      ];
   }

   render() {
      return (
         <Dialog
            {...this.props}
            actions={this.renderActions()}
            autoDetectWindowHeight
            autoScrollBodyContent
            id={"album_form_dialog"}
            title={'Create a New Album'}
            >
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
               <TextField
                  floatingLabelText='Album Name'
                  fullWidth
                  id={'album_name'}
                  name={'album_name'}
                  style={{maxWidth: '47.5%'}}
                  type={'text'}
                  />
               <SelectField
                  floatingLabelText='Album Genre'
                  fullWidth
                  id={'album_genre'}
                  name={'album_genre'}
                  style={{maxWidth: '47.5%'}}
                  value={this.state.selectedGenre}
                  onChange={this.handleGenreSelect}
                  >
                  {this.renderGenreOptions(this.props.genres)}
               </SelectField>
            </div>
            <div style={{width: '50%', marginTop: '2vh'}}>
               <ImageUploader tooltip='Add Album Artwork' name='Album Artwork' />
            </div>
         </Dialog>
      );
   }
}

AlbumForm.propTypes = {
   handleCancel: PropTypes.func.isRequired,
   handleSubmit: Proptypes.func.isRequired,
   genres: PropTypes.Array.isRequired
}

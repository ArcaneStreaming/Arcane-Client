import React, { Component, PropTypes } from 'react'
import { Tabs, Tab, List, ListItem } from 'material-ui'

import * as GenreActions from '../actions/GenreActions'
import * as AudioActions from '../actions/AudioActions'

export default class RadioChoices extends Component {
   constructor(props) {
      super(props);

      const { genres, dispatch } = this.props;
      if (!genres.genres) {
         dispatch(GenreActions.getGenres());
      }
   }

   startGenreRadio = (id) => {
      const { dispatch } = this.props;
      dispatch(AudioActions.startGenreRadio(id));
   }

   renderLocations() {
      return (
         <h2>Fill in locations</h2>
      );
   }

   renderGenres() {
      const { genres } = this.props;
      if (genres.results) {
         let arr = genres.results.map((genre, index) => (
            <ListItem
               key={"genre_" + index}
               primaryText={genre.name}
               onClick={() => this.startGenreRadio(genre.id)}/>
         ))
         return <List>{arr}</List>
      } else {
         return <List></List>
      }
   }

   render() {
      return (
         <Tabs>
            <Tab label={"Genres"}>
               {this.renderGenres()}
            </Tab>
            <Tab label={"Location"}>
               {this.renderLocations()}
            </Tab>
         </Tabs>
      )
   }

}

import React, {Component} from 'react'
import { Route, DefaultRoute, IndexRoute } from 'react-router'

import App from '../containers/App'
import Upload from '../containers/UploadPage'
import Radio from '../containers/RadioPage'
import LandingPage from '../containers/LandingPage'
import MyMusic from '../containers/MyMusicPage'
import Browse from '../containers/BrowsePage'
import About from '../containers/AboutPage'
import SplashPage from '../containers/SplashPage'
import Settings from '../containers/SettingsPage'
import ProfilePage from '../containers/ProfilePage'
import PlaylistsPage from '../containers/PlaylistsPage'

function loggedIn() {
   if (window.sessionStorage.getItem("token")) {
      return true;
   } else {
      return false;
   }
}

function checkAuth(nextState, replace) {
   if (!loggedIn()) {
      replace({
         pathname: '/'
      })
   }
}


export default (
   <Route path="/" component={SplashPage}>
     <Route path="/app/" component={App} onEnter={checkAuth} >
       <IndexRoute component={Browse} />
       <Route path="upload" component={Upload} />
       <Route path="radio" component={Radio} />
       <Route path="my_music" component={MyMusic} />
       <Route path="browse" component={Browse} />
       <Route path="about" component={About} />
       <Route path="settings" component={Settings} />
       <Route path="profile/:id" component={ProfilePage} />
       <Route path="playlists/:id" component={PlaylistsPage} />
       <Route path="*" component={Browse} /> 
     </Route>
     <Route path="*" component={SplashPage} />
   </Route>
);

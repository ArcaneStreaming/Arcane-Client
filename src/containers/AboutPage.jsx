import React, { Component } from 'react'
import {Paper, Divider, Subheader} from 'material-ui'
import ThemeSwitcher from '../components/ThemeSwitcher'

export default class AboutPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
        open:true
      }
   }

   render() {
      return (
        <div style={{height:'calc(100vh - 64px)', width:'100vw', display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
          {/* <ThemeSwitcher {...this.props}/> */}
          <Paper style={{marginLeft:'auto', marginRight:'auto', padding:20, maxWidth:'90vw', maxHeight:'80vh', overflowY:'auto'}}>
            <Divider />
            <h1 id="arcane">Arcane</h1>
            <Divider />
            <h2 id="tableofcontents">Table of Contents</h2>
            <ul>
              <li><a href="#introduction">Introduction</a></li>
              <li><a href="#goal">Goal</a></li>
              <li><a href="#resources">Resources</a></li>
              <li><a href="#getting-started">Getting Started</a></li>
              <li><a href="#api-setup">API Setup</a></li>
              <li><a href="#client-setup">Client Setup</a></li>
              <li><a href="#running-arcane">Running Arcane</a></li>
              <li><a href="#challenges">Challenges</a></li>
              <li><a href="#how">How</a></li>
              <li><a href="#documentation">Documentation</a></li>
              <li><a href="#contributors">Contributors</a></li>
            </ul>
            <Divider />
            <h2 id="introduction">Introduction</h2>
            <p>This is a test repo for all of the tinkering and research during the senior project process Winter 2017</p>
            <Divider />
            <h2 id="goal">Goal</h2>
            <p>{"Common music applications on the web exist to service the needs of artists and listeners. Spotify and Pandora are examples of applications that focus on the needs of the listener, while SoundCloud or BandCamp focus more on creating a platform focused on artist. Arcane Streaming is based on the idea that many music enthusiasts want to find exciting, new artists that they have not yet heard. Arcane strives to bring listeners and artists to one location where they can share new music and find new bands."}</p>
            <Divider />
            <h2 id="resources">Resources</h2>
            <ul>
              <li><a href="https://www.python.org/">Python 3.5</a> - see <a href="http://tscott8.github.io/sr_project_researc/requirements.txt">requirements</a> for more detail
                <ul>
                  <li><a href="https://www.djangoproject.com/">Django</a></li>
                  <li><a href="http://www.django-rest-framework.org/">Django Rest Framework</a></li>
                  <li><a href="https://pillow.readthedocs.io/en/4.0.x/">Pillow</a></li>
                  <li><a href="https://mutagen.readthedocs.io/en/latest/">Mutagen</a></li>
                  <li><a href="https://github.com/desbma/sacad">Sacad</a></li></ul>
              </li>
              <li><a href="https://nodejs.org/en/">Node.js</a> - see <a href="http://tscott8.github.io/sr_project_researc/arcane/package.json">requirements</a> for more detail
                <ul>
                  <li><a href="https://facebook.github.io/react/">React</a></li>
                  <li><a href="http://redux.js.org/">Redux</a></li>
                  <li><a href="http://www.material-ui.com/#/">Material UI</a></li>
                  <li><a href="https://webpack.github.io/">Webpack</a></li></ul>
              </li>
            </ul>
            <Divider />
            <h2 id="gettingstarted">Getting Started</h2>
            <p>Arcane consists of 2 separate parts, server and client, like most web apps. You need to make sure both are configured correctly.
            </p>
            <h3 id="apisetup">API Setup</h3>
            <ol>
              <li>To get started, make sure you have python3 installed.</li>
              <li>Run <code>pip install virtualenv</code> to install a virtual environment kit.</li>
              <li>From the project directory run <code>. ./setup.sh</code> to setup the project. (it should automagically handle everything)</li>
              <li>You may need to create a new super user to use the admin features.</li>
            </ol>
            <h3 id="clientsetup">Client Setup</h3>
            <ol>
              <li>to get started, make sure you have node installed.</li>
              <li>In the <code>&lt;project_folder&gt;/arcane</code> run <code>npm install</code>. (this should take care of everything.)</li>
            </ol>
            <h3 id="runningarcane">Running Arcane</h3>
            <ol>
              <li>Once the setup has completed you should already be running the Django server. If the Django server is not running:</li>
            </ol>
            <ul>
              <li>Open a terminal in the project directory and run <code>source env/Scripts/activate</code> (Windows) or <code>source env/bin/activate</code> (Linux/OSX). This will activate your virtual environment that has all the django and python dependencies installed.</li>
              <li>Then change to the arcane directory using <code>cd arcane</code> and start the django server with <code>./manage.py runserver</code></li>
            </ul>
            <ol>
              <li>Open up another terminal in the project arcane directory and start the node server using <code>node server.js</code>. This will start webpack as well</li>
              <li>Now open a browser and go to <code>http://localhost:8000/</code>
              </li>
            </ol>
            <Divider />
            <h2 id="challenges">Challenges</h2>
            <ul>
              <li>Parse .mp3 file tags for relevant data</li>
              <li>Allow users to upload mp3 files</li>
              <li>Global access to audio tag</li>
              <li>Globally asynchronous audio control</li>
              <li>Adding songs to the queue</li>
              <li> RESTful API server setup</li>
              <li>Request Pagination</li>
              <li>Dynamically changing app theme</li>
            </ul>
            <Divider />
            <h2 id="how">How</h2>
            <p>Our application runs with a Django and DRF backend. These python frameworks allowed us to develop models and views quickly in a language we were comfortable with. Our front end utilizes React and Redux with a lot of components from the Material UI framework.
            Using Mutagen, we parsed the mp3 files uploaded to populate the genre, album, artist, and track names in our database. SACAD and Pillow were then employed to find and resize album and artist images.</p>
            <Divider />
            <h2 id="documentation">Documentation</h2>
            <p>{"under construction"}</p>
            <Divider />
            <h2 id="tutorials">Tutorials</h2>
            {/* <h4 id="login">Login</h4>

              <p><img style={{maxWidth:'50%'}}  src="https://raw.githubusercontent.com/tscott8/sr_project_research/master/arcane/static/images/tutorials/login.gif" alt="alt text" title="login" /></p>

              <h4 id="navigation">Navigation</h4>

              <p><img style={{maxWidth:'50%'}}  src="https://raw.githubusercontent.com/tscott8/sr_project_research/master/arcane/static/images/tutorials/browse_play.gif" alt="alt text" title="browse &amp; header component" /></p>

              <h4 id="uploadingmusic">Uploading Music</h4>

              <p><img style={{maxWidth:'50%'}}  src="https://raw.githubusercontent.com/tscott8/sr_project_research/master/arcane/static/images/tutorials/upload.gif" alt="alt text" title="upload component" /></p>

              <h5 id="usingtheradio">Using the Radio</h5>

              <p><img style={{maxWidth:'50%'}}  src="https://raw.githubusercontent.com/tscott8/sr_project_research/master/arcane/static/images/tutorials/radio.gif" alt="alt text" title="radio component" /></p>

              <h5 id="managingyourmusicaddingtothequeue">Managing your Music (adding to the queue)</h5>

              <p><img style={{maxWidth:'50%'}}  src="https://raw.githubusercontent.com/tscott8/sr_project_research/master/arcane/static/images/tutorials/my_music2.gif" alt="alt text" title="my music components" /></p>

              <h5 id="changingsettings">Changing Settings</h5>

            <p><img style={{maxWidth:'50%'}}  src="https://raw.githubusercontent.com/tscott8/sr_project_research/master/arcane/static/images/tutorials/settings.gif" alt="alt text" title="settings component" /></p> */}

            <Divider />
            <h2 id="contributors">Contributors</h2>

            <ol>
              <li><a href="https://github.com/tscott8">Tyler Scott</a></li>

              <li><a href="https://github.com/ssedrick">Shem Sedrick</a></li>
            </ol>
          </Paper>
            <h5>Also for testing uses</h5>
          </div>

          );
          }
          }

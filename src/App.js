import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './assets/App.scss';
import {FilesUploader} from './components/FilesUploader';
import {Gallery} from './components/Gallery';

function App() {
  return (
      <Router basename={'/testGalleries'}>
        <Switch>
          <Route exact path="/">
            <FilesUploader/>
          </Route>
          <Route path="/gallery">
            <Gallery/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;

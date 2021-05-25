import React, {useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './assets/App.scss';
import {FilesUploader} from './components/FilesUploader';
import {Gallery} from './components/Gallery';
import {AppContext} from './context/app/AppContext';

function App() {
  const {images} = useContext(AppContext);
  return (
      <Router>
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

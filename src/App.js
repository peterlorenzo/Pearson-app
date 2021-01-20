import React from 'react';
import logo from './logo.svg';
import './App.css';
import DataSets from './features/SetsPage/dataSets'
import Analysis from './features/analysis/analysis'
import styles from "./features/data/Data.module.css";
import FileReader from "./features/data/FileReader";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

function App() {
  return (
      <Router>
      <nav>
        <section>
          <h1>The Correlation Machine</h1>

          <div className="navContent">
            <div className="navLinks">
              <Link to="/">Upload</Link>
              <Link to="/Sets">Data Sets</Link>
              <Link to="/Analysis">Analysis</Link>
            </div>
          </div>
        </section>
      </nav>



    <div className="App">

      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}

        <Switch>
          <Route exact path ="/"  component={FileReader} />
          <Route exact path ="/Sets" component={DataSets} />
          <Route exact path ="/Analysis" component={Analysis} />

        </Switch>

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/*<span>*/}
        {/*  <span>Learn </span>*/}
        {/*  <a*/}
        {/*    className="App-link"*/}
        {/*    href="https://reactjs.org/"*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*  >*/}
        {/*    React*/}
        {/*  </a>*/}
        {/*  <span>, </span>*/}
        {/*  <a*/}
        {/*    className="App-link"*/}
        {/*    href="https://redux.js.org/"*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*  >*/}
        {/*    Redux*/}
        {/*  </a>*/}
        {/*  <span>, </span>*/}
        {/*  <a*/}
        {/*    className="App-link"*/}
        {/*    href="https://redux-toolkit.js.org/"*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*  >*/}
        {/*    Redux Toolkit*/}
        {/*  </a>*/}
        {/*  ,<span> and </span>*/}
        {/*  <a*/}
        {/*    className="App-link"*/}
        {/*    href="https://react-redux.js.org/"*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*  >*/}
        {/*    React Redux*/}
        {/*  </a>*/}
        {/*</span>*/}
      </header>
    </div>
      </Router>
  );
}

export default App;

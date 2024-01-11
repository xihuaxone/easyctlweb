import logo from './logo.svg';
import './App.css';
import RouterConfig from "./router/router";
import {Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          <Link to='/login'> login</Link>
          <Link to='/topics'> topics</Link>
      </header>
      <RouterConfig></RouterConfig>
    </div>
  );
}

export default App;

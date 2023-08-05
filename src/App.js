import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './component/Login';
import Home from './component/Home';
import Header from './component/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/home">
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

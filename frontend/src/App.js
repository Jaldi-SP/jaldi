import { useState } from 'react';
import './App.scss';
import Home from './Pages/Home/Home';
import Landing from './Pages/Landing/Landing';

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  if (authenticated) {
    return (
      <div className="App">
        <Home/>
      </div>
    )
  } else {
    return (
      <div className="App">
        <Landing setAuthenticated={setAuthenticated} />
      </div>
    )
  }
}

export default App;

import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

import MenuBar from './MenuBar.js'
import Grid from './Grid.js'
import VideoCard from './VideoCard.js';
import SearchBox from "./SearchBox/SearchBoxInPage.js"
import search from './search.js'

function App(){
  const [result, setResult] = useState([]);

  function handleChange(e){
    setResult(search(e.target.value))
  }

  return(
    <MenuBar onChange={handleChange}>
      <SearchBox onChange={handleChange}/>
      <Grid>
        {
          Array(9).fill().map((_, i) =>
            <VideoCard
              key={i}
              name={result[i] && result[i].name}
              link={result[i] && result[i].url}
            />
          )
        }
      </Grid>
    </MenuBar>
  )
}

export default App;


// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>

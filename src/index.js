import React/*, { useState }*/ from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('root'))

// function Greet(props) {
//   return <h2>Hello, {props.name}!</h2>
// }
//
// function Timer(){
//   const [count, setCount] = useState(0)
//   return (
//     <div>
//       <p> You click {count} times.</p>
//       <button onClick={() => setCount(count + 1)}>
//         click!
//       </button>
//     </div>
//   )
// }
//
// function Switcher(props){
//   const [state, setState] = useState(props.init === "on" ? true : false)
//   return (
//     <div>
//       <p>{state ? "on" : "off"}</p>
//       <button onClick={()=>setState(!state)}> click! </button>
//     </div>
//   )
// }
//
// function List(props){
//   return (
//     <div>
//       <ul>
//         {[1,2,3,4,5].map(num => <li key={num}>{num}</li>)}
//       </ul>
//     </div>
//   )
// }
//
// ReactDOM.render(
//   <div>
//     <Greet name="Alice"/>
//     <Switcher />
//     <Timer />
//     <List />
//   </div>,
//   document.getElementById('root')
// )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

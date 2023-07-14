import React, { ChangeEvent } from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios';
import threadsIcon from './threads.svg'

import { Footer } from './components/footer';

function App() {

  const [user, setUser] = React.useState("");
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState("");

  const userHandler = (e : ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  }
 
  const submitHandler = () => {
    if (user.includes('@')) {
      setError("Please enter your username without the @ symbol");
      return;
    }
    else if (user === "") {
      setError("Please enter your username");
      return;
    }
    else {
      setError("");
        axios.get(`http://localhost:8000/api/user/${user}`).then((res) => {
        const result = JSON.stringify(res.data);
        setResult(result);  // Set result state to the response data
      })
    }
  }

  return (
<div className="App">
  <div className="App-header">
  <h1> Thre<img src={threadsIcon}></img>ds </h1>
    <p>Generate your Thread ID card</p>
  </div>
  <div>{result}</div>
  <div className='user_form'>
    <div>
      <img src={threadsIcon} alt="threads icon" />
      <input type="text" name="" id="" onChange={userHandler} placeholder='zuck'/>
    </div>
    <button onClick={submitHandler}>Submit</button> 
  </div>
  <div className='error'>{error}</div>

  <Footer />
</div>


  );
}

export default App;

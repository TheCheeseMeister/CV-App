/* eslint-disable react/prop-types */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function SamplePage({name = "miles", email = "something@gmail.com"}) {
  return(
    <div>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  );
}

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onButtonClick = (event) => {
    event.preventDefault();

    console.log(event); // some local storage thing?
  };

  return (
    <>
      <div className="webpage-container">
        <div className="form-container">
          <header className="card">
            <h1>CV Builder</h1>
          </header>

          <div className="form card">
            <p>All requried fields are preceded by a *</p>
            <form action="">
              <div>
                <label htmlFor='name'>* Full Name:</label>
                <input type="text" name='name' value={name} onChange={() => {setName(event.target.value);}} placeholder='John Smith' required />
              </div>

              <div>
                <label htmlFor='mail'>* Email:</label>
                <input type="email" name='mail' value={email} onChange={() => {setEmail(event.target.value)}} placeholder='email@placeholder.com' required />
              </div>

              <button type="submit" onClick={onButtonClick}>Save</button>
            </form>
          </div>
        </div>
        
        <div className="sample">
          <SamplePage name={name} email={email} />
        </div>
      </div>
    </>
  );
}

export default App

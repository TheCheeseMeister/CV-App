/* eslint-disable react/prop-types */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function SamplePage({name = "miles", email = "something@gmail.com"}) {
  function Item(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(props.name);
  
    return isEditing ? (
      <div>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <button onClick={() => setIsEditing(false)}>Stop Editing</button>
      </div>
    ) : (
      <div onClick={() => setIsEditing(true)}>
        <p>{name}</p>
      </div>
    );
  }

  return(
    <div>
      <Item name={name}/>
      <Item name={email}/>
    </div>
  );
}

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());

    setName(formDataObj.name);
    setEmail(formDataObj.email);
  }

  return (
    <>
      <div className="webpage-container">
        <div className="form-container">
          <header className="card">
            <h1>CV Builder</h1>
          </header>

          <div className="form card">
            <p>All requried fields are preceded by a *</p>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor='name'>* Full Name:</label>
                <input type="text" name='name' placeholder='John Smith' required />
              </div>

              <div>
                <label htmlFor='mail'>* Email:</label>
                <input type="email" name='mail' placeholder='email@placeholder.com' required />
              </div>

              <button type="submit">Save</button>
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

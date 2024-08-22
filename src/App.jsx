/* eslint-disable react/prop-types */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useForm, useFieldArray, Controller } from "react-hook-form"
import { DevTool } from '@hookform/devtools'

function App() {
  const { register, control, handleSubmit, reset, trigger, setError} = useForm({

  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test"
  });

  return(
    <div className='container'>
      <form onSubmit={handleSubmit(data => console.log(data))}>
        <div className="field">
          <label>Full Name</label>
          <input {...register("firstName", {required: true})} />
        </div>

        <div className="field">
          <label>Email Address</label>
          <input {...register("email", {required: true})} />
        </div>

        <ul>
          <p>Education</p>
          {fields.map((item, index) => (
            <li key={item.id}>
              {/*<label>First Name</label>
              <input {...register(`test.${index}.firstName`)} />*/}
              <Controller
                render={({field}) => <input {...field} />}
                name={`test.${index}.firstName`}
                control={control}
              />
              <Controller
                render={({field}) => <input {...field} />}
                name={`test.${index}.lastName`}
                control={control}
              />
              <button type="button" onClick={() => remove(index)}>Delete</button>
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => append({ firstName: "Bill", lastName: "Luo"})}>Append</button>

        <input type="submit" />
      </form>

      <DevTool control={control} />
    </div>
  );
}

export default App

{/*const data = [
  { question: "Q1", answer: "A1"},
  { question: "Q2", answer: "A2"},
  { question: "Q3", answer: "A3"},
  { question: "Q4", answer: "A4"},
];

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [schools, setSchools] = useState(["Yippee"]);

  function handleSubmit(event) {
    event.preventDefault();
  
    console.log("Here's the stuff!");
    console.log(`Name: ${name}; Email: ${email}`);
    console.log(`Phone Number: ${phone}; Address: ${address}`);
  }

  function handleSchool(event, index) {
    event.preventDefault();

    console.log(schools[index]);
    console.log(index);
  }

  return (
    <>
      <div className="container">
        <h1>CV Builder</h1>

        <form action="" onSubmit={() => handleSubmit(event)}>
          <div className="fields">
            <div>
              <label htmlFor="name">Full Name</label>
              <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div>
              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>

          <details>
            <summary>Education</summary>

            {schools.map((school, index) => {
              return(
                <div key={index}>
                  <label htmlFor="school">School</label>
                  <input type="text" name="school" id="school" value={schools[index]} onChange={(e, key) => {handleSchool(e, key)}} />
                </div>
              );
            })}
          </details>
          
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}*/}
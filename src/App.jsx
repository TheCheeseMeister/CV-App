/* eslint-disable react/prop-types */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useForm, useFieldArray, Controller, useController } from "react-hook-form"
import { DevTool } from '@hookform/devtools'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

function App() {
  const {
    control, register, handleSubmit,
  } = useForm();

  const { fields: schoolsFields, append: schoolsAppend, remove: schoolsRemove } = useFieldArray({
    control,
    name: 'schools',
  });

  const { fields: jobsFields, append: jobsAppend, remove: jobsRemove } = useFieldArray({
    control,
    name: 'jobs',
  });

  {/*const [schools, setSchools] = useState([]);*/}

  function School(name, study, date) {
    this.name = name;
    this.study = study;
    this.date = date;
  }

  {/*function updateSchool(index, event, num) {
    event.preventDefault();
    let newArr = [...schools];

    if (num == 0) {
      newArr[index].name = event.target.value;
      setSchools(newArr);
    } else if (num == 1) {
      newArr[index].study = event.target.value;
      setSchools(newArr);
    } else if (num == 2) {
      newArr[index].date = event.target.value;
      setSchools(newArr);
    }
  }*/}

  const onSubmit = (data) => console.log(data);

  const { field: fullName } = useController({
    control: control,
    name: "Full Name",
    rules: { require: true },
  });

  const { field: email } = useController({
    control: control,
    name: "Email",
    rules: { require: true },
  });

  const { field: phone } = useController({
    control: control,
    name: "Phone Number",
    rules: { require: true },
  });

  const { field: address } = useController({
    control: control,
    name: "Address",
    rules: { require: true },
  });

  return(
    <div>
      <Container 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '500px',
          backgroundColor: 'red',
        }}
      >
        <Typography variant='h3' component='h1'>
          CV Builder
        </Typography>

        <Paper elevation={2}>
          <Typography variant='subtitle2' sx={{textAlign: 'center'}}>
            All required fields will have a asterik (*) next to it.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField 
                  label="Full Name" 
                  variant='outlined' 
                  required 
                  onChange={fullName.onChange}
                  value={fullName.value}
                  name={fullName.name}
                  inputRef={fullName.ref}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Email" 
                  variant='outlined' 
                  required 
                  onChange={email.onChange}
                  value={email.value}
                  name={email.name}
                  inputRef={email.ref}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Phone Number" 
                  variant='outlined' 
                  required 
                  onChange={phone.onChange}
                  value={phone.value}
                  name={phone.name}
                  inputRef={phone.ref}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label="Address" 
                  variant='outlined' 
                  required 
                  onChange={address.onChange}
                  value={address.value}
                  name={address.name}
                  inputRef={address.ref}
                />
              </Grid>
            </Grid>
            
            <Box sx={{
              display: 'flex', 
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
              <Typography variant="subtitle1" sx={{textAlign: 'center'}}>
                Education
              </Typography>
              
              <Button 
                variant="contained"
                onClick={() => {
                  /*setSchools(school => [...school, new School("", "", "")]);*/
                  schoolsAppend({ name: "", study: "", date: ""});
                }}
              >
                Add
              </Button>
            </Box>

            {schoolsFields.map((field, index) => {
              return(
                <>
                  <Accordion key={field.id} >
                    <AccordionSummary>
                      {`School #${index+1}`}
                      <Button
                        variant="outlined"
                        sx={{
                          transform: 'translateY(-10px)',
                          scale: 0.8,
                          marginLeft: 2,
                        }}
                        onClick={() => {
                            schoolsRemove(index);
                        }}
                      >
                        Remove
                      </Button>
                    </AccordionSummary>

                    <AccordionDetails>
                      <TextField label="School Name" variant="outlined" {...register(`schools.${index}.name`)} />
                      <TextField label="Study" variant="outlined" {...register(`schools.${index}.study`)} />
                      <TextField label="Date of Attendance" variant="outlined" {...register(`schools.${index}.date`)} />
                    </AccordionDetails>
                  </Accordion>
                </>
              );
            })}

            <Box sx={{
              display: 'flex', 
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
              <Typography variant="subtitle1" sx={{textAlign: 'center'}}>
                Jobs
              </Typography>
              
              <Button 
                variant="contained"
                onClick={() => {
                  /*setSchools(school => [...school, new School("", "", "")]);*/
                  jobsAppend({ name: "", position: "", start: "", end: "", description: ""});
                }}
              >
                Add
              </Button>
            </Box>

            {jobsFields.map((field, index) => {
              return(
                <>
                  <Accordion key={field.id} >
                    <AccordionSummary>
                      {`Job #${index+1}`}
                      <Button
                        variant="outlined"
                        sx={{
                          transform: 'translateY(-10px)',
                          scale: 0.8,
                          marginLeft: 2,
                        }}
                        onClick={() => {
                            jobsRemove(index);
                        }}
                      >
                        Remove
                      </Button>
                    </AccordionSummary>

                    <AccordionDetails>
                      <TextField label="Company Name" variant="outlined" {...register(`jobs.${index}.name`)} />
                      <TextField label="Position Title" variant="outlined" {...register(`schools.${index}.position`)} />
                      <TextField label="Start Date" variant="outlined" {...register(`schools.${index}.start`)} />
                      <TextField label="End Date" variant="outlined" {...register(`schools.${index}.end`)} />
                      <TextField multiline label="Description" variant="outlined" {...register(`schools.${index}.description`)} />
                    </AccordionDetails>
                  </Accordion>
                </>
              );
            })}

            <input type="submit" />
          </form>
          
        </Paper>
      </Container>

      {/*<DevTool control={control} />*/}
    </div>
  );
}

export default App
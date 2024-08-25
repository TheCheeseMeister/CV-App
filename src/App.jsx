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

import Divider from '@mui/material/Divider';

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

  /*Mock Paper States*/
  const [paperName, setPaperName] = useState("");
  const [paperEmail, setPaperEmail] = useState("");
  const [paperNumber, setPaperNumber] = useState("");
  const [paperAddress, setPaperAddress] = useState("");
  const [paperEducation, setPaperEducation] = useState([]);
  const [paperJobs, setPaperJobs] = useState([]);

  function School(name, study, date) {
    this.name = name;
    this.study = study;
    this.date = date;
  }

  function Job(name, position, start, end, desc) {
    this.name = name;
    this.position = position;
    this.start = start;
    this.end = end;
    this.desc = desc;
  }

  const onSubmit = (data) => {
    setPaperName(data.FullName);
    setPaperEmail(data.Email);
    setPaperNumber(data.PhoneNumber);
    setPaperAddress(data.Address);

    let tempEd = [];
    for (let school of data.schools) {
      tempEd.push(new School(school.name, school.study, school.date));
    }

    setPaperEducation(tempEd);

    let tempJobs = [];
    for (let job of data.jobs) {
      tempJobs.push(new Job(job.name, job.position, job.start, job.end, job.description));
    }

    setPaperJobs(tempJobs);
  }

  const { field: fullName } = useController({
    control: control,
    name: "FullName",
    rules: { require: true },
  });

  const { field: email } = useController({
    control: control,
    name: "Email",
    rules: { require: true },
  });

  const { field: phone } = useController({
    control: control,
    name: "PhoneNumber",
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
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '1000px',
          backgroundColor: 'red',
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
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
                        <TextField label="Position Title" variant="outlined" {...register(`jobs.${index}.position`)} />
                        <TextField label="Start Date" variant="outlined" {...register(`jobs.${index}.start`)} />
                        <TextField label="End Date" variant="outlined" {...register(`jobs.${index}.end`)} />
                        <TextField multiline label="Description" variant="outlined" {...register(`jobs.${index}.description`)} />
                      </AccordionDetails>
                    </Accordion>
                  </>
                );
              })}

              <input type="submit" />
            </form>
            
          </Paper>
        </Box>

        <Box>
          <Paper sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Box sx={{
              backgroundColor: '#2e7b8c',
              color: 'white',
              textAlign: 'center',
              padding: 2,
            }}>
              <Typography variant='h4'>
                {paperName}
              </Typography>

              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '24px',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Typography variant='subtitle1'>{paperEmail}</Typography>
                <Typography variant='subtitle1'>{paperNumber}</Typography>
                <Typography variant='subtitle1'>{paperAddress}</Typography>
              </Box>
            </Box>

            <Box sx={{
              margin: 2
            }}>
              <Box sx={{
                backgroundColor: '#bce0e8',
                textAlign: 'center'
              }}>
                <Typography>Education</Typography>
              </Box>

              {paperEducation.map((ed, index) => {
                return(
                  <Box key={index} sx={{marginTop: 2}}>
                    <Typography variant='subtitle1'>{ed.name}</Typography>
                    <Typography variant='subtitle2'>{ed.study}</Typography>
                    <Typography variant='subtitle2'>{ed.date}</Typography>
                  </Box>
                );
              })}
            </Box>

            <Box sx={{
              margin: 2
            }}>
              <Box sx={{
                backgroundColor: '#bce0e8',
                textAlign: 'center'
              }}>
                <Typography>Jobs</Typography>
              </Box>

              {paperJobs.map((job, index) => {
                return(
                  <Box key={index} sx={{marginTop: 2}}>
                    <Typography variant='subtitle1'>{job.name}</Typography>
                    <Typography variant='subtitle2'>{job.position}</Typography>
                    <Typography variant='subtitle2'>{job.start} - {job.end}</Typography>
                    <Typography variant='subtitle1'>{job.desc}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Box>
      </Container>

      {/*<DevTool control={control} />*/}
    </div>
  );
}

export default App
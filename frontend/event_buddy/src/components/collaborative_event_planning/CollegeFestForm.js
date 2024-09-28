// import React, { useState } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// // import { db } from '../firebaseConfig'; 
// import { storage, db } from './firebaseConfig';
// import { v4 as uuidv4 } from 'uuid'; // Import UUID library

// const CollegeFestForm = () => {
//   const [formData, setFormData] = useState({
//     eventName: '',
//     collegeName: '',
//     venue: '',
//     description: '',
//     date: '',
//     eventType: 'collegeFest',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Generate a unique ID for the event
//       const uniqueId = uuidv4();
//       // Save college fest event with the unique ID to 'collegeEvents' collection
//       await addDoc(collection(db, 'collegeEvents'), { ...formData, id: uniqueId });
//       alert('College Fest event added successfully!');

//       // Reset form
//       setFormData({ eventName: '', collegeName: '', venue: '', description: '', date: '', eventType: 'collegeFest' });
//     } catch (error) {
//       console.error('Error adding document: ', error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
//       <h2>College Fest Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '15px' }}>
//           <label>Event Name: </label>
//           <input
//             type="text"
//             name="eventName"
//             value={formData.eventName}
//             onChange={handleChange}
//             placeholder="Enter event name"
//             required
//             style={{ width: '100%', padding: '8px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>College Name: </label>
//           <input
//             type="text"
//             name="collegeName"
//             value={formData.collegeName}
//             onChange={handleChange}
//             placeholder="Enter college name"
//             required
//             style={{ width: '100%', padding: '8px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Venue: </label>
//           <input
//             type="text"
//             name="venue"
//             value={formData.venue}
//             onChange={handleChange}
//             placeholder="Enter venue"
//             required
//             style={{ width: '100%', padding: '8px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Description: </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter a description"
//             required
//             style={{ width: '100%', padding: '8px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Date: </label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//             style={{ width: '100%', padding: '8px' }}
//           />
//         </div>

//         <button type="submit" style={{ padding: '10px 20px' }}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CollegeFestForm;



// import React from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { v4 as uuidv4 } from 'uuid';
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   InputAdornment,
//   Tooltip,
// } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import {
//   Event as EventIcon,
//   School as SchoolIcon,
//   LocationOn as LocationOnIcon,
//   Description as DescriptionIcon,
//   CalendarToday as CalendarTodayIcon,
// } from '@mui/icons-material';
// import { db } from './firebaseConfig';

// // Custom MUI theme for a professional look
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#0D47A1', // Dark Blue
//     },
//     secondary: {
//       main: '#FF6F00', // Vibrant Orange
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//     h4: {
//       fontWeight: 700,
//     },
//     body1: {
//       color: '#555555',
//     },
//   },
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#FFFFFF',
//           borderRadius: '5px',
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: '5px',
//           textTransform: 'none',
//           padding: '10px 20px',
//           fontSize: '16px',
//         },
//       },
//     },
//   },
// });

// // Validation schema for form fields
// const validationSchema = Yup.object({
//   eventName: Yup.string().required('Please enter the event name'),
//   collegeName: Yup.string().required('Please enter the college name'),
//   venue: Yup.string().required('Please enter the venue'),
//   description: Yup.string().required('Please enter a description'),
//   date: Yup.date().required('Please select a date'),
// });

// const CollegeFestForm = () => {
//   const handleSubmit = async (values, actions) => {
//     try {
//       const uniqueId = uuidv4();
//       await addDoc(collection(db, 'collegeEvents'), { ...values, id: uniqueId });
//       actions.setSubmitting(false);
//       actions.resetForm();
//       alert('College Fest event added successfully!');
//     } catch (error) {
//       console.error('Error adding document:', error);
//       actions.setSubmitting(false);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
//         <Card
//           sx={{
//             boxShadow: 10,
//             borderRadius: 4,
//             background: 'linear-gradient(to right, #ece9e6, #ffffff)',
//           }}
//         >
//           <CardContent sx={{ p: { xs: 3, md: 6 } }}>
//             <Typography variant="h4" align="center" gutterBottom color="primary">
//               College Fest Registration
//             </Typography>
//             <Typography variant="body1" align="center" paragraph>
//               Please fill out the form below to register your college fest event.
//             </Typography>
//             <Formik
//               initialValues={{
//                 eventName: '',
//                 collegeName: '',
//                 venue: '',
//                 description: '',
//                 date: '',
//                 eventType: 'collegeFest',
//               }}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({
//                 handleSubmit,
//                 handleChange,
//                 values,
//                 touched,
//                 errors,
//                 isSubmitting,
//               }) => (
//                 <form onSubmit={handleSubmit} noValidate>
//                   <Grid container spacing={4}>
//                     <Grid item xs={12} sm={6}>
//                       <Tooltip title="Enter the name of the event" arrow>
//                         <TextField
//                           fullWidth
//                           label="Event Name"
//                           name="eventName"
//                           value={values.eventName}
//                           onChange={handleChange}
//                           variant="outlined"
//                           required
//                           error={touched.eventName && Boolean(errors.eventName)}
//                           helperText={touched.eventName && errors.eventName}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <EventIcon color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       </Tooltip>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Tooltip title="Enter the name of the college" arrow>
//                         <TextField
//                           fullWidth
//                           label="College Name"
//                           name="collegeName"
//                           value={values.collegeName}
//                           onChange={handleChange}
//                           variant="outlined"
//                           required
//                           error={touched.collegeName && Boolean(errors.collegeName)}
//                           helperText={touched.collegeName && errors.collegeName}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <SchoolIcon color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       </Tooltip>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Tooltip title="Enter the venue of the event" arrow>
//                         <TextField
//                           fullWidth
//                           label="Venue"
//                           name="venue"
//                           value={values.venue}
//                           onChange={handleChange}
//                           variant="outlined"
//                           required
//                           error={touched.venue && Boolean(errors.venue)}
//                           helperText={touched.venue && errors.venue}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <LocationOnIcon color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       </Tooltip>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Tooltip title="Provide a brief description of the event" arrow>
//                         <TextField
//                           fullWidth
//                           label="Description"
//                           name="description"
//                           value={values.description}
//                           onChange={handleChange}
//                           variant="outlined"
//                           required
//                           multiline
//                           rows={4}
//                           error={touched.description && Boolean(errors.description)}
//                           helperText={touched.description && errors.description}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <DescriptionIcon color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       </Tooltip>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Tooltip title="Select the date of the event" arrow>
//                         <TextField
//                           fullWidth
//                           label="Date"
//                           name="date"
//                           type="date"
//                           value={values.date}
//                           onChange={handleChange}
//                           variant="outlined"
//                           required
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                           error={touched.date && Boolean(errors.date)}
//                           helperText={touched.date && errors.date}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <CalendarTodayIcon color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       </Tooltip>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         disabled={isSubmitting}
//                         sx={{
//                           '&:hover': {
//                             backgroundColor: theme.palette.primary.dark,
//                           },
//                         }}
//                       >
//                         {isSubmitting ? 'Submitting...' : 'Submit'}
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </form>
//               )}
//             </Formik>
//           </CardContent>
//         </Card>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default CollegeFestForm;




import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Event as EventIcon,
  School as SchoolIcon,
  LocationOn as LocationOnIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarTodayIcon,
} from '@mui/icons-material';
import { db } from './firebaseConfig';

// Custom MUI theme for a professional look
const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1', // Dark Blue
    },
    secondary: {
      main: '#FF6F00', // Vibrant Orange
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
    },
    body1: {
      color: '#555555',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderRadius: '5px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          textTransform: 'none',
          padding: '10px 20px',
          fontSize: '16px',
        },
      },
    },
  },
});

// Validation schema for form fields
const validationSchema = Yup.object({
  eventName: Yup.string().required('Please enter the event name'),
  collegeName: Yup.string().required('Please enter the college name'),
  venue: Yup.string().required('Please enter the venue'),
  description: Yup.string().required('Please enter a description'),
  date: Yup.date().required('Please select a date'),
});

const CollegeFestForm = () => {
  const handleSubmit = async (values, actions) => {
    try {
      const uniqueId = uuidv4();
      await addDoc(collection(db, 'collegeEvents'), { ...values, id: uniqueId });
      actions.setSubmitting(false);
      actions.resetForm();
      alert('College Fest event added successfully!');
    } catch (error) {
      console.error('Error adding document:', error);
      actions.setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="d-flex flex-column min-vh-100"> {/* Added flexbox container */}
        <Container maxWidth="md" sx={{ mt: 8, mb: 8, flexGrow: 1 }}>
          <Card
            sx={{
              boxShadow: 10,
              borderRadius: 4,
              background: 'linear-gradient(to right, #ece9e6, #ffffff)',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 6 } }}>
              <Typography variant="h4" align="center" gutterBottom color="primary">
                College Fest Registration
              </Typography>
              <Typography variant="body1" align="center" paragraph>
                Please fill out the form below to register your college fest event.
              </Typography>
              <Formik
                initialValues={{
                  eventName: '',
                  collegeName: '',
                  venue: '',
                  description: '',
                  date: '',
                  eventType: 'collegeFest',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  touched,
                  errors,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <Tooltip title="Enter the name of the event" arrow>
                          <TextField
                            fullWidth
                            label="Event Name"
                            name="eventName"
                            value={values.eventName}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            error={touched.eventName && Boolean(errors.eventName)}
                            helperText={touched.eventName && errors.eventName}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EventIcon color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Tooltip title="Enter the name of the college" arrow>
                          <TextField
                            fullWidth
                            label="College Name"
                            name="collegeName"
                            value={values.collegeName}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            error={touched.collegeName && Boolean(errors.collegeName)}
                            helperText={touched.collegeName && errors.collegeName}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SchoolIcon color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12}>
                        <Tooltip title="Enter the venue of the event" arrow>
                          <TextField
                            fullWidth
                            label="Venue"
                            name="venue"
                            value={values.venue}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            error={touched.venue && Boolean(errors.venue)}
                            helperText={touched.venue && errors.venue}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LocationOnIcon color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12}>
                        <Tooltip title="Provide a brief description of the event" arrow>
                          <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            multiline
                            rows={4}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <DescriptionIcon color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12}>
                        <Tooltip title="Select the date of the event" arrow>
                          <TextField
                            fullWidth
                            label="Date"
                            name="date"
                            type="date"
                            value={values.date}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={touched.date && Boolean(errors.date)}
                            helperText={touched.date && errors.date}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CalendarTodayIcon color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={isSubmitting}
                          sx={{
                            '&:hover': {
                              backgroundColor: theme.palette.primary.dark,
                            },
                          }}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Container>

        {/* Footer */}
        <footer style={{ padding: "20px", background: "#3f51b5", color: "#fff" ,scrollBehavior:null}}>
          <Container>
            <Typography variant="body1" align="center">
              © 2024 EventBuddy. All Rights Reserved.
            </Typography>
          </Container>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default CollegeFestForm;

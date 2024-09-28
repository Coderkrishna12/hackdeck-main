// // import React, { useState } from 'react';
// // import { collection, addDoc } from 'firebase/firestore';
// // import { storage, db } from './firebaseConfig';
// // import { v4 as uuidv4 } from 'uuid'; 

// // const CorporateEventForm = () => {
// //   const [formData, setFormData] = useState({
// //     eventName: '',
// //     companyName: '',
// //     venue: '',
// //     description: '',
// //     date: '',
// //     eventType: 'corporateEvent',
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Generate a unique ID for the event
// //       const uniqueId = uuidv4();
// //       // Save corporate event with the unique ID to 'corporateEvents' collection
// //       await addDoc(collection(db, 'corporateEvents'), { ...formData, id: uniqueId });
// //       alert('Corporate event added successfully!');

// //       // Reset form
// //       setFormData({ eventName: '', companyName: '', venue: '', description: '', date: '', eventType: 'corporateEvent' });
// //     } catch (error) {
// //       console.error('Error adding document: ', error);
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
// //       <h2>Corporate Event Form</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div style={{ marginBottom: '15px' }}>
// //           <label>Event Name: </label>
// //           <input
// //             type="text"
// //             name="eventName"
// //             value={formData.eventName}
// //             onChange={handleChange}
// //             placeholder="Enter event name"
// //             required
// //             style={{ width: '100%', padding: '8px' }}
// //           />
// //         </div>

// //         <div style={{ marginBottom: '15px' }}>
// //           <label>Company Name: </label>
// //           <input
// //             type="text"
// //             name="companyName"
// //             value={formData.companyName}
// //             onChange={handleChange}
// //             placeholder="Enter company name"
// //             required
// //             style={{ width: '100%', padding: '8px' }}
// //           />
// //         </div>

// //         <div style={{ marginBottom: '15px' }}>
// //           <label>Venue: </label>
// //           <input
// //             type="text"
// //             name="venue"
// //             value={formData.venue}
// //             onChange={handleChange}
// //             placeholder="Enter venue"
// //             required
// //             style={{ width: '100%', padding: '8px' }}
// //           />
// //         </div>

// //         <div style={{ marginBottom: '15px' }}>
// //           <label>Description: </label>
// //           <textarea
// //             name="description"
// //             value={formData.description}
// //             onChange={handleChange}
// //             placeholder="Enter a description"
// //             required
// //             style={{ width: '100%', padding: '8px' }}
// //           />
// //         </div>

// //         <div style={{ marginBottom: '15px' }}>
// //           <label>Date: </label>
// //           <input
// //             type="date"
// //             name="date"
// //             value={formData.date}
// //             onChange={handleChange}
// //             required
// //             style={{ width: '100%', padding: '8px' }}
// //           />
// //         </div>

// //         <button type="submit" style={{ padding: '10px 20px' }}>
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CorporateEventForm;



// import React, { useState } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { storage, db } from './firebaseConfig'; // Ensure firebaseConfig is correctly set up
// import { v4 as uuidv4 } from 'uuid'; // Import UUID library
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
// import {
//   Business as BusinessIcon,
//   Event as EventIcon,
//   LocationOn as LocationOnIcon,
//   Description as DescriptionIcon,
//   CalendarToday as CalendarTodayIcon,
// } from '@mui/icons-material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Formik } from 'formik';
// import * as Yup from 'yup';

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

// // Form validation schema using Yup
// const validationSchema = Yup.object({
//   eventName: Yup.string().required('Please enter the event name'),
//   companyName: Yup.string().required('Please enter the company name'),
//   venue: Yup.string().required('Please enter the venue'),
//   description: Yup.string().required('Please enter a description'),
//   date: Yup.date().required('Please select a date'),
// });

// const CorporateEventForm = () => {
//   const initialValues = {
//     eventName: '',
//     companyName: '',
//     venue: '',
//     description: '',
//     date: '',
//     eventType: 'corporateEvent',
//   };

//   const handleSubmit = async (values, actions) => {
//     try {
//       // Generate a unique ID for the event
//       const uniqueId = uuidv4();
//       // Save corporate event with the unique ID to 'corporateEvents' collection
//       await addDoc(collection(db, 'corporateEvents'), { ...values, id: uniqueId });
//       alert('Corporate event added successfully!');

//       // Reset form
//       actions.resetForm();
//     } catch (error) {
//       console.error('Error adding document: ', error);
//     }
//     actions.setSubmitting(false);
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
//               Corporate Event Registration
//             </Typography>
//             <Typography variant="body1" align="center" paragraph>
//               Please fill out the form below to register your corporate event.
//             </Typography>
//             <Formik
//               initialValues={initialValues}
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
//                       <Tooltip title="Enter the name of the company" arrow>
//                         <TextField
//                           fullWidth
//                           label="Company Name"
//                           name="companyName"
//                           value={values.companyName}
//                           onChange={handleChange}
//                           variant="outlined"
//                           required
//                           error={touched.companyName && Boolean(errors.companyName)}
//                           helperText={touched.companyName && errors.companyName}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <BusinessIcon color="primary" />
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

// export default CorporateEventForm;







import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from './firebaseConfig'; // Ensure firebaseConfig is correctly set up
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
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
import {
  Business as BusinessIcon,
  Event as EventIcon,
  LocationOn as LocationOnIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarTodayIcon,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';

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

// Form validation schema using Yup
const validationSchema = Yup.object({
  eventName: Yup.string().required('Please enter the event name'),
  companyName: Yup.string().required('Please enter the company name'),
  venue: Yup.string().required('Please enter the venue'),
  description: Yup.string().required('Please enter a description'),
  date: Yup.date().required('Please select a date'),
});

const CorporateEventForm = () => {
  const initialValues = {
    eventName: '',
    companyName: '',
    venue: '',
    description: '',
    date: '',
    eventType: 'corporateEvent',
  };

  const handleSubmit = async (values, actions) => {
    try {
      // Generate a unique ID for the event
      const uniqueId = uuidv4();
      // Save corporate event with the unique ID to 'corporateEvents' collection
      await addDoc(collection(db, 'corporateEvents'), { ...values, id: uniqueId });
      alert('Corporate event added successfully!');

      // Reset form
      actions.resetForm();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    actions.setSubmitting(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Card
          sx={{
            boxShadow: 10,
            borderRadius: 4,
            background: 'linear-gradient(to right, #ece9e6, #ffffff)',
            marginBottom: '100px', // Create space for the footer
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 6 } }}>
            <Typography variant="h4" align="center" gutterBottom color="primary">
              Corporate Event Registration
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Please fill out the form below to register your corporate event.
            </Typography>
            <Formik
              initialValues={initialValues}
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
                      <Tooltip title="Enter the name of the company" arrow>
                        <TextField
                          fullWidth
                          label="Company Name"
                          name="companyName"
                          value={values.companyName}
                          onChange={handleChange}
                          variant="outlined"
                          required
                          error={touched.companyName && Boolean(errors.companyName)}
                          helperText={touched.companyName && errors.companyName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <BusinessIcon color="primary" />
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

      {/* Footer Component */}
      <footer
        style={{
          padding: '20px',
          background: '#3f51b5',
          color: '#fff',
          width: '100%',
          position: 'relative', // Changed to relative
          bottom: 0,
        }}
      >
        <Container>
          <Typography variant="body1" align="center">
            © 2024 EventBuddy. All Rights Reserved.
          </Typography>
        </Container>
      </footer>
    </ThemeProvider>
  );
};

export default CorporateEventForm;

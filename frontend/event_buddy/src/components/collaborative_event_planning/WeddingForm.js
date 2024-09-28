// import React, { useState } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// // import { db } from '../firebaseConfig'; 
// import { storage, db } from './firebaseConfig';
// import { v4 as uuidv4 } from 'uuid'; // Import UUID library

// const WeddingForm = () => {
//   const [formData, setFormData] = useState({
//     groomName: '',
//     brideName: '',
//     venue: '',
//     date: '',
//     description: '',
//     eventType: 'wedding',
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
//       // Save wedding event with the unique ID to 'weddingEvents' collection
//       await addDoc(collection(db, 'weddingEvents'), { ...formData, id: uniqueId });
//       alert('Wedding event added successfully!');

//       // Reset form
//       setFormData({ groomName: '', brideName: '', venue: '', date: '', description: '', eventType: 'wedding' });
//     } catch (error) {
//       console.error('Error adding document: ', error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
//       <h2>Wedding Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '15px' }}>
//           <label>Groom Name: </label>
//           <input
//             type="text"
//             name="groomName"
//             value={formData.groomName}
//             onChange={handleChange}
//             placeholder="Enter groom's name"
//             required
//             style={{ width: '100%', padding: '8px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label>Bride Name: </label>
//           <input
//             type="text"
//             name="brideName"
//             value={formData.brideName}
//             onChange={handleChange}
//             placeholder="Enter bride's name"
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

//         <button type="submit" style={{ padding: '10px 20px' }}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default WeddingForm;



// import React from 'react';
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
//   Person as PersonIcon,
//   LocationOn as LocationOnIcon,
//   CalendarToday as CalendarTodayIcon,
//   Description as DescriptionIcon,
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
//   groomName: Yup.string().required('Please enter the groom\'s name'),
//   brideName: Yup.string().required('Please enter the bride\'s name'),
//   venue: Yup.string().required('Please enter the venue'),
//   description: Yup.string().required('Please enter a description'),
//   date: Yup.date().required('Please select a date'),
// });

// const WeddingForm = () => {
//   const initialValues = {
//     groomName: '',
//     brideName: '',
//     venue: '',
//     date: '',
//     description: '',
//     eventType: 'wedding',
//   };

//   const handleSubmit = async (values, actions) => {
//     try {
//       // Generate a unique ID for the event
//       const uniqueId = uuidv4();
//       // Save wedding event with the unique ID to 'weddingEvents' collection
//       await addDoc(collection(db, 'weddingEvents'), { ...values, id: uniqueId });
//       alert('Wedding event added successfully!');

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
//               Wedding Event Registration
//             </Typography>
//             <Typography variant="body1" align="center" paragraph>
//               Please fill out the form below to register a wedding event.
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
//                     <Grid item xs={12}>
//                       <Tooltip title="Enter the groom's name" arrow>
//                         <TextField
//                           fullWidth
//                           label="Groom Name"
//                           name="groomName"
//                           value={values.groomName}
//                           onChange={handleChange}
//                           variant="outlined"
//                           required
//                           error={touched.groomName && Boolean(errors.groomName)}
//                           helperText={touched.groomName && errors.groomName}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <PersonIcon color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       </Tooltip>
//                     </Grid>

//                     <Grid item xs={12}>
//                       <Tooltip title="Enter the bride's name" arrow>
//                         <TextField
//                           fullWidth
//                           label="Bride Name"
//                           name="brideName"
//                           value={values.brideName}
//                           onChange={handleChange}
//                           variant="outlined"
//                           required
//                           error={touched.brideName && Boolean(errors.brideName)}
//                           helperText={touched.brideName && errors.brideName}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <PersonIcon color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       </Tooltip>
//                     </Grid>

//                     <Grid item xs={12}>
//                       <Tooltip title="Enter the venue of the wedding event" arrow>
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
//                       <Tooltip title="Select the date of the wedding event" arrow>
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
//                       <Tooltip title="Provide a brief description of the wedding event" arrow>
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

// export default WeddingForm;






import React from 'react';
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
  Person as PersonIcon,
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarTodayIcon,
  Description as DescriptionIcon,
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
  groomName: Yup.string().required('Please enter the groom\'s name'),
  brideName: Yup.string().required('Please enter the bride\'s name'),
  venue: Yup.string().required('Please enter the venue'),
  description: Yup.string().required('Please enter a description'),
  date: Yup.date().required('Please select a date'),
});

const WeddingForm = () => {
  const initialValues = {
    groomName: '',
    brideName: '',
    venue: '',
    date: '',
    description: '',
    eventType: 'wedding',
  };

  const handleSubmit = async (values, actions) => {
    try {
      // Generate a unique ID for the event
      const uniqueId = uuidv4();
      // Save wedding event with the unique ID to 'weddingEvents' collection
      await addDoc(collection(db, 'weddingEvents'), { ...values, id: uniqueId });
      alert('Wedding event added successfully!');

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
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 6 } }}>
            <Typography variant="h4" align="center" gutterBottom color="primary">
              Wedding Event Registration
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Please fill out the form below to register a wedding event.
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
                    <Grid item xs={12}>
                      <Tooltip title="Enter the groom's name" arrow>
                        <TextField
                          fullWidth
                          label="Groom Name"
                          name="groomName"
                          value={values.groomName}
                          onChange={handleChange}
                          variant="outlined"
                          required
                          error={touched.groomName && Boolean(errors.groomName)}
                          helperText={touched.groomName && errors.groomName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Tooltip>
                    </Grid>

                    <Grid item xs={12}>
                      <Tooltip title="Enter the bride's name" arrow>
                        <TextField
                          fullWidth
                          label="Bride Name"
                          name="brideName"
                          value={values.brideName}
                          onChange={handleChange}
                          variant="outlined"
                          required
                          error={touched.brideName && Boolean(errors.brideName)}
                          helperText={touched.brideName && errors.brideName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Tooltip>
                    </Grid>

                    <Grid item xs={12}>
                      <Tooltip title="Enter the venue of the wedding event" arrow>
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
                      <Tooltip title="Select the date of the wedding event" arrow>
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
                      <Tooltip title="Provide a brief description of the wedding event" arrow>
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
      <footer style={{ padding: "20px", background: "#3f51b5", color: "#fff", width: "100%", position: "absolute" }}>
        <Container>
          <Typography variant="body1" align="center">
            © 2024 EventBuddy. All Rights Reserved.
          </Typography>
        </Container>
      </footer>
    </ThemeProvider>
  );
};

export default WeddingForm;

import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
 
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Notification from '@components/HOC/Notification'
import MakeRequest from "@utils/MakeRequest";
import { signUp } from "@utils/Constant";


const SignUp = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });
  const [notification,setNotification] = useState({visible:false,message:""})

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(formData).some((item) => item.trim() === "")) {
      setNotification({visible:true,message:"Please fill in all the details."})
    } else {
      MakeRequest.postAuth(signUp, formData)
        .then((response) => {
          setNotification({visible:true,message:"Your account has been set up successfully. Please login to continue"})
        })
        .catch((err) => {
          console.error(err);
          setNotification({visible:true,message:"Email address already in use."})
        });
    }
  };

  const handleChange = (event) => {
    let obj = {};
    let key = event.target.getAttribute("name");
    obj[key] = event.target.value;
    setFormData({ ...formData, ...obj });
  };

  return (
    // <ThemeProvider theme={theme}>
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="FirstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="LastName"
                  label="Last Name"
                  name="LastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="Email"
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="password"
                  onChange={handleChange}
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
      <Notification notification={notification} setNotification={setNotification}/>
     
    </>
  );
}


export default SignUp
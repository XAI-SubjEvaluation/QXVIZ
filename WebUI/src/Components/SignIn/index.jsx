import React,{useState} from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormControlLabel, Avatar, Button, CssBaseline, TextField, Checkbox, Container, Typography, Box } from '@mui/material';
import MakeRequest from "@utils/MakeRequest";
import { signIn } from "@utils/Constant";
import Notification from '@components/HOC/Notification'



export default function SignIn() {
  
  const [formData, setFormData] = useState({Email: "",Password: ""});
  const [notification,setNotification] = useState({visible:false,message:""})
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(formData).some((item) => item.trim() === "")) {
      setNotification({visible:true,message:"Please fill in all the details."})
    } else {
      MakeRequest.postAuth(signIn, formData)
        .then((response) => {
          console.log(response)
          setNotification({visible:true,message:"Logged In Sucessfully"})
          let obj = JSON.parse(response?.data)
          localStorage.setItem("PersonID",obj?.PersonID)
          window.history.pushState({},undefined,"/survey")
          window.location.reload();

        })
        .catch((err) => {
          console.error(err);
          setNotification({visible:true,message:"Incorrect email address or password."})
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

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="Email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            sx={{
                marginTop: 4,
                
              }}
            required
            fullWidth
            name="Password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          
        </Box>
      </Box>
      <Notification notification={notification} setNotification={setNotification}/>

    </Container>

  );
}
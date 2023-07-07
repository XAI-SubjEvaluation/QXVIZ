import React from "react";
import {
    Snackbar
  } from "@mui/material";


const Notification = ({notification,setNotification}) => {
    
   
    return (
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notification?.visible}
        message={notification?.message}
        autoHideDuration={3000}
        onClose={()=>{setNotification({...notification,visible:false})}}
      />
    )


}

export default Notification



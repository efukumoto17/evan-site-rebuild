import React from "react";
import axios from 'axios';
import utilStyles from '../../styles/utils.module.css';
import { Box, Paper } from '@material-ui/core';



export default function Profile({ user }) {
   console.log(user)
   const [profile, setProfile] = React.useState(user);
   const [isError, setIsError] = React.useState(false);


   const fetchProfile = async () => {
      try {
         const res = await axios.get("/api/profile", {
            headers: {
            "Content-Type": "application/json",
            },
         });
         const data = res.data;
         data?.success ? setIsError(false) : setIsError(true);
         setProfile(data.profile);
      } catch (err) {
         console.log(err.message);
      }
   }
   React.useEffect(() => {
      fetchProfile();
   }, []);

   return(
      <Box>
         <Paper className={utilStyles.paper}>
            {console.log(profile)}
            {console.log(profile?.display_name)}
               {profile?.display_name &&
               <div className={utilStyles.flexbox}>
                  <div className={utilStyles.flex_small}>
                     <img src={profile.images[0].url} style={{ height: 50 }}/>
                  </div>
                  <div className={utilStyles.flexbig}>
                     <div>{profile.display_name}</div>
                     <div>{profile.email}</div>
                  </div>
               </div>}
         </Paper>
      </Box>
   )
}
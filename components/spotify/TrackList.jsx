import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
   root: {
     width: '100%',
     maxWidth: 360,
     backgroundColor: theme.palette.background.paper,
     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
   },
 }));

export default function TrackList({ tracks }) {
   const classes = useStyles();
   const playTrack = (track) => {
      
   } 

   return (
      <div className={classes.root}>
         <List>
            {tracks.map(track => (
            <div>
               <ListItem key={track.id}>
                  <ListItemIcon>
                     <img style={{ height: 50 }} src={track.album.images[0].url} alt={track.name} />
                  </ListItemIcon>
                  <ListItemText primary={track.name} secondary={track.artists[0].name} />
               </ListItem>
               <Divider />
            </div>
            ))}
         </List>
      </div>
   ); 
}
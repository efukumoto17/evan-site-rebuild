import * as React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { ExpandMoreIcon } from '@material-ui/icons';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 



export default function SongLyrics({ song }) {
   const [expanded, setExpanded] = React.useState(false);
   const [songLyrics, setSongLyrics] = React.useState('');
   console.log(song)
   React.useEffect(() => {
      const Genius = require("genius-lyrics");
      const Client = new Genius.Client();

      Client.songs.search("faded").then(song => {
         console.log(song)
         const firstSong = searches[0];
         const lyrics = firstSong.lyrics().then(lyrics => {
            setSongLyrics(lyrics);
         });
      });
   });

   return (
      <div className="song-lyrics">
         {console.log(songLyrics)}
         {/* <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography variant="h6">Lyrics</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Typography variant="body1">
                  {songLyrics}
               </Typography>
            </AccordionDetails>
         </Accordion> */}
      </div>
   );
}
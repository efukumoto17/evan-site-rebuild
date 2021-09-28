import axios from 'axios';
import utilStyles from '../../styles/utils.module.css';
import React from 'react';
import TrackList from './TrackList';
import { IconButton } from '@material-ui/core';
import { PlayArrow, Pause } from '@material-ui/icons';
import { SkipNext } from '@material-ui/icons';
import { SkipPrevious } from '@material-ui/icons';
import { Box, Paper } from '@material-ui/core';
import SongLyrics from './SongLyrics';

export default function SpotifyPlayer({  playing }) {

   const [nowPlaying, setNowPlaying] = React.useState({});
   const [isPlaying, setIsPlaying] = React.useState(false);
   const [artistTopTracks, setArtistTopTracks] = React.useState([]);
   const [isError, setIsError] = React.useState(false);


   const fetchPlayback = async () => {
      try {
         const res = await axios.get("/api/playback", {
            headers: {
            "Content-Type": "application/json",
            },
         });
         const data = res.data;
         data?.success ? setIsError(false) : setIsError(true);
         console.log(res.data);
         setNowPlaying(res.data?.playback?.item);
         setIsPlaying(res.data?.playback?.is_playing);
         const artistId = res.data?.playback?.item?.artists[0]?.id;
         const topTracks = await axios.get(`/api/artistsTopSongs/${artistId}`, {
            headers: {
               "Content-Type": "application/json",
            },
         });
         console.log(topTracks);
         setArtistTopTracks(topTracks.data?.tracks.tracks);
      } catch (err) {
         console.log(err.message);
      }
   };

   React.useEffect(() => {
      fetchPlayback();
   }, []);
   console.log(nowPlaying)

   const handlePlayback = () => {
      isPlaying ? pausePlayback() : playPlayback();
      setIsPlaying(!isPlaying);
   };

   const pausePlayback = () => {
      if (!isError && nowPlaying) {
         axios.put("/api/playback/pause").then(() => console.log("paused"));
      }
   };

   const playPlayback = () => {
      if (!isError && nowPlaying) {
         axios.put("/api/playback/play").then(() => console.log("played"));
      }
   };

   let skipToNext = () => {
      if (!isError && nowPlaying) {
         axios.put("/api/playback/skip")
         .then((resp) => {
            fetchPlayback();
         });
         
      }
   }
   let skipToPrevious = () => {
      if (!isError && nowPlaying) {
         axios.put("/api/playback/previous").then(() => {
            fetchPlayback();
         });
      }
   }

   return (
      <div className={utilStyles.playerBackground}>
         <div>
            {console.log(artistTopTracks)}
            <Box>
            <Paper className={utilStyles.paper}>
               <div className={utilStyles.flexbox}>
                  <div className={utilStyles.flexbig}>
                     <div>{nowPlaying.name || ""}</div> 
                     <div>{nowPlaying.name ? nowPlaying.artists[0]?.name : ""} </div>
                     <div className={utilStyles.lightText}>{nowPlaying.album?.name}</div>
                     {nowPlaying.name &&
                        <div> 
                           <IconButton className={utilStyles.playerButton} onClick={() => skipToPrevious()}>
                              <SkipPrevious/>
                           </IconButton>
                           {isPlaying ? 
                           <IconButton className={utilStyles.playerButton} onClick={() => handlePlayback()}>
                              <Pause/>
                           </IconButton> :
                           <IconButton className={utilStyles.playerButton} onClick={() => handlePlayback()}>
                              <PlayArrow/>
                           </IconButton>}
                           <IconButton className={utilStyles.playerButton} onClick={() => skipToNext()}>
                              <SkipNext/>
                           </IconButton>
                        </div>
                     }
                  </div>
                  <div className={utilStyles.flex_small}>
                     <img src={ nowPlaying.album?.images[0].url} style={{ height: 150 }}/>
                  </div>
               </div>
               {/* {nowPlaying.name && 
                <SongLyrics song={nowPlaying?.name + " " + nowPlaying.artists[0]?.name }/>} */}
            </Paper>
            </Box>
            {artistTopTracks?.length > 0 &&
               <div>
                  <h2>{nowPlaying.artists[0]?.name + "'s"} Top Tracks</h2>
                  <TrackList tracks={artistTopTracks} />
               </div>
            }
         </div>
      </div>
   );

}

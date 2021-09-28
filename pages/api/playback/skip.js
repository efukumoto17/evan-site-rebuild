import { customPost
 } from "../../../utils/spotify/customPost";
export default async (req, res) => {
   try {
      const resp = await customPost("https://api.spotify.com/v1/me/player/next", {
         req,
         res,
      });
      console.log(resp);
      console.log("resp")
      console.log(resp);
      res.status(200).json({ message: "Skip Successful" });
   } catch (err) {
      console.log(err.message);
   }
};

import { customPost } from "../../../utils/spotify/customPost";
export default async (req, res) => {
   try {
      const resp = await customPost("https://api.spotify.com/v1/me/player/previous", {
         req,
         res,
      });
      console.log(resp);
      res.status(200).json({ message: "Previous Successful" });
   } catch (err) {
      console.log(err.message);
   }
};

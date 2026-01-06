import { NextApiRequest, NextApiResponse } from "next";
import { customGet } from "../../../utils/spotify/customGet";

export default async (req, res) => {
  try {
    const playback = await customGet(
      "https://api.spotify.com/v1/me/player?market=from_token",
      {
        req,
        res,
      }
    );
    return res.status(200).json({ success: true, playback });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ success: false });
  }
};

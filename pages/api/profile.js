import { NextApiRequest, NextApiResponse } from "next";
import { customGet } from "../../utils/spotify/customGet";

export default async (req, res) => {
  try {
    const profile = await customGet(
      "https://api.spotify.com/v1/me",
      {
        req,
        res,
      }
    );
    res.status(200).send({ success: true, profile });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false });
  }
};

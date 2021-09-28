import { NextApiRequest, NextApiResponse } from "next";
import { customGet } from "../../../utils/spotify/customGet";

export default async (req, res) => {
  const { id } = req.query;
  try {
    const tracks = await customGet(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=from_token`,
      {
        req,
        res,
      }
    );
    res.status(200).send({ success: true, tracks });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false });
  }
};

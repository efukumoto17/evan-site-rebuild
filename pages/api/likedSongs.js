import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session?.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const limit = 50;
    let offset = 0;
    let allTracks = [];
    let hasMore = true;

    // Fetch all liked songs (paginated)
    while (hasMore) {
      const response = await fetch(
        `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch liked songs");
      }

      const data = await response.json();
      allTracks = allTracks.concat(data.items);

      if (data.items.length < limit) {
        hasMore = false;
      } else {
        offset += limit;
      }
    }

    res.status(200).json({ tracks: allTracks });
  } catch (error) {
    console.error("Error fetching liked songs:", error);
    res.status(500).json({ error: "Failed to fetch liked songs" });
  }
}

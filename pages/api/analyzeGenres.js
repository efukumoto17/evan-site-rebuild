import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session?.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Get liked songs
    const tracksResponse = await fetch(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/likedSongs`,
      {
        headers: {
          cookie: req.headers.cookie,
        },
      }
    );

    if (!tracksResponse.ok) {
      throw new Error("Failed to fetch liked songs");
    }

    const { tracks } = await tracksResponse.json();

    // Extract unique artist IDs
    const artistIds = new Set();
    tracks.forEach((item) => {
      item.track.artists.forEach((artist) => {
        artistIds.add(artist.id);
      });
    });

    // Fetch artist details in batches (Spotify allows max 50 per request)
    const artistIdArray = Array.from(artistIds);
    const artistDetails = [];

    for (let i = 0; i < artistIdArray.length; i += 50) {
      const batch = artistIdArray.slice(i, i + 50);
      const response = await fetch(
        `https://api.spotify.com/v1/artists?ids=${batch.join(",")}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch artist details");
      }

      const data = await response.json();
      artistDetails.push(...data.artists);
    }

    // Analyze genres
    const genreMap = {};
    const tracksByGenre = {};

    artistDetails.forEach((artist) => {
      if (artist && artist.genres) {
        artist.genres.forEach((genre) => {
          if (!genreMap[genre]) {
            genreMap[genre] = 0;
            tracksByGenre[genre] = [];
          }
          genreMap[genre]++;
        });
      }
    });

    // Map tracks to genres
    tracks.forEach((item) => {
      const trackGenres = new Set();

      item.track.artists.forEach((artist) => {
        const artistDetail = artistDetails.find((a) => a && a.id === artist.id);
        if (artistDetail && artistDetail.genres) {
          artistDetail.genres.forEach((genre) => {
            trackGenres.add(genre);
          });
        }
      });

      trackGenres.forEach((genre) => {
        if (tracksByGenre[genre]) {
          tracksByGenre[genre].push({
            id: item.track.id,
            uri: item.track.uri,
            name: item.track.name,
            artists: item.track.artists.map((a) => a.name).join(", "),
          });
        }
      });
    });

    // Sort genres by count
    const sortedGenres = Object.entries(genreMap)
      .sort((a, b) => b[1] - a[1])
      .map(([genre, count]) => ({
        genre,
        count,
        tracks: tracksByGenre[genre],
      }));

    res.status(200).json({
      genres: sortedGenres,
      totalTracks: tracks.length,
      totalArtists: artistIdArray.length,
    });
  } catch (error) {
    console.error("Error analyzing genres:", error);
    res.status(500).json({ error: "Failed to analyze genres" });
  }
}

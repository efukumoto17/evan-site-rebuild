import { useState } from "react";

export default function PlaylistGenerator() {
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [genres, setGenres] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [creatingPlaylist, setCreatingPlaylist] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const analyzeGenres = async () => {
    setAnalyzing(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/analyzeGenres");

      if (!response.ok) {
        throw new Error("Failed to analyze genres");
      }

      const data = await response.json();
      setGenres(data.genres);
      setStats({
        totalTracks: data.totalTracks,
        totalArtists: data.totalArtists,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const createPlaylist = async (genre, tracks) => {
    setCreatingPlaylist(genre);
    setError(null);
    setSuccessMessage(null);

    try {
      const trackUris = tracks.map((track) => track.uri);

      const response = await fetch("/api/createPlaylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genre,
          trackUris,
          playlistName: `${genre.charAt(0).toUpperCase() + genre.slice(1)} Mix`,
          isPublic: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create playlist");
      }

      const data = await response.json();
      setSuccessMessage(
        `Successfully created playlist "${data.playlist.name}" with ${data.playlist.trackCount} tracks!`
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setCreatingPlaylist(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Spotify Playlist Generator</h1>
        <p className="text-gray-600">
          Analyze your liked songs and create playlists based on genres
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {!genres.length ? (
        <div className="text-center">
          <button
            onClick={analyzeGenres}
            disabled={analyzing}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analyzing ? "Analyzing..." : "Analyze My Liked Songs"}
          </button>
        </div>
      ) : (
        <>
          {stats && (
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold mb-2">Your Music Stats</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.totalTracks}
                  </p>
                  <p className="text-gray-600">Liked Songs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.totalArtists}
                  </p>
                  <p className="text-gray-600">Artists</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {genres.length}
                  </p>
                  <p className="text-gray-600">Genres</p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Genres Found</h2>
            <button
              onClick={analyzeGenres}
              disabled={analyzing}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {analyzing ? "Analyzing..." : "Re-analyze"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {genres.map(({ genre, count, tracks }) => (
              <div
                key={genre}
                className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-1 capitalize">
                  {genre}
                </h3>
                <p className="text-gray-600 mb-3">{count} tracks</p>

                <button
                  onClick={() => createPlaylist(genre, tracks)}
                  disabled={creatingPlaylist === genre}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creatingPlaylist === genre
                    ? "Creating..."
                    : "Create Playlist"}
                </button>

                {tracks.length > 0 && (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                      View tracks ({tracks.length})
                    </summary>
                    <ul className="mt-2 text-sm space-y-1 max-h-40 overflow-y-auto">
                      {tracks.slice(0, 10).map((track) => (
                        <li key={track.id} className="text-gray-700">
                          {track.name} - {track.artists}
                        </li>
                      ))}
                      {tracks.length > 10 && (
                        <li className="text-gray-500 italic">
                          ...and {tracks.length - 10} more
                        </li>
                      )}
                    </ul>
                  </details>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

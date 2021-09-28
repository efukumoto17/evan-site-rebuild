
import Heading from "../../components/spotify/Heading"
import { getGreeting } from "../../utils/spotify/getGreeting";
import SpotifyPlayer from "../../components/spotify/Player";
import Profile from "../../components/spotify/Profile";
import Layout from "../../components/layout";

export default function Home({ }) {

  return (
    <Layout>
    <div className="w-full p-4">
      <h1 className="mb-5 text-3xl font-bold">Good {getGreeting()}</h1>
      <Heading text="Player" className="mt-10" />
      <Profile />
      <SpotifyPlayer />
    </div>
    </Layout>
  );
}

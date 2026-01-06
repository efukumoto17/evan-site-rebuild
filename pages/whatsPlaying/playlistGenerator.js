import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import PlaylistGenerator from "../../components/spotify/PlaylistGenerator";

export default function PlaylistGeneratorPage() {
  return (
    <Layout>
      <PlaylistGenerator />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/whatsPlaying/login?callbackUrl=http://127.0.0.1:3000/whatsPlaying/playlistGenerator",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

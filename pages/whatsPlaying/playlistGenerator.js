import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout";
import PlaylistGenerator from "../../components/spotify/PlaylistGenerator";

export default function PlaylistGeneratorPage({ session }) {
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/whatsPlaying/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

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
        destination: "/whatsPlaying/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

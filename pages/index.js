import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { Button, Stack, Text } from '@chakra-ui/react'

export default function Home({}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Text fontSize="lg" mb={6}>
          Welcome to my personal website. Explore my Spotify integrations below.
        </Text>
      </section>
      <Stack spacing={4} maxW="400px">
        <Link href="/whatsPlaying/home" passHref>
          <Button
            as="a"
            colorScheme="blue"
            size="lg"
            width="100%"
            fontSize="lg"
            py={7}
          >
            What's Playing
          </Button>
        </Link>
        <Link href="/whatsPlaying/playlistGenerator" passHref>
          <Button
            as="a"
            colorScheme="green"
            size="lg"
            width="100%"
            fontSize="lg"
            py={7}
          >
            Playlist Generator
          </Button>
        </Link>
      </Stack>
    </Layout>
  )
}

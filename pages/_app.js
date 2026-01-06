// import '../styles/global.css'
import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps:{ session, ...pageProps}}) {
  console.log(session)
   return (
    <ChakraProvider>
      <Provider session={session}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
    )
 }

 
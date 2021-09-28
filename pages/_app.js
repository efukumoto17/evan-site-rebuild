// import '../styles/global.css'
import { Provider } from 'next-auth/client'

export default function App({ Component, pageProps:{ session, ...pageProps}}) {
  console.log(session)
   return (
    <Provider session={session}>
      <Component {...pageProps} />
    </Provider>
    )
 }

 
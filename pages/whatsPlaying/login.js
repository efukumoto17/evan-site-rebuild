import { signIn } from "next-auth/client"
import { useRouter } from "next/router"

export default function Login() {
   const router = useRouter();

   const handleLogin = () => {
      // Get the callbackUrl from the query params, or use default
      const callbackUrl = router.query.callbackUrl || "http://127.0.0.1:3000/whatsPlaying/home";

      signIn("spotify", {
         callbackUrl: callbackUrl
      });
    };

   return (
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-20">
         <img
         src="/images/spotify_logo.png"
         alt="spotify logo"
         className="object-contain h-24 w-80"
         />
         <button
         className="flex px-12 py-2 text-lg tracking-widest uppercase rounded-full focus:outline-none bg-primary hover:bg-opacity-80"
         onClick={handleLogin}
         >
         Login
         </button>
      </div>
   )
}
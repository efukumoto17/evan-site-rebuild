import { getSession } from "next-auth/client";
import Router from "next/router";
// import SpotifyWebApi from "spotify-web-api-js";

// const spotifyApi = new SpotifyWebApi();

export const customGet = async (url, ctx, fn, params) => {
  const session = await getSession(ctx);
  

  if (!session?.user) {
    ctx.res?.writeHead(302, {
      Location: "/whatsPlaying/login",
    });
    ctx.res?.end();
    return;
  }

  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (resp.status === 401 && !ctx.req) {
    Router.replace("/whatsPlaying/login");
    return {};
  }

  if (resp.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: "/whatsPlaying/login",
    });
    ctx.res?.end();
    return;
  }
  // console.log("resp")
  // console.log(resp)
  const json = await resp.json();
  return json;
};

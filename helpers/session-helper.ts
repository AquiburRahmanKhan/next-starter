import nookies, { parseCookies } from "nookies";
import axios from "axios";
import * as jwt_decode from 'jwt-decode';
import Router from 'next/router';

/**
 * Seed access token and refresh token to cookies
 * @param data
 */
export const seed = (data: any) => {
    if (data.access_token) {
        nookies.set(null, "access_token", data.access_token, { sameSite: "Lax", path: '/' });
    }

    if (data.refresh_token) {
        nookies.set(null, "refresh_token", data.refresh_token, { sameSite: "Lax", path: '/' });
    }
}

/**
 * Logout user and clear cookies
 */
export const logout = () => {
    nookies.destroy(null, "access_token", { path: '/' });
    nookies.destroy(null, "refresh_token", { path: '/' });
}

/**
 * Get access token
 */
export const getAccessToken = async () => {
  const { access_token } = parseCookies();

  if (access_token && isTokenValid(access_token)) {
    return access_token;
  }

  /* If we already have a refresh token, try to get a new access token */
  const { refresh_token } = parseCookies();
  if (refresh_token && isTokenValid(refresh_token)) {
    return await axios({
      method: 'post',
      url: `${process.env.api}/refresh-token`,
      data: {
        token: `${refresh_token}`
      },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      seed(res.data);
      return res.data.access_token;
    }, (err) => {
      Router.push(`/logout?redirectUrl=${encodeURIComponent(Router.router.asPath)}`);
    })
  }

  Router.push(`/logout?redirectUrl=${encodeURIComponent(Router.router.asPath)}`);
}

/**
 * Check if token is valid
 * @param token
 */
const isTokenValid = (token: string): boolean => {
  const now = Date.now() / (1000 * 60);
  const data = decodeToken(token);

  if (data && data.exp) {
    const expiry = data.exp / 60;
    return ( expiry - 1 ) > now;
  }

  return false;
}

/**
 * decode jwt token
 * @param token
 */
const decodeToken = (token: string): any => {
  return jwt_decode(token);
}

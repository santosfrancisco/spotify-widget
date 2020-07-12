import axios from 'axios'
import qs from 'querystring'

export const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/'
})

export const spotifyAccount = axios.create({
  baseURL: 'https://accounts.spotify.com/'
})

const AUTH_BASE64 = Buffer.from(process.env.ClientID + ":" + process.env.ClientSecret).toString('base64')

export const getToken = async (code) => {
  try {
    const { data } = await spotifyAccount.post('/api/token',
      qs.stringify({
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': `${process.env.BASE_URL}/auth`
      }),
      {
        headers: {
          'Authorization': `Basic ${AUTH_BASE64}`,
        },
      }
      )
    return data
  } catch (error) {
    return error
  }
}

export const refreshToken = async (refreshToken) => {
  try {
    const { data } = await spotifyAccount.post('/api/token',
      qs.stringify({
        'grant_type': 'refresh_token',
        "refresh_token": refreshToken
      }),
      {
        headers: {
          'Authorization': `Basic ${AUTH_BASE64}`,
          'content-type': 'application/x-www-form-urlencoded'
        },
      }
    )
    return data
  } catch (error) {
    return error
  }
}

export const getUserInfo = async (token) => {
  try {
    const data = await spotifyApi.get('/v1/me/',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    )
    return data
  } catch (error) {
    return error.response
  }; 
}

export const getSong = async (token) => {
  try {
    const {data} = await spotifyApi.get('/v1/me/player/currently-playing',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    )
    return data
  } catch (error) {
    return error.response
  }; 
}
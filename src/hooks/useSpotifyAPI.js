import { useState, useEffect } from 'react'
import * as api from '../services/api'
import * as spotifyService from '../services/spotify'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const useSpotifyAPI = (user) => {
  const [ songData, setSongData ] = useState({})
  const [ loggedUser, setLoggedUser ] = useState(null)
  const [ authInfo, setAuthInfo ] = useState(null)

  const [ ls, setLs ] = useLocalStorage('spotify_user', null)

  const createOrUpdateUser = async (userId, params) => {
    const { data, success } = await api.getUser(user)

    if (success && data?.user) {
      api.updateUser(data.user, params)
        .then((data) => console.log('THEN update', data))
    } else {
      const payload = { ...params, user: userId }
      api.createUser(payload)
        .then((data) => console.log('THEN create', data))
    }
  }


  const refreshToken = async () => {
    const data = await spotifyService.refreshToken(authInfo.refresh_token)
    if(data?.access_token) setAuthInfo(data)
  }

  const errorHandling = async ({ data }) => {
    if (data?.error) {
      if(data?.error?.message === "The access token expired" ) {
        await refreshToken()
        return
      }
      return
    }
  }

  const setSpotifyUserInfo = (token) => {
    spotifyService.getUserInfo(token)
      .then((data) => {
        errorHandling(data)
        if (data?.data && !data?.data?.error) {
          setLoggedUser(data.data.id)
          setLs(data.data.id)
        }
      })
  }

  const getToken = (code) => {
    spotifyService.getToken(code)
      .then((data) => {
        errorHandling(data)
        setAuthInfo(data)
      })
      .catch(err => console.log('getToken -> ', err))
  }

  const getCurrentPlayingSong = async () => {
    if (authInfo?.access_token) {
      spotifyService.getSong(authInfo?.access_token)
        .then((data) => {
          errorHandling(data)
          setSongData(data)
        })
        .catch(err => console.log('getCurrentPlayingSong -> ', { err }))
    } else {
      const { data, success } = await api.getUser(user)
      if(success && data) setAuthInfo(data)
    }
  }

  useEffect(() => {
    if (user) api.getUser(user).then(data => data && setAuthInfo(data))
  }, [ user ])

  useEffect(() => {
    if (authInfo?.access_token) setSpotifyUserInfo(authInfo.access_token)
  }, [ authInfo ])

  useEffect(() => {
    if (loggedUser && authInfo) createOrUpdateUser(loggedUser, authInfo)
  }, [ loggedUser, authInfo ])

  useEffect(() => {
    if (loggedUser) getCurrentPlayingSong()
  }, [ loggedUser ])

  return {
    user: loggedUser,
    getToken,
    getCurrentPlayingSong,
    songData,
  }
}
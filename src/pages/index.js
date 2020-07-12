import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { FaSpotify } from 'react-icons/fa'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Button = styled.button`
  width: 180px;
  height: 40px;
  background-color: #2b2b;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`

const BGContainer = styled.div`
  background-image: url('/bg.jpeg');
  background-size: cover;
  height: 30vh;

`

const Home = () => {
  const [ spotifyUser ] = useLocalStorage('spotify_user')

  const goToSpotifyLogin = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${process.env.ClientID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.BASE_URL)}/auth&scope=user-read-private user-read-email user-read-playback-state user-read-currently-playing`
  }

  return (
    <div>
      <BGContainer />
      <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!spotifyUser && <Button onClick={goToSpotifyLogin}>
          <FaSpotify style={{ marginRight: 8 }} />
          <span>Login with spotify</span>
        </Button>}

        {spotifyUser && <div style={{ padding: 24 }}>
          <pre>User: {JSON.stringify(spotifyUser)}</pre>
          <p>WIDGET:</p>
          <Link href={`/current/${spotifyUser}`}>
            <a>{`${process.env.BASE_URL}/current/${spotifyUser}`}</a>
          </Link>
          <div>
            <p>API:</p>
            <p>{`${process.env.BASE_URL}/api/now/${spotifyUser}`}</p>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Home

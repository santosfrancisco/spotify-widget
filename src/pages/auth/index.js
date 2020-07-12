import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSpotifyAPI } from '../../hooks/useSpotifyAPI'
import { useRouter } from 'next/router'

const Auth = () => {
  const router = useRouter()
  const { code } = router.query
  const [ready, setReady] = useState(false)
  const { getToken, user } = useSpotifyAPI()
  useEffect(() => {
    getToken(code)
  }, [code])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true)
    }, 5000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if(user) router.push('/')
  }, [user])

  return (
    <div>
      <h1>Autenticando...</h1>
      {ready && (<div>
          <p>Caso não seja redirecionado automaticamente, <Link href="/"><a>clique aqui!</a></Link></p>
        </div>)}
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const { code } = query

  return {
    props: { code },
  }
}

export default Auth

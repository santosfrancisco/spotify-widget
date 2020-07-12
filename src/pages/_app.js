import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head'

import ResetCSS from '../styles/resetcss'
import GlobalStyle from '../styles/global-style'

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
        </Head>
        <ThemeProvider theme={theme}>
          <ResetCSS />
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
}
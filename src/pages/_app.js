import App from "next/app";
import { ThemeProvider } from "styled-components";
import Head from "next/head";

import ResetCSS from "../styles/resetcss";
import GlobalStyle from "../styles/global-style";

const awesomegrid = {
  container: {
    xs: "full", // 'full' = max-width: 100%
    sm: 48, // max-width: 768px
    md: 48, // max-width: 768px
    lg: 48, // max-width: 768px
    xl: 48, // max-width: 768px
  },
};

const theme = {
  colors: {
    primary: "#0070f3",
  },
  awesomegrid,
};
export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <ThemeProvider theme={theme}>
          <ResetCSS />
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col } from "react-awesome-styled-grid";
import { FaSpotify } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { H1, H2, H3 } from "../components/Headings";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Pineapple from "../components/Pineapple";
import I18nProvider from "../components/I18nProvider";

const Home = () => {
  const [spotifyUser] = useLocalStorage("spotify_user");

  const goToSpotifyLogin = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${
      process.env.ClientID
    }&response_type=code&redirect_uri=${encodeURIComponent(
      process.env.BASE_URL
    )}/auth&scope=user-read-private user-read-email user-read-playback-state user-read-currently-playing`;
  };

  return (
    <I18nProvider>
      <Container>
        <Row justify="center">
          <Col align="center">
            <Pineapple type="listen" width={200} />
            <H1>
              <FormattedMessage id="home.title" />
            </H1>
          </Col>

          {!spotifyUser && (
            <Col align="center" xs={4}>
              <div style={{ padding: "24px 0" }}>
                <Button onClick={goToSpotifyLogin}>
                  <FaSpotify style={{ marginRight: 8 }} />
                  <span>
                    <FormattedMessage id="login_button.text" />
                  </span>
                </Button>
              </div>
            </Col>
          )}
        </Row>
        <Row>
          <Col align="flex-start" xs={0.5}>
            <Pineapple type="idea" width={48} />
          </Col>
          <Col justify="center">
            <H2>
              <FormattedMessage id="what_is.title" />
            </H2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <FormattedMessage id="what_is.text" />
            </p>
          </Col>
        </Row>
        <Row>
          <Col align="flex-start" xs={0.5}>
            <Pineapple type="cool" width={48} />
          </Col>
          <Col justify="center">
            <H2>
              <FormattedMessage id="widget.title" />
            </H2>
          </Col>
        </Row>
        <Row>
          <Col align="center" xs={4}>
            <Link href={`/current/${spotifyUser}`}>
              <a>
                <img style={{ width: "100%" }} src="/widget.png" />
              </a>
            </Link>
          </Col>
        </Row>

        {spotifyUser && (
          <>
            <Row>
              <Col align="flex-start" xs={0.5}>
                <Pineapple type="laptop" width={48} />
              </Col>
              <Col justify="center">
                <H2>
                  <FormattedMessage id="link.title" />
                </H2>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link href={`/current/${spotifyUser}`}>
                  <a>{`${process.env.BASE_URL}/current/${spotifyUser}`}</a>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col align="flex-start" xs={0.5}>
                <Pineapple type="student" width={48} />
              </Col>
              <Col justify="center">
                <H2>
                  <FormattedMessage id="instructions.title" />
                </H2>
              </Col>
            </Row>
            <Row>
              <Col>
                <H3>
                  <FormattedMessage id="instructions.widget_title" />
                </H3>
                <p>
                  <FormattedMessage id="instructions.widget_text" />
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <H3>
                  <FormattedMessage id="instructions.command_title" />
                </H3>
                <p>
                  <FormattedMessage id="instructions.command_text" />
                </p>
                <div style={{ textAlign: 'center', marginTop: 32 }}>
                  <Link href={`/api/now/${spotifyUser}`}>
                    <a>{`${process.env.BASE_URL}/api/now/${spotifyUser}`}</a>
                  </Link>
                </div>
              </Col>
            </Row>
          </>
        )}
        <Footer />
      </Container>
    </I18nProvider>
  );
};

export default Home;

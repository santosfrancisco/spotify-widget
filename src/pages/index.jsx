import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col } from "react-awesome-styled-grid";
import { FaSpotify } from "react-icons/fa";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { H1, H2, H3 } from "../components/Headings";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Pineapple from "../components/Pineapple";

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
    <Container>
      <Row justify="center">
        <Col align="center">
          <Pineapple type="listen" width={200} />
          <H1>Spotify widget for OBS</H1>
        </Col>
      </Row>
      <Row>
        <Col align="center" xs={1} sm={1}>
          <Pineapple type="laptop" width={50} />
        </Col>
        <Col justify="center" xs={3} sm={7}>
          <H2>Exemplo de widget</H2>
        </Col>
        <Col align="center" xs={4}>
          <Link href={`/current/${spotifyUser}`}>
            <a>
              <img style={{ width: "100%" }} src="/widget.png" />
            </a>
          </Link>
        </Col>
      </Row>

      <Row>
        {!spotifyUser && (
          <Col align="center" xs={4}>
            <Button onClick={goToSpotifyLogin}>
              <FaSpotify style={{ marginRight: 8 }} />
              <span>Login with spotify</span>
            </Button>
          </Col>
        )}

        {spotifyUser && (
          <Col xs={4}>
            <Row>
              <Col align="center" xs={1} sm={1}>
                <Pineapple type="laptop" width={50} />
              </Col>
              <Col justify="center" xs={3} sm={7}>
                <H2>Seu link</H2>
              </Col>
              <Col>
                <Link href={`/current/${spotifyUser}`}>
                  <a>{`${process.env.BASE_URL}/current/${spotifyUser}`}</a>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col align="center" xs={1} sm={1}>
                <Pineapple type="student" width={50} />
              </Col>
              <Col justify="center" xs={3} sm={7}>
                <H2>Instruções</H2>
              </Col>
              <Col>
                <H3>OBS studio</H3>
                <p>
                  Para utilizar no OBS studio, basta adicionar uma source do
                  tipo "browser" com sua url. Com tamanho recomendado de 450x150
                </p>
                <H3>Streamlabs OBS</H3>
                <p>WIP...</p>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      <Footer />
    </Container>
  );
};

export default Home;

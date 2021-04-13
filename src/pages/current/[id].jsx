import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";

import { useSpotifyAPI } from "../../hooks/useSpotifyAPI";

const marqueeAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Marquee = styled.span`
  ${({ scroll }) =>
    scroll &&
    css`
      animation: ${marqueeAnimation} 15s linear 2s infinite;
    `}
`;

const SpotifyWidget = styled(({ className, cover, music, artist }) => {
  const [musicWidth, setMusicWidth] = useState(0);
  const [artistsWidth, setArtistsWidth] = useState(0);
  const containerRef = useRef();
  const musicRef = useRef();
  const artistsRef = useRef();

  const maxWidth = containerRef?.current?.offsetWidth - 16;

  useEffect(() => {
    setMusicWidth(musicRef?.current?.offsetWidth);
    setArtistsWidth(artistsRef?.current?.offsetWidth);
  }, [music]);

  return (
    <div className={className}>
      <img className="widget__cover" src={cover} />
      <div ref={containerRef} className="widget__metadata-container">
        <Marquee
          ref={musicRef}
          className="widget__music-name"
          scroll={musicWidth > maxWidth}
        >
          {music}
        </Marquee>
        <Marquee
          ref={artistsRef}
          className="widget__artist-name"
          scroll={artistsWidth > maxWidth}
        >
          {artist}
        </Marquee>
      </div>
    </div>
  );
})`
  position: relative;
  background: #2b2b2b;
  display: flex;
  color: #2b2b;
  height: 100px;
  width: 400px;

  box-shadow: 4px 4px 24px 4px rgba(0, 0, 0, 0.3);
  border-radius: 4px;

  .widget__cover {
    width: 100px;
    object-fit: cover;
    border-radius: 4px 0 0 4px;
  }

  .widget__metadata-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    width: 300px;
    height: 100px;
    left: 100px;
  }

  .widget__music-name {
    position: absolute;
    top: 30px;
    font-weight: bold;
    font-size: 20px;
    color: #fff;
    margin-bottom: 12px;
    white-space: nowrap;
    padding-left: 8px;
    padding-right: 8px;
  }

  .widget__artist-name {
    position: absolute;
    top: 70px;
    font-weight: bold;
    font-size: 14px;
    white-space: nowrap;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const NothingPlaying = ({ nothingPlaying, tryToPlay }) => (
  <SpotifyWidget
    music={nothingPlaying || "Nothing playing now"}
    artist={tryToPlay || "Try to play on spotify"}
    cover="/disc.jpg"
  />
);

const Current = ({ id, nothing_playing_msg, try_to_play_msg }) => {
  const { user, songData, getCurrentPlayingSong } = useSpotifyAPI(id);

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentPlayingSong();
    }, 6000);
    return () => clearInterval(interval);
  }, [user]);
  return (
    <Wrapper>
      {songData?.is_playing ? (
        <SpotifyWidget
          music={songData?.item?.name}
          artist={songData?.item?.artists?.map((a) => a.name).join(", ")}
          cover={songData?.item?.album?.images[0]?.url}
        />
      ) : (
        <NothingPlaying nothingPlaying={nothing_playing_msg} tryToPlay={try_to_play_msg} />
      )}
    </Wrapper>
  );
};

export async function getServerSideProps({ params, query }) {
  const { id } = params;
  
  const { nothing_playing_msg = '', try_to_play_msg = ''  } = query;
  
  return {
    props: { id, nothing_playing_msg, try_to_play_msg }, // will be passed to the page component as props
  };
}

export default React.memo(Current);

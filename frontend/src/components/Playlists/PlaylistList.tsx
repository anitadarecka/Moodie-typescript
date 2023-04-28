import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./PlaylistList.css";
import MovieCard from "../MovieCard/MovieCard";
import Shuffle from "../../tools/Shuffle";
import { DescriptionProvider } from "../MovieDescription/DescriptionContext";

type PlaylistListProps = {
  name: string,
  keywordslist: number[],
  genrelist: number[],
  mood: string;
}

interface PlaylistData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const PlaylistList = ({ name, keywordslist, genrelist, mood }: PlaylistListProps) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const keywords = keywordslist.join("|");
  const genres = genrelist.length > 1 ? genrelist.join("|") : genrelist;
  const [playlistData, setPlaylistData] = useState<PlaylistData[]>([]);
  console.log(playlistData);
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=true&page=1&with_original_language=en&with_genres=${genres}&with_keywords=${keywords}`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => setPlaylistData(Shuffle(data.results)));
  }, [mood]);
  return (
    <div className="playlist-list">
      <div className="playlist-title">
        <h3>{name}</h3>
      </div>
      <div className="playlist">
        {playlistData.map((el) => (
          <DescriptionProvider key={el.id}>
            <MovieCard
              key={el.id}
              poster={el.poster_path}
              title={el.original_title}
              synopsis={el.overview}
              movieId={el.id}
            />
          </DescriptionProvider>
        ))}
      </div>
    </div>
  );
};

PlaylistList.propTypes = {
  name: PropTypes.string.isRequired,
  keywordslist: PropTypes.arrayOf(PropTypes.number).isRequired,
  genrelist: PropTypes.arrayOf(PropTypes.number).isRequired,
  mood: PropTypes.string.isRequired,
};

export default PlaylistList;

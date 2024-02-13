import React, {useEffect, useMemo, useState} from 'react';
import {
    Box,
    CssBaseline,
    createTheme,
    ThemeProvider
} from '@mui/material';

import {SeriesModal} from './components/SeriesModal';
import _ from 'lodash';
import {MovieGroup} from "./components/movieGroup/MovieGroup";
import {EpisodeSelector} from "./components/episodeSelector/EpisodeSelector";
import {fetchEpisodes, fetching, fetchSeasons} from "./components/js/Fetching";
import {TopBar} from "./components/topbar/TopBar";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#484848',
        },
        secondary: {
            main: '#d01818',
        },
    },
});


const MovieList = ({searchTerm}) => {
    const [movies, setMovies] = useState([]);
    const [, setFetchError] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const handleOpen = (movie) => {
        setSelectedMovie(movie);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedSeason(null)
        setSelectedEpisode(null);
        setIsEpisodeSelected(false);
    };

    useEffect(() => {
        fetching(e => {
            setMovies(e)
        }, e => {
            setFetchError(e)
        }).then();
    }, []);


    const filteredMovies = useMemo(() => {
        if (!movies.length) return [];
        return movies.filter(movie => movie.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    }, [movies, searchTerm]);


    const groupedMovies = useMemo(() => {
        if (!filteredMovies.length) return {};
        return _.groupBy(filteredMovies, 'genres');
    }, [filteredMovies]);

    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [selectedEpisode, setSelectedEpisode] = useState(null);


    useEffect(() => {
        if (selectedMovie) {
            fetchSeasons(selectedMovie.id, e => setSeasons(e)).then();
        }
    }, [selectedMovie]);

    useEffect(() => {
        if (selectedSeason) {
            fetchEpisodes(selectedSeason.id, e => setEpisodes(e)).then();
        }
    }, [selectedSeason]);


    const [isEpisodeSelected, setIsEpisodeSelected] = useState(false);

    const handleEpisodeChange = (event) => {
        const selectedEpisodeId = parseInt(event.target.value);
        const selectedEpisodeData = episodes.find(episode => episode.id === selectedEpisodeId);
        setSelectedEpisode(selectedEpisodeData);
        setIsEpisodeSelected(!!selectedEpisodeData);
    };
    return (
        <div>
            {Object.keys(groupedMovies).map((category) => (
                <MovieGroup category={category} groupedMovies={groupedMovies}
                            handleOpen={e => handleOpen(e)}></MovieGroup>
            ))}
            <SeriesModal episodes={episodes} open={open} handleClose={() => handleClose()} selectedMovie={selectedMovie}
                         selectedSeason={selectedSeason}
                         setSelectedSeason={season => setSelectedSeason(season)} seasons={seasons}
                         episodeSelector={EpisodeSelector(selectedEpisode, episodes, e => setSelectedEpisode(e), e => handleEpisodeChange(e))}
                         selectedEpisode={selectedEpisode}
                         isEpisodeSelected={isEpisodeSelected}></SeriesModal>
        </div>
    );
}

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');

    const removeShadowStyle = {boxShadow: 0};
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Box sx={{flexGrow: 1}}>
                <TopBar setSearchTerm={e => setSearchTerm(e)} removeShadowStyle={removeShadowStyle}></TopBar>
                <Box sx={{paddingTop: 2}}>
                    <MovieList searchTerm={searchTerm}/>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

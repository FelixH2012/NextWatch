import {
    Backdrop,
    Box,
    Fade,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Typography
} from "@mui/material";
import React from "react";
import {SeriesModalCard} from "./cardModal/SeriesModalCard";
import {Episodes} from "./episode/Episodes";

export function SeriesModal({
                                episodes,
                                open,
                                handleClose,
                                selectedMovie,
                                selectedSeason,
                                setSelectedSeason,
                                seasons,
                                episodeSelector,
                                selectedEpisode,
                                isEpisodeSelected
                            }) {
    return (<Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    maxWidth: 'md', // Maximale Breite des Modals
                    height: '80%', // Maximale Höhe des Modals
                    overflowY: 'auto', // Erlaubt das Vertikal-Scrollen
                    bgcolor: 'background.paper',
                    boxShadow:  11,
                    p:  4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                }}>

                {selectedMovie && (
                        <>
                            <Typography variant="h5" gutterBottom>
                                {selectedMovie.name}
                            </Typography>
                            <FormControl variant="outlined">
                                <InputLabel id="season-select-label">Season</InputLabel>
                                <Select
                                    labelId="season-select-label"
                                    id="season-select"
                                    value={JSON.stringify(selectedSeason)}
                                    onChange={(event) => {
                                        const selectedSeasonObj = JSON.parse(event.target.value);
                                        setSelectedSeason(selectedSeasonObj);
                                    }}
                                    label="Season"
                                >
                                    <MenuItem value="{}">
                                        <em>Select a Season</em>
                                    </MenuItem>
                                    {Array.isArray(seasons) && seasons.map((season, index) => (
                                        <MenuItem key={index}
                                                  value={JSON.stringify({id: season.id, number: season.number})}>
                                            {`Season ${season.number}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {selectedSeason && (
                                <Episodes seriesname={selectedMovie.name.replace(/\s+/g, '-')} seasonname={selectedSeason.number} episodes={episodes}/>
                            )}
                            {!selectedSeason && (
                                <SeriesModalCard selectedMovie={selectedMovie}/>
                            )}
                        </>
                    )}
                </Box>
            </Fade>
        </Modal>
    );
}

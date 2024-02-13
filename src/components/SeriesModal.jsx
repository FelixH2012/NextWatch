import {
    Backdrop,
    Box,
    Fade,
    Modal,
    Typography
} from "@mui/material";
import React from "react";
import {SeriesModalCard} from "./cardModal/SeriesModalCard";
import {Episodes} from "./episode/Episodes";
import {SeasonSelector} from "./seasonSelector/SeasonSelector";

export function SeriesModal({
                                episodes,
                                open,
                                handleClose,
                                selectedMovie,
                                selectedSeason,
                                setSelectedSeason,
                                seasons
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
                    maxWidth: 'sm',
                    height: '45%',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 11,
                    p: 4,
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
                            <SeasonSelector seasons={seasons} selectedSeason={selectedSeason}
                                            setSelectedSeason={e => setSelectedSeason(e)}></SeasonSelector>
                            {selectedSeason && (
                                <Episodes seriesname={selectedMovie.name.replace(/\s+/g, '-')}
                                          seasonname={selectedSeason.number} episodes={episodes}/>
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

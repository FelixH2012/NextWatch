import React, {useEffect, useState} from 'react';
import {Card, CardMedia, CardContent, Typography, IconButton, Box, Grid, Skeleton, Alert} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {styled} from '@mui/system';
import axios from "axios";
import linksData from './result.json'; // Pfad zur lokalen JSON-Datei

const StyledCard = styled(Card)(({theme}) => ({
    maxWidth: 345,
    position: 'relative',
    height: '180px',
    overflow: 'hidden',
    '&:hover .overlay': {
        opacity: 1,
    },
}));

const Overlay = styled(Box)(({theme}) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity   0.3s ease-in-out',
}));

export function Episodes({seriesname, seasonname, episodes}) {

    const getLinkForEpisode = (seriesName, seasonNumber, episodeNumber) => {
        const series = linksData[seriesName];
        if (!series) return null;

        // Erzeugen Sie den Schlüssel für die Staffel basierend auf der Formatierung der lokalen JSON-Datei
        const seasonKey = `staffel-${seasonNumber}`;
        const season = series.seasons[seasonKey];
        if (!season) return null;

        // Suchen Sie die Episode in der Staffel
        const episode = season.find(e => e.episode === episodeNumber);
        return episode ? episode.link : null;
    };
    const [loadingImages, setLoadingImages] = useState(new Map());
    const [imageErrors, setImageErrors] = useState(new Map());

    const handlePlayButtonClick = (seriesName, seasonName, episodeNumber) => {
        const link = getLinkForEpisode(seriesName, seasonName, episodeNumber);
        if (link) {
            window.open(link, '_blank');
        } else {
            alert(`Kein Link gefunden für ${seriesName} Staffel ${seasonName}, Episode ${episodeNumber}`);
        }
    };


    const handleImageLoad = (url) => {
        setLoadingImages((current) => new Map(current.set(url, false)));
    };

    const handleImageError = (url) => {
        setImageErrors((current) => new Map(current.set(url, true)));
    };

    useEffect(() => {
        const initialStatuses = new Map();
        episodes.forEach((episode) => {
            if (episode.image && episode.image.original) {
                initialStatuses.set(episode.image.original, true);
            }
        });
        setLoadingImages(initialStatuses);
    }, [episodes]);

    return (
        <Grid container spacing={2}>
            {episodes.map((episode) => (
                <Grid item xs={12} sm={6} md={4} key={episode.id}>
                    <StyledCard>
                        {episode.image && episode.image.original && loadingImages.get(episode.image.original) ? (
                            <Skeleton variant="rectangular" width={345} height={180}/>
                        ) : null}
                        {episode.image && episode.image.original && (
                            <CardMedia
                                component="img"
                                height="140"
                                image={episode.image.original}
                                alt={episode.name}
                                onLoad={() => handleImageLoad(episode.image.original)}
                                onError={() => handleImageError(episode.image.original)}
                                style={loadingImages.get(episode.image.original) || imageErrors.get(episode.image.original) ? {display: 'none'} : undefined}
                            />
                        )}
                        {!episode.image || !episode.image.original ? (
                            <Alert severity="error">Unable to load image</Alert>
                        ) : null}
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                color="white"
                                marginTop={-1.5}
                            >
                                {episode.name}
                            </Typography>
                        </CardContent>
                        <Overlay className="overlay">
                            <IconButton aria-label="play episode" onClick={() => handlePlayButtonClick(seriesname, seasonname, episode.number)}>
                                <PlayArrowIcon />
                            </IconButton>

                            <IconButton aria-label="save episode">
                                <SaveAltIcon/>
                            </IconButton>
                        </Overlay>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    );
}

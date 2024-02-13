import React from 'react';
import {Box, Grid, Typography} from '@mui/material';

function splitGenres(genres) {
    return genres.join(', ');
}

export function SeriesDescription({selectedMovie}) {
    const maxHeight = '280px';

    return (
        <Grid item style={{
            overflowY: 'scroll',
            maxHeight,
            '&::-webkit-scrollbar': {
                display: 'none',
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            flex:  1, // Erlaubt dem Element, den verfügbaren Raum zu nutzen
        }}>
            {selectedMovie.summary && (
                <Typography variant="body1"
                            dangerouslySetInnerHTML={{__html: selectedMovie.summary}}/>
            )}
            <Typography variant="subtitle2">
                Language: {selectedMovie.language}
            </Typography>
            <Typography variant="subtitle3">
                Genre/s: {splitGenres(selectedMovie.genres)}
            </Typography>
        </Grid>
    );
}

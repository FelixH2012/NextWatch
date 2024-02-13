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
            '&::WebkitScrollbar': {
                display: 'none',
            },
            'msOverflowStyle': 'none',
            'scrollbarWidth': 'none',
            flex:  1,
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

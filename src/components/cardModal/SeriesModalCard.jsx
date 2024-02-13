import {Grid} from "@mui/material";
import React from "react";
import {SeriesImage} from "./SeriesImage";
import {SeriesDescription} from "./SeriesDescription";

export function SeriesModalCard({selectedMovie, isEpisodeSelected}) {
    const distance = 5;
    return (<Grid container spacing={2} alignItems="center">
            <Grid item xs={distance}>
                {selectedMovie && !isEpisodeSelected && (
                    <SeriesImage selectedMovie={selectedMovie}></SeriesImage>
                )}
            </Grid>
            {selectedMovie && !isEpisodeSelected && (
                <SeriesDescription selectedMovie={selectedMovie}></SeriesDescription>
            )}
        </Grid>
    )
}
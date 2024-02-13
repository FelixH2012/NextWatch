import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

export function EpisodeSelector(selectedEpisode, episodes, p, p1) {
    return (<FormControl variant="outlined">
            <InputLabel id="episode-select-label">Episode</InputLabel>
            <Select
                labelId="episode-select-label"
                id="episode-select"
                value={selectedEpisode ? selectedEpisode.id : ""}
                onChange={(event) => {
                    const selectedEpisodeObj = episodes.find(episode => episode.id === parseInt(event.target.value));
                    p(selectedEpisodeObj);
                    p1(event)
                }}
                label="Episode"
            >
                <MenuItem value="">
                    <em>Select Episode</em>
                </MenuItem>
                {episodes.map((episode, index) => (
                    <MenuItem key={index} value={episode.id}>
                        {`Episode ${episode.number}`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
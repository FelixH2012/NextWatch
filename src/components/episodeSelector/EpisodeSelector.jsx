import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";

export function EpisodeSelector(selectedEpisode, episodes, p, p1) {
    const [selectedEpisodeId, setSelectedEpisodeId] = useState(() => {
        const savedId = localStorage.getItem('selectedEpisodeId');
        if (Array.isArray(episodes) && episodes.length >  0) {
            return savedId ? parseInt(savedId) : episodes[0].id;
        } else {
            return savedId || "";
        }
    });

    useEffect(() => {
        if (selectedEpisodeId) {
            localStorage.setItem('selectedEpisodeId', selectedEpisodeId);
        }
    }, [selectedEpisodeId]);

    const handleChange = (event) => {
        const newSelectedEpisodeId = parseInt(event.target.value);
        setSelectedEpisodeId(newSelectedEpisodeId);
        const selectedEpisodeObj = episodes.find(episode => episode.id === newSelectedEpisodeId);
        p(selectedEpisodeObj);
        p1(event);
    };

    return (
        <FormControl variant="outlined">
            <InputLabel id="episode-select-label">Episode</InputLabel>
            <Select
                labelId="episode-select-label"
                id="episode-select"
                value={selectedEpisodeId}
                onChange={handleChange}
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
    );
}

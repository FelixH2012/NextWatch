import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

export function SeasonSelector({seasons, selectedSeason, setSelectedSeason}) {
    return (
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
    )
}
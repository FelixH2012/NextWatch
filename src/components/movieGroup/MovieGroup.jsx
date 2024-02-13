import {Box, Button} from "@mui/material";
import React from "react";
import {styled} from "@mui/system";
import {MovieCard} from "./MovieCard";

const MyStyledButton = styled(Button)(({theme}) => ({

}));

const MovieCategoryTitle = ({children}) => {
    return (
        <Button variant="contained" sx={{...MyStyledButton.style, width: 'max-content'}}>
            {children}
        </Button>
    );
};
export function MovieGroup({category, groupedMovies, handleOpen}) {
    return (<Box key={category} sx={{padding: 2, display: 'flex', flexDirection: 'column', gap: 2}}>
        <MovieCategoryTitle>{category}</MovieCategoryTitle>
        <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,   2fr))', gap: 2}}>
            {groupedMovies[category].map((movie) => (
                <MovieCard key={movie.id} movie={movie} handleOpen={handleOpen}/>
            ))}
        </Box>
    </Box>)
}
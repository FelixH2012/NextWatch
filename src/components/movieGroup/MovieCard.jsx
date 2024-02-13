import {Card, CardActionArea, CardMedia} from "@mui/material";
import React from "react";

export function MovieCard({movie, handleOpen}) {
    return (
        <Card onClick={() => handleOpen(movie)} sx={{aspectRatio: '7 /   9'}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={movie.name}
                    image={movie.image ? movie.image.original : ''}
                    title={movie.name}
                    sx={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                    }}
                />
            </CardActionArea>
        </Card>
    )
}
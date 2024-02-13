import {CardMedia} from "@mui/material";

export function SeriesImage({selectedMovie}) {
    return (
        <CardMedia
            component="img"
            alt={selectedMovie.name}
            image={selectedMovie.image ? selectedMovie.image.original : ''}
            title={selectedMovie.name}
            sx={{
                objectFit: 'cover',
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                borderRadius: '4%',
            }}
        />

    )
}
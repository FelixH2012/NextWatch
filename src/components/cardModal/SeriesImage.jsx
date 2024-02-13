import {CardMedia} from "@mui/material";

export function SeriesImage({ selectedMovie }) {
    return (
        <CardMedia
            component="img"
            alt={selectedMovie.name}
            image={selectedMovie.image?.original || ''}
            title={selectedMovie.name}
            sx={{
                marginTop : '-1.5rem',
                objectFit: 'cover',
                width: '100%',
                height: '70%',
                maxHeight: '500px',
                borderRadius: '4%',
            }}
        />
    );
}
import {Card, CardActionArea, CardMedia} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";


export function MovieCard({ movie, handleOpen }) {
    const ref = React.useRef();
    const inView = useInView(ref, {
        triggerOnce: true,
        threshold:  0.1,
    });

    const animationVariants = {
        hidden: { opacity:  0, scale:  0.9 },
        visible: { opacity:  1, scale:  1 },
    };

    const animationTransition = {
        type: "spring",
        duration:  1.5,
        bounce:  0.1,
    };

    return (
        <motion.div
            ref={ref}
            variants={animationVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={animationTransition}
        >
            <Card onClick={() => handleOpen(movie)} sx={{ aspectRatio: '7 /   9' }}>
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
        </motion.div>
    );
}

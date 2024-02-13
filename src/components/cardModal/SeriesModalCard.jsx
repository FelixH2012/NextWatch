import {Grid} from "@mui/material";
import React from "react";
import {SeriesImage} from "./SeriesImage";
import {SeriesDescription} from "./SeriesDescription";

import {motion, useInView} from "framer-motion";
export function SeriesModalCard({ selectedMovie, isEpisodeSelected }) {
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
        duration:  1.2,
        bounce:  0.1,
    };

    const distance =  3; // Reduces the number of grid items
    return (
        <motion.div
            ref={ref}
            variants={animationVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={animationTransition}
        >
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={distance}>
                    {selectedMovie && !isEpisodeSelected && (
                        <SeriesImage selectedMovie={selectedMovie} />
                    )}
                </Grid>
                {selectedMovie && !isEpisodeSelected && (
                    <SeriesDescription selectedMovie={selectedMovie} />
                )}
            </Grid>
        </motion.div>
    );
}
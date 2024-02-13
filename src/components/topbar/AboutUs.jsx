import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import React from "react";

export function AboutUs({open, handleClose}) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>About Us</DialogTitle>
            <DialogContent>
                <p>Made with ♥ By Felix</p>
                <p>x</p>
                <p>Ashe ♥</p>
            </DialogContent>
        </Dialog>
    )
}
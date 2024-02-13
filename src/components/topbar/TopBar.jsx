import {
    AppBar,
    Toolbar, useMediaQuery
} from "@mui/material";
import React from "react";
import {AboutUs} from "./AboutUs";
import {Buttons} from "./Buttons";
import {SearchBar} from "./SearchBar";


export function TopBar({setSearchTerm, removeShadowStyle}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <>
            <AppBar position="static" style={{
                background: '#262626',
                boxShadow: 'none',
                borderRadius: '12px',
                maxWidth: 'calc(100% -  64px)',
                margin: '16px auto',
                padding: '0  16px'
            }}>
                <Toolbar style={{borderRadius: '12px', paddingLeft: '0px', paddingRight: '16px'}}>
                    <SearchBar removeShadowStyle={removeShadowStyle} setSearchTerm={setSearchTerm}></SearchBar>
                    {!isMobile && (
                        <Buttons handleOpen={() => handleOpen()}></Buttons>
                    )}
                </Toolbar>
            </AppBar>
            <AboutUs open={open} handleClose={() => handleClose()}></AboutUs>
        </>
    );
}
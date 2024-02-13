import {
    alpha,
    AppBar,
    Box,
    Button,
    ButtonGroup,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, IconButton,
    InputBase,
    Toolbar, useMediaQuery
} from "@mui/material";
import {
    Close,
    Info as InfoIcon,
    Movie as MovieIcon,
    PlaylistPlay as PlaylistPlayIcon,
    Search as SearchIcon
} from "@mui/icons-material";
import React from "react";
import {styled} from "@mui/system";
import {AboutUs} from "./AboutUs";




const MyStyledButton = styled(Button)(() => ({
    borderRadius: 12
}));

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: 12,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(1, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export function TopBar({ setSearchTerm, removeShadowStyle }) {
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
                maxWidth: 'calc(100% -  64px)', // Nehmen wir an,  64px ist der gewünschte Abstand von beiden Seiten
                margin: '16px auto', //  16px Abstand vom oberen Rand, zentriert in der Mitte
                padding: '0  16px' // Padding links und rechts
            }}>
                <Toolbar style={{ borderRadius: '12px', paddingLeft: '0px', paddingRight: '16px' }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon style={{ color: 'inherit' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            onFocus={() => removeShadowStyle()}
                            onBlur={() => !setSearchTerm && removeShadowStyle()}
                        />
                    </Search>
                    {!isMobile && (
                        <Box sx={{ paddingLeft:  2 }}>
                            <ButtonGroup
                                variant="contained"
                                aria-label="Basic button group"
                                disableElevation
                            >
                                <MyStyledButton startIcon={<InfoIcon />} onClick={handleOpen}>
                                    About us
                                </MyStyledButton>
                            </ButtonGroup>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
           <AboutUs open={open} handleClose={() => handleClose()}></AboutUs>
        </>
    );
}
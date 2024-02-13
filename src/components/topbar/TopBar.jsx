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
    Toolbar
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

const MyStyledButton = styled(Button)(() => ({

}));

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
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
    padding: theme.spacing(0, 2),
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

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search"
                            inputProps={{'aria-label': 'search'}}
                            onChange={event => setSearchTerm(event.target.value)}
                        />
                    </Search>
                    <Box sx={{paddingLeft: 4, removeShadowStyle}}>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                            <MyStyledButton startIcon={<PlaylistPlayIcon/>}>Series</MyStyledButton>
                            <MyStyledButton startIcon={<MovieIcon/>}>Movies</MyStyledButton>
                            <MyStyledButton startIcon={<InfoIcon/>} onClick={handleOpen}>About us</MyStyledButton>
                        </ButtonGroup>
                    </Box>
                    <Box sx={{paddingLeft: 4}}>
                        <h5>Test-Version</h5>
                    </Box>
                </Toolbar>
            </AppBar>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>About Us</DialogTitle>
                <DialogContent>
                    <p>Made with ♥ By Felix</p>
                    <p>x</p>
                    <p>Ashe ♥</p>
                </DialogContent>

            </Dialog>
        </>
    );
}

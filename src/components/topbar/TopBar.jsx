import {
    AppBar,
    Toolbar,
    useMediaQuery,
    Button,
    ButtonGroup,
    Tooltip,
    Grow,
    Box,
    Typography
} from "@mui/material";
import React from "react";
import { AboutUs } from "./AboutUs";
import { Buttons } from "./Buttons";
import { SearchBar } from "./SearchBar";
import {useNavigate} from "react-router-dom";


const ArrowTooltip = ({ children, ...props }) => {
    return (
        <Tooltip {...props} TransitionComponent={Grow} PopperProps={{
            popperOptions: {
                modifiers: [{ name: 'offset', options: { offset: [0,  10] } }],
            },
        }}>
            {children}
        </Tooltip>
    );
};

export function TopBar({ setSearchTerm, removeShadowStyle }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const navigate = useNavigate();
    const handleRegister = () => {
        navigate('/account/BasicForm'); // Ersetzen Sie '/register' durch den Pfad Ihrer Registrierungsseite
    };


    return (
        <>
            <AppBar position="static" style={{
                background: '#262626',
                boxShadow: 'none',
                borderRadius: '12px',
                maxWidth: 'calc(100% -   64px)',
                margin: '16px auto',
                padding: '0   16px'
            }}>
                <Toolbar style={{ borderRadius: '12px', paddingLeft: '0px', paddingRight: '16px' }}>
                    <SearchBar removeShadowStyle={removeShadowStyle} setSearchTerm={setSearchTerm} />
                    {!isMobile && (
                        <Buttons handleOpen={() => handleOpen()} />
                    )}
                    {/* Button Group mit Tooltips und Grow-Animation */}
                    <ButtonGroup variant="outlined" aria-labVorteile von Loginel="authentication actions" sx={{ flexGrow:   1, justifyContent: 'flex-end' }}>
                            <ArrowTooltip title={<Typography>: fahruZugang zu Ihrem Konto, Personalisierte Erng, Sicherheit</Typography>}>
                            <Button color="inherit" onClick={() => { /* Handle login action */ }}>Login</Button>
                        </ArrowTooltip>
                        <ArrowTooltip title={<Typography>Save your most recently watched series,
                            Get recommendations based on your series</Typography>}>
                            <Button color="inherit" onClick={() => {handleRegister()}}>Register</Button>
                        </ArrowTooltip>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
            <AboutUs open={open} handleClose={() => handleClose()} />
        </>
    );
}

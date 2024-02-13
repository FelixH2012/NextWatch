import {Box, Button, ButtonGroup} from "@mui/material";
import {Info as InfoIcon} from "@mui/icons-material";
import React from "react";
import {styled} from "@mui/system";

const MyStyledButton = styled(Button)(() => ({
    borderRadius: 12
}));

export function Buttons({handleOpen}) {
    return (
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
    )
}
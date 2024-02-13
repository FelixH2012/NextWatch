import {Search as SearchIcon} from "@mui/icons-material";
import React from "react";
import {styled} from "@mui/system";
import {alpha, InputBase} from "@mui/material";



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

export function SearchBar({removeShadowStyle, setSearchTerm}) {
    return(
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
    )
}
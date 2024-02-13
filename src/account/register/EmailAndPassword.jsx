import React, {useRef, useState} from 'react';
import {TextField, Typography, Box, Paper, Snackbar, IconButton} from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import {CancelRounded, CheckCircleRounded} from "@mui/icons-material";

export function EmailAndPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [areFieldsFilled, setAreFieldsFilled] = useState(true);
    const [passwordValidationErrors, setPasswordValidationErrors] = useState({});

    const validatePassword = (password) => {
        const minLength =  8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[^A-Za-z\d]/.test(password);

        // Update the state with the current validation status
        setPasswordValidationErrors({
            length: password.length >= minLength ? null : 'The password must be at least  8 characters long.',
            upperCase: hasUpperCase ? null : 'The password must contain at least one uppercase letter.',
            lowerCase: hasLowerCase ? null : 'The password must contain at least one lowercase letter.',
            number: hasNumber ? null : 'The password must contain at least one number.',
            specialChar: hasSpecialChar ? null : 'The password must contain at least one special character.'
        });

        setAreFieldsFilled(email !== '' && password !== '');
    };


    const [popupOpen, setPopupOpen] = useState(false);
    const passwordFieldRef = useRef(null);

    const handlePasswordFocus = () => {
        setPopupOpen(true);
    };

    const handlePopupClose = () => {
        setPopupOpen(false);
    };


    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        setIsValidEmail(isEmail(emailValue));
        setAreFieldsFilled(emailValue !== '' && password !== '');
    };

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        handlePasswordFocus();
        validatePassword(passwordValue);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Enter your email and password
            </Typography>
            <Box component="form" sx={{ width: 'auto', marginTop:   5, marginBottom:   3 }}>
                <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                    error={!isValidEmail}
                    helperText={!isValidEmail && "Invalid email"}
                    autoFocus
                    variant="filled"
                    margin="normal"
                />
                <TextField
                    required
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                    onFocus={handlePasswordFocus}
                    error={!areFieldsFilled}
                    variant="filled"
                    margin="normal"
                    inputRef={passwordFieldRef}
                />
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={popupOpen}
                onClose={handlePopupClose}
                sx={{
                    '& .MuiSnackbarContent-message': {
                        color: '#ffffff', // White text
                    },
                    '& .MuiSnackbarContent-root': {
                        backgroundColor: '#000000', // Replace #FFC107 with your desired color
                        boxShadow: '0px  3px  5px -1px rgba(0,  0,  0,  0.6),  0px  6px  10px  0px rgba(0,  0,  0,  0.14),  0px  1px  18px  0px rgba(0,  0,  0,  0.12)' // Add your shadow here
                    }
                }}
                message={
                    <Box display="flex" flexDirection="column" alignItems="center">
                        {passwordValidationErrors.length === null ? (
                            <>
                                <CheckCircleRounded color="success" />
                                <Typography>The length is correct.</Typography>
                            </>
                        ) : (
                            <>
                                <CancelRounded color="error" />
                                <Typography>{passwordValidationErrors.length}</Typography>
                            </>
                        )}
                        {passwordValidationErrors.upperCase === null ? (
                            <>
                                <CheckCircleRounded color="success" />
                                <Typography>Contains an uppercase letter.</Typography>
                            </>
                        ) : (
                            <>
                                <CancelRounded color="error" />
                                <Typography>{passwordValidationErrors.upperCase}</Typography>
                            </>
                        )}
                        {passwordValidationErrors.lowerCase === null ? (
                            <>
                                <CheckCircleRounded color="success" />
                                <Typography>Contains a lowercase letter.</Typography>
                            </>
                        ) : (
                            <>
                                <CancelRounded color="error" />
                                <Typography>{passwordValidationErrors.lowerCase}</Typography>
                            </>
                        )}
                        {passwordValidationErrors.number === null ? (
                            <>
                                <CheckCircleRounded color="success" />
                                <Typography>Contains a number.</Typography>
                            </>
                        ) : (
                            <>
                                <CancelRounded color="error" />
                                <Typography>{passwordValidationErrors.number}</Typography>
                            </>
                        )}
                        {passwordValidationErrors.specialChar === null ? (
                            <>
                                <CheckCircleRounded color="success" />
                                <Typography>Contains a special character.</Typography>
                            </>
                        ) : (
                            <>
                                <CancelRounded color="error" />
                                <Typography>{passwordValidationErrors.specialChar}</Typography>
                            </>
                        )}
                    </Box>
                }
            />
        </React.Fragment>
    );
}

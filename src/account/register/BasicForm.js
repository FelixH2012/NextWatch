import {Button, Container, CssBaseline, Stack, Step, StepLabel, Stepper, Box} from '@mui/material';
import React, {useState} from 'react';
import {EmailAndPassword} from "./EmailAndPassword";

function BasicForm() {
    const steps = ['E-Mail und Passwort', 'AGBs', 'Serienpräferenzen', 'Profilbild', 'Name'];
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case  0:
                return <EmailAndPassword />;
            // Fügen Sie hier weitere Fälle hinzu, falls Sie mehr Schritte haben
            default:
                return <div>Default content</div>;
        }
    };


    return (
        <Container maxWidth="sm">
            <CssBaseline/>
            <Stepper activeStep={activeStep} sx={{ marginTop: '2rem' }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh -  68px)'}}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                    }}
                >
                    {renderStepContent()}

                    <Box textAlign='center'>
                        <Button onClick={handleNext} variant="contained" color="primary">
                            {activeStep === steps.length - 1 ? 'Fertigstellen' : 'Next'}
                        </Button>
                    </Box>
                </Box>
            </Box>
            {/* ... restlicher Code ... */}
        </Container>
    );
}

export default BasicForm;
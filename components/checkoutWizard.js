import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';
import useStyles from '../utils/styles';

const CheckOutWizard = ({ activeStep = 0 }) => {
  const clsees = useStyles();
  return (
    <Stepper
      className={clsees.transparrentBackground}
      activeStep={activeStep}
      alternativeLabel
    >
      {['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step) => (
          <Step key={step}>
            {' '}
            <StepLabel> {step} </StepLabel>{' '}
          </Step>
        )
      )}
    </Stepper>
  );
};

export default CheckOutWizard;

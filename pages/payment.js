import {
  Typography,
  List,
  ListItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import { Router, useRouter } from 'next/dist/client/router';
import React, { useContext, useEffect, useState } from 'react';
import CheckOutWizard from '../components/checkoutWizard';
import Layout from '../components/layout';
import { Store } from '../utils/store';
import useStyles from '../utils/styles';
import { IoIosArrowBack } from 'react-icons/io';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';

const Payment = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const [paymentMethod, setPaymentMethod] = useState('');
  const {
    cart: { shippingAddress },
  } = state;
  const router = useRouter();
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, []);
  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('payment methode is not selected', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHODE', payload: paymentMethod });
      Cookies.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };
  return (
    <Layout title="Payment Methode">
      <CheckOutWizard activeStep={2}></CheckOutWizard>
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="PayPal"
                  value="PayPal"
                  control={<Radio></Radio>}
                ></FormControlLabel>
                <FormControlLabel
                  label="JazzCash"
                  value="JazzCash"
                  control={<Radio></Radio>}
                ></FormControlLabel>
                <FormControlLabel
                  label="EasyPaisa"
                  value="EasyPaisa"
                  control={<Radio></Radio>}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {' '}
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <IconButton>
              <IoIosArrowBack onClick={() => router.push('/shipping')} />
            </IconButton>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Payment;

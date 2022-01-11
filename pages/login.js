import {
  List,
  TextField,
  Typography,
  ListItem,
  Button,
  Link,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import { Store } from '../utils/store';
import { Router } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import Cookies from 'js-cookie';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;

  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);
  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userName', data.name);
      Cookies.set('userEmail', data.email);
      Cookies.set('userIsAdmin', data.isAdmin);
      Cookies.set('token', data.token);
      Cookies.set('_id', data._id);
      enqueueSnackbar('Login Success', { variant: 'success' });
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar('invaled email or password', { variant: 'error' });
    }
  };
  return (
    <Layout title="Login">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h3" variant="h3">
          Login
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  type="email"
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{}}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  type="password"
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{}}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.email
                      ? errors.password.type === 'minLength'
                        ? 'Password should be atleast 6'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account?
            <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
              <Link>Registre here</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

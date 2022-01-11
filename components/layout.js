import React, { useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { BiLogIn } from 'react-icons/bi';

import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import {
  Toolbar,
  AppBar,
  Typography,
  Container,
  Link,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Switch,
  Badge,
  Button,
  MenuItem,
  Menu,
} from '@material-ui/core';
import useStyles from '../utils/styles';
import { Store } from '../utils/store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/dist/client/router';

const Layout = ({ title, children }) => {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const router = useRouter();
  const classes = useStyles();
  const theme = createTheme({
    typography: {
      h4: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      body1: {
        fontWeight: 'normal',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userName');
    Cookies.remove('userEmail');
    Cookies.remove('userPassword');
    Cookies.remove('userIsAdmin');
    Cookies.remove('token');
    Cookies.remove('_id');
    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title} -- Next Amazona ` : `Amazona App`} </title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar className={classes.navbar} color="secondary" position="static">
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand} variant="h6">
                  amazone
                </Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}> </div>
            <div>
              <Switch
                onChange={(e) => {
                  e.preventDefault();
                  if (e.target.checked) {
                    dispatch({
                      type: 'DARK_MODE_ON',
                    });
                  } else {
                    dispatch({
                      type: 'DARK_MODE_OFF',
                    });
                  }
                  const newDarkMode = e.target.checked;
                  Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
                }}
                inputProps={{ 'aria-controls': 'controlled' }}
              />
              <NextLink href="/cart" passHref>
                <Link>
                  {' '}
                  <IconButton>
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        {' '}
                        <ShoppingCartOutlinedIcon />{' '}
                      </Badge>
                    ) : (
                      <ShoppingCartOutlinedIcon />
                    )}
                  </IconButton>{' '}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>
                    {' '}
                    <IconButton>
                      {' '}
                      <BiLogIn />{' '}
                    </IconButton>{' '}
                  </Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>

        <footer className={classes.footer}>
          <Typography className={classes.footertext}>
            All right recived. Amazona{' '}
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;

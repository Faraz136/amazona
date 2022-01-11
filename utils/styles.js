import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    width: '100%',
    backgroundColor: '#203040',
    marginBottom: 20,
  },
  brand: {
    color: 'white',
    marginLeft: 10,
    borderBottom: 0,
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: 40,
    justifyContent: 'center',
    textAlign: 'center',
    height: 60,
    backgroundColor: '#e5e4e4',
  },
  image: {
    maxHeight: 500,

    minHeight: 500,
  },
  footertext: {
    margin: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
    cursor: 'pointer',
  },
  productDetails: {
    marginLeft: 15,
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: 'white',
    textTransform: 'initial',
  },
  transparrentBackground: {
    backgroundColor: 'transparent',
  },
  section: {},
  error: {
    color: '#f04040',
  },
});

export default useStyles;

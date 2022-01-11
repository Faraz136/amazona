import React, { useContext } from 'react';
import Layout from '../../components/layout';
import { Store } from '../../utils/store';
import NextLink from 'next/link';
import {
  Link,
  IconButton,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  CircularProgress,
} from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import useStyles from '../../utils/styles';

import Product from '../../modals/Product';
import db from '../../utils/db';
import axios from 'axios';
import { Router, useRouter } from 'next/dist/client/router';

export default function ProductScreen(props) {
  const router = useRouter();
  const { dispatch, state } = useContext(Store);
  const { product } = props;
  const classes = useStyles();

  if (!product) {
    return (
      <div>
        {' '}
        <CircularProgress />
      </div>
    );
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('sorry product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: quantity },
    });
    router.push('/cart');
  };
  return (
    <Layout title={product.name}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            {' '}
            <IconButton>
              <ArrowBackRoundedIcon color="primary" />{' '}
            </IconButton>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <img
            src={product.image}
            alt={product.name}
            width={500}
            hight={600}
            layout="responsive"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List className={classes.productDetails}>
            <ListItem>
              <Typography variant="h3" style={{ fontWeight: 500 }}>
                {' '}
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Catagory: {product.catagory}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} Stars: ({product.numReviews} reviews )
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Discription: {product.discription}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  {' '}
                  <Typography>Price: </Typography>{' '}
                </Grid>
                <Grid item xs={6}>
                  {' '}
                  <Typography>$ {product.price} </Typography>{' '}
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  {' '}
                  <Typography>Status: </Typography>{' '}
                </Grid>
                <Grid item xs={6}>
                  {' '}
                  <Typography>
                    {' '}
                    {product.countInStock > 0
                      ? `In Stock`
                      : `Out of Stock`}{' '}
                  </Typography>{' '}
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Button
                onClick={addToCartHandler}
                fullWidth
                variant="contained"
                color="primary"
              >
                {' '}
                Add to Cart{' '}
              </Button>
            </ListItem>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}

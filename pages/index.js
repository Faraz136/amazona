import {
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';

import Layout from '../components/layout';

import useStyles from '../utils/styles';
import NextLink from 'next/link';
//db imports
import db from '../utils/db';
import Product from '../modals/Product';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../utils/store';
import { useRouter } from 'next/dist/client/router';

export default function Home(props) {
  const classes = useStyles();
  const router = useRouter();
  const { dispatch, state } = useContext(Store);
  const { products } = props;
  const addToCartHandler = async (product) => {
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
    <Layout>
      <Grid container spacing={3}>
        {products.map((product) => {
          return (
            <>
              <Grid item md={4} key={product.name}>
                <Card>
                  <NextLink href={`/product/${product.slug}`} passHref>
                    <CardActionArea>
                      <CardMedia
                        className={classes.image}
                        component="img"
                        image={product.image}
                        title={product.name}
                      />
                      <CardContent>
                        <Typography style={{ fontWeight: 400 }}>
                          {product.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </NextLink>
                  <CardActions>
                    <Typography>$ {product.price} </Typography>

                    {/* <NextLink href = '/cart'> */}
                    <Button
                      onClick={() => addToCartHandler(product)}
                      size="small"
                      color="primary"
                    >
                      {' '}
                      Add to cart{' '}
                    </Button>
                    {/* </NextLink> */}
                  </CardActions>
                </Card>
              </Grid>
            </>
          );
        })}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

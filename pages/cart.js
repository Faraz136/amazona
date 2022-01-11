import {
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/layout';
import { Store } from '../utils/store';
import NextLink from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import { Router, useRouter } from 'next/dist/client/router';

const CartScreen = () => {
  const router = useRouter();
  const [ncartItems, setnCartItems] = useState([]);
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  useEffect(() => {
    const fetchitems = async () => {
      const data = await cartItems;
      setnCartItems(cartItems);
    };
    fetchitems();
  }, []);
  const updateHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('sorry product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const checkOutHandler = () => {
    router.push('/shipping');
  };
  return (
    <Layout title="Shopping Cart">
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {ncartItems.length === 0 ? (
        <div>
          <Typography> Cart is Empty. </Typography>{' '}
          <NextLink href="/" passHref>
            <Link>
              <FiShoppingBag fontSize="50px" />
            </Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ncartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <img
                              src={item.image}
                              alt={item.name}
                              height={50}
                              width={50}
                            />
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell>
                        <Typography>{item.name}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          value={item.quantity}
                          onChange={(e) => updateHandler(item, e.target.value)}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {' '}
                              {x + 1}{' '}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">$ {item.price}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          <AiFillDelete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    Subtotal ({ncartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) :{' '}
                    {ncartItems.reduce((a, c) => a + c.quantity * c.price, 0)}$
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={checkOutHandler}
                    variant="contained"
                    color="primary"
                  >
                    Check Out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });

import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Red',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmmin: true,
    },
    {
      name: 'Faraz',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmmin: false,
    },
  ],
  products: [
    {
      name: 'Multi Shirts',
      catagory: 'Shirts',
      slug: 'multi-shirts',
      image:
        'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=627&q=80',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      discription: 'A popular shirt',
    },
    {
      name: 'White tee',
      catagory: 'Shirts',
      slug: 'white-tee',
      image:
        'https://images.unsplash.com/photo-1564859227552-81fde4a1df0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
      price: 70,
      brand: 'Adidas',
      rating: 4,
      numReviews: 10,
      countInStock: 20,
      discription: 'A popular shirt',
    },
    {
      name: 'Girls Sweat Shirt',
      catagory: 'Shirts',
      slug: 'girls-sweat-shirt',
      image:
        'https://images.unsplash.com/photo-1495994458560-6f9d0636cc8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=677&q=80',
      price: 70,
      brand: 'Olla',
      rating: 45,
      numReviews: 10,
      countInStock: 20,
      discription: 'A popular shirt',
    },
    {
      name: 'White Shirt ',
      catagory: 'Pants',
      slug: 'white-shirt',
      image:
        'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      discription: 'A popular shirt',
    },
    {
      name: 'Glamor Look',
      catagory: 'Pants',
      slug: 'glamorlook',
      image:
        'https://images.unsplash.com/photo-1622445275992-e7efb32d2257?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 70,
      brand: 'Zara',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      discription: 'A popular shirt',
    },
  ],
};

export default data;

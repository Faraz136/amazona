import nc from 'next-connect';
import db from '../../utils//db';
import Product from '../../modals//Product';
import data from '../../utils/data';
import User from '../../modals/User';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
  // console.log('working');
});

export default handler;

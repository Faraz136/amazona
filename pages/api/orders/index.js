import nc from 'next-connect';
import db from '../../../utils/db';
import Order from '../../../modals/order';
import { onError } from '../../../utils/error';
import { isAuth } from '../../../utils/auth';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).sed(order);
  await db.disconnect();
  res.send(order);
});

export default handler;
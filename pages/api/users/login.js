import nc from 'next-connect';
import db from '../../../utils/db';
import bcryt from 'bcryptjs';
import User from '../../../modals/User';
import { signToken } from '../../../utils/auth';
import { Restaurant } from '@material-ui/icons';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  await db.disconnect();
  if (user && bcryt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).sendDate({ message: 'Invaled email  or password' });
  }
});

export default handler;

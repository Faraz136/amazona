// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import db from '../../utils/db';
// import data from '../../utils/data';
// import User from '../../modals/User';
// import Product from '../../modals//Product';

export default async function handler(req, res) {
  res.status(200).json({ helloServer: 'working' });
}

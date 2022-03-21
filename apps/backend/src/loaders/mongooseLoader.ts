import { connect } from 'mongoose';

import { dbUri } from '../config';

export default async () => {
  // MongoDB access control must be enabled (mongod --auth)
  return await connect(dbUri);
  // return await connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});
};

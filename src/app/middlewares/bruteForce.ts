import ExpressBrute from 'express-brute';

import expressBrute from '../../config/expressBrute';

const { store, bruteForceOptions } = expressBrute;
const bruteForce = new ExpressBrute(store, bruteForceOptions);

export default bruteForce;

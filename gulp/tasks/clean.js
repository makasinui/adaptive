import { deleteAsync } from 'del';
import config from '../config.js';

const clean = () => deleteAsync(config.dist.root);

export default clean;
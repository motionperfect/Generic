import { schema as http } from './http';
import { schema as database } from './database';

export const schema = { ...http, ...database };

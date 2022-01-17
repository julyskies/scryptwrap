import crypto from 'crypto';
import util from 'util';

const scryptPromise = util.promisify(crypto.scrypt);

const HASH_LENGTH = 64;
const SALT_LENGTH = 16;

export class ScryptwrapError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ScryptwrapError';
  }
}

/**
 * Compare hash with plaintext value
 * @param {string} hash - Hash string
 * @param {string} plaintext - Plaintext string for comparison
 * @returns {Promise<boolean | never>}
 */
export async function compare(hashed: string, plaintext: string): Promise<boolean | never> {
  if (!(hashed && plaintext)) {
    throw new ScryptwrapError('Hash and plaintext strings are required!');
  }
  if (hashed.length !== 160) {
    throw new ScryptwrapError('Hash string is invalid!');
  }

  const hashHEX = hashed.slice(32);
  const saltHEX = hashed.slice(0, 32);

  const hashToCompare = await scryptPromise(plaintext, saltHEX, HASH_LENGTH) as Buffer;
  return crypto.timingSafeEqual(Buffer.from(hashHEX, 'hex'), hashToCompare);
}

/**
 * Create a hash from a string value
 * @param {string} string - value to hash
 * @returns {Promise<string | never>}
 */
export async function hash(string: string): Promise<string | never> {
  if (!string) {
    throw new ScryptwrapError('Hash string is empty!');
  }

  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
  const hashed = await scryptPromise(string, salt, HASH_LENGTH) as Buffer;
  return `${salt}${hashed.toString('hex')}`;
}

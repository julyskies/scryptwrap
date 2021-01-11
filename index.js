const { promisify } = require('util');
const {
  randomBytes,
  scrypt,
  timingSafeEqual,
} = require('crypto');

const scryptPromise = promisify(scrypt);

const HASH_LENGTH = 64;
const SALT_LENGTH = 16;

/**
 * Compare hash with plaintext value
 * @param {string} hash - Hash string
 * @param {string} plaintext - Plaintext string for comparison
 * @returns {Promise<boolean|Error>}
 */
async function compare(hashed, plaintext) {
  if (!(hashed && plaintext)) {
    throw new Error('Hash and plaintext strings are required!');
  }

  if (hashed.length !== 160) {
    throw new Error('Hash string is invalid!');
  }

  const hashHEX = hashed.substr(32);
  const saltHEX = hashed.substr(0, 32);

  const hashToCompare = await scryptPromise(plaintext, saltHEX, HASH_LENGTH);
  return timingSafeEqual(Buffer.from(hashHEX, 'hex'), hashToCompare);
}

/**
 * Create a hash from a string value
 * @param {string} string - value to hash
 * @returns {Promise<string|Error>}
 */
async function hash(string) {
  if (!string) {
    throw new Error('Hash string is empty!');
  }

  const salt = randomBytes(SALT_LENGTH).toString('hex');
  const hashed = await scryptPromise(string, salt, HASH_LENGTH);
  return `${salt}${hashed.toString('hex')}`;
}

module.exports = {
  compare,
  hash,
};

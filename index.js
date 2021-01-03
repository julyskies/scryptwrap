'use strict';

const { promisify } = require('util');
const {
  randomBytes,
  scrypt,
  timingSafeEqual,
} = require('crypto');

const scryptPromise = promisify(scrypt);

const DELIMETER = '%';
const HASH_LENGTH = 64;
const SALT_LENGTH = 16;

/**
 * Compare hash with plaintext value
 * @param {string} hash - Hash string
 * @param {string} plaintext - Plaintext string for comparison
 * @returns {Promise<boolean|Error>} 
 */
async function compare(hash, plaintext) {
  if (!(hash && plaintext)) {
    throw new Error('Hash and plaintext strings are required!');
  }

  const [saltHEX = '', hashHEX = ''] = hash.split(DELIMETER);
  if (!(hashHEX && saltHEX)) {
    throw new Error('Hash string is invalid!');
  }

  try {
    const hashToCompare = await scryptPromise(plaintext, saltHEX, HASH_LENGTH);
    return timingSafeEqual(Buffer.from(hashHEX, 'hex'), hashToCompare);
  } catch (error) {
    throw error;
  }
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

  try {
    const salt = randomBytes(SALT_LENGTH).toString('hex');
    const hash = await scryptPromise(string, salt, HASH_LENGTH);
    return `${salt}${DELIMETER}${hash.toString('hex')}`;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  compare,
  hash,
};

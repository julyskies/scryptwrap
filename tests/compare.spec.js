const { compare, hash } = require('../index');

const TEST_STRING = 'string';
const TEST_STRING_INVALID = 'invalid';

describe(
  'Testing compare function',
  () => {
    it(
      'It should compare hash string to a valid plaintext string and return TRUE',
      async () => {
        const hashString = await hash(TEST_STRING);
        const comparison = await compare(hashString, TEST_STRING);
        expect(comparison).toBeTruthy();
      },
    );

    it(
      'It should compare hash string to an invalid plaintext string and return FALSE',
      async () => {
        const hashString = await hash(TEST_STRING);
        const comparison = await compare(hashString, TEST_STRING_INVALID);
        expect(comparison).toBeFalsy();
      },
    );

    it(
      'It should throw an error if hash string is not provided',
      async () => {
        try {
          await compare('', TEST_STRING);
        } catch (error) {
          expect(error.message).toBe('Hash and plaintext strings are required!');
        }
      },
    );

    it(
      'It should throw an error if plaintext string is not provided',
      async () => {
        try {
          const hashString = await hash(TEST_STRING);
          await compare(hashString, '');
        } catch (error) {
          expect(error.message).toBe('Hash and plaintext strings are required!');
        }
      },
    );

    it(
      'It should throw an error if hash string is invalid (delimiter is missing)',
      async () => {
        try {
          const hashString = await hash(TEST_STRING);
          const invalidHash = hashString.split('%').join('');
          await compare(invalidHash, TEST_STRING);
        } catch (error) {
          expect(error.message).toBe('Hash string is invalid!');
        }
      },
    );
  },
);

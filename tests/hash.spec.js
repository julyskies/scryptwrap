const { hash } = require('../index');

const TEST_STRING = 'string';

describe(
  'Testing hash function',
  () => {
    it(
      'It should create a hash string',
      async () => {
        const hashString = await hash(TEST_STRING);
        expect(hashString).toBeTruthy();
      },
    );

    it(
      'Hash string should be 160 symbols in length',
      async () => {
        const hashString = await hash(TEST_STRING);
        expect(hashString.length).toBe(160);
      },
    );

    it(
      'It should throw an error if no string is provided',
      async () => {
        try {
          await hash();
        } catch (error) {
          expect(error.message).toBe('Hash string is empty!');
        }
      },
    );
  },
);

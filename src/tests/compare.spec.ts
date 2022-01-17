import { compare, hash, ScryptwrapError } from '../index';

const TEST_STRING = 'string';
const TEST_STRING_INVALID = 'invalid';

describe(
  'Testing compare function',
  (): void => {
    it(
      'Should compare hash string with a valid plaintext string and return TRUE',
      async (): Promise<void> => {
        const hashString = await hash(TEST_STRING);
        const comparison = await compare(hashString, TEST_STRING);
        expect(comparison).toBeTruthy();
      },
    );
    it(
      'Should compare hash string to an invalid plaintext string and return FALSE',
      async (): Promise<void> => {
        const hashString = await hash(TEST_STRING);
        const comparison = await compare(hashString, TEST_STRING_INVALID);
        expect(comparison).toBeFalsy();
      },
    );
    it(
      'Should throw an error if hash string is not provided',
      async (): Promise<void> => {
        try {
          await compare('', TEST_STRING);
        } catch (error) {
          const scryptwrapError = error as ScryptwrapError;
          expect(scryptwrapError.message).toBe('Hash and plaintext strings are required!');
        }
      },
    );
    it(
      'Should throw an error if plaintext string is not provided',
      async (): Promise<void> => {
        try {
          const hashString = await hash(TEST_STRING);
          await compare(hashString, '');
        } catch (error) {
          const scryptwrapError = error as ScryptwrapError;
          expect(scryptwrapError .message).toBe('Hash and plaintext strings are required!');
        }
      },
    );
    it(
      'Should throw an error if hash string is invalid (hash length is not equal to 160)',
      async (): Promise<void> => {
        try {
          const hashString = await hash(TEST_STRING);
          const invalidHash = hashString.slice(0, 150);
          await compare(invalidHash, TEST_STRING);
        } catch (error) {
          const scryptwrapError = error as ScryptwrapError;
          expect(scryptwrapError.message).toBe('Hash string is invalid!');
        }
      },
    );
  },
);

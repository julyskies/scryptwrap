import { hash, ScryptwrapError } from '../index';

const TEST_STRING = 'string';

describe(
  'Testing hash function',
  (): void => {
    it(
      'Should create a hash string',
      async (): Promise<void> => {
        const hashString = await hash(TEST_STRING);
        expect(hashString).toBeTruthy();
      },
    );
    it(
      'Hash string should be 160 symbols in length',
      async (): Promise<void> => {
        const hashString = await hash(TEST_STRING);
        expect(hashString.length).toBe(160);
      },
    );
    it(
      'Should throw an error if no string is provided',
      async (): Promise<void> => {
        try {
          await hash('');
        } catch (error) {
          const scryptwrapError = error as ScryptwrapError;
          expect(scryptwrapError.name).toBe('ScryptwrapError');
          expect(scryptwrapError.message).toBe('Hash string is empty!');
        }
      },
    );
  },
);

import { describe, expect, it } from 'vitest';
import { passwordSchema } from './password-policy';

describe('passwordSchema', () => {
  it('accepts a password that satisfies the full policy at the minimum length boundary', () => {
    expect(passwordSchema.safeParse('Aa1!aaaa').success).toBe(true);
  });

  it('rejects a password shorter than the minimum length even when all character requirements are present', () => {
    expect(passwordSchema.safeParse('Aa1!aaa').success).toBe(false);
  });

  it.each([
    ['an uppercase letter', 'aa1!aaaa'],
    ['a lowercase letter', 'AA1!AAAA'],
    ['a number', 'Aa!!aaaa'],
    ['a special character', 'Aa11aaaa'],
  ])('rejects a password missing %s', (_requirement, password) => {
    expect(passwordSchema.safeParse(password).success).toBe(false);
  });
});

import { describe, expect, it } from 'vitest';
import { findByUniqueId } from './findByUniqueId';

describe('findByUniqueId', () => {
  it('resolves numeric and string IDs from a flat translation dictionary', () => {
    const translations = { '12': 'Translated value', '13': 'Another value' };

    expect(findByUniqueId(translations, 12)).toBe('Translated value');
    expect(findByUniqueId(translations, '13')).toBe('Another value');
  });

  it('returns the original ID when the translation is missing', () => {
    expect(findByUniqueId({ '12': 'Translated value' }, 99)).toBe('99');
  });

  it('returns the original ID when the translation is empty or not a string', () => {
    expect(findByUniqueId({ '12': '', '13': null, '14': 123 }, 12)).toBe('12');
    expect(findByUniqueId({ '12': '', '13': null, '14': 123 }, 13)).toBe('13');
    expect(findByUniqueId({ '12': '', '13': null, '14': 123 }, 14)).toBe('14');
  });

  it('returns the key for null, undefined, arrays, and non-dictionary inputs', () => {
    expect(findByUniqueId(null, 12)).toBe('12');
    expect(findByUniqueId(undefined, 12)).toBe('12');
    expect(findByUniqueId(['not', 'a', 'dictionary'], 12)).toBe('12');
    expect(findByUniqueId('not an object' as unknown as object, 12)).toBe('12');
  });

  it('returns an empty string for nullish or empty IDs', () => {
    expect(findByUniqueId({ '12': 'Translated value' }, null)).toBe('');
    expect(findByUniqueId({ '12': 'Translated value' }, undefined)).toBe('');
    expect(findByUniqueId({ '12': 'Translated value' }, '')).toBe('');
  });
});

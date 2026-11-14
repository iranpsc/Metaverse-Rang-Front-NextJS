import { describe, expect, it } from 'vitest';
import { stripHtml } from './stripHtml';

describe('stripHtml', () => {
  it('returns an empty string for nullish or empty input', () => {
    expect(stripHtml()).toBe('');
    expect(stripHtml(null)).toBe('');
    expect(stripHtml('')).toBe('');
  });

  it('removes HTML tags and trims surrounding whitespace', () => {
    expect(stripHtml('  <p>Hello <strong>world</strong></p>  ')).toBe('Hello world');
  });

  it('decodes the supported HTML entities', () => {
    expect(stripHtml('&nbsp;A &lt; B &gt; C &quot;D&quot; &#39;E&#39; &apos;F&apos;')).toBe("A < B > C \"D\" 'E' 'F'");
  });

  it('decodes nested ampersand entities only once', () => {
    expect(stripHtml('&amp;lt;script&amp;gt;')).toBe('&lt;script&gt;');
  });

  it('removes nested tag-like markup repeatedly', () => {
    expect(stripHtml('<div><span><b>Text</b></span></div>')).toBe('Text');
  });

  it('preserves ordinary comparison text that is not an HTML tag', () => {
    expect(stripHtml('1 < 2 and 3 > 2')).toBe('1 < 2 and 3 > 2');
  });
});

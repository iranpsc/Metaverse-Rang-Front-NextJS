import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Accordion from './Accordion';

describe('Accordion client component', () => {
  it('renders the supplied rich-text content', () => {
    render(
      <Accordion
        title="Overview"
        value="<p>Client component content</p><strong>Important detail</strong>"
      />,
    );

    expect(screen.getByText('Client component content')).toBeInTheDocument();
    expect(screen.getByText('Important detail').tagName).toBe('STRONG');
  });

  it('renders an empty content value without crashing', () => {
    const { container } = render(<Accordion title="Empty" value="" />);
    expect(container.querySelector('[dir="rtl"]')).toBeInTheDocument();
    expect(container.querySelector('[dir="rtl"]')).toBeEmptyDOMElement();
  });
});

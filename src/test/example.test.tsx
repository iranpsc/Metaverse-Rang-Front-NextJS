
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

function TestComponent() {
  return <h1>Metaverse Rang Test</h1>;
}

describe('Testing infrastructure', () => {
  it('should render a React component', () => {
    render(<TestComponent />);

    expect(
      screen.getByRole('heading', {
        name: 'Metaverse Rang Test',
      }),
    ).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Legend from '../Legend';
import LegendIndicator from '../LegendIndicator'; // Import LegendIndicator for mocking or rendering

// Mock the LegendIndicator component if necessary
jest.mock('../LegendIndicator', () => ({ color, label }: { color: string, label: string }) => (
  <div data-testid="legend-indicator" style={{ color }}>
    {label}
  </div>
));

describe('Legend Component', () => {
  it('renders all LegendIndicator components with the correct props', () => {
    render(<Legend />);
    
    // Check if all LegendIndicator components are rendered
    const legendIndicators = screen.getAllByTestId('legend-indicator');
    expect(legendIndicators).toHaveLength(6); // We expect 6 LegendIndicator components
    
    // Check the props for each rendered LegendIndicator
    expect(legendIndicators[0]).toHaveTextContent('App Launched');
    expect(legendIndicators[0]).toHaveStyle('color: red');
    
    expect(legendIndicators[1]).toHaveTextContent('Category Viewed');
    expect(legendIndicators[1]).toHaveStyle('color: blue');
    
    expect(legendIndicators[2]).toHaveTextContent('Product Viewed');
    expect(legendIndicators[2]).toHaveStyle('color: orange');
    
    expect(legendIndicators[3]).toHaveTextContent('Searched');
    expect(legendIndicators[3]).toHaveStyle('color: green');
    
    expect(legendIndicators[4]).toHaveTextContent('Charged');
    expect(legendIndicators[4]).toHaveStyle('color: purple');
    
    expect(legendIndicators[5]).toHaveTextContent('App Uninstalled');
    expect(legendIndicators[5]).toHaveStyle('color: blue');
  });
});
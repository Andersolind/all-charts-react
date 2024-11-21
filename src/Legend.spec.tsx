import React from 'react';
import { render, screen } from '@testing-library/react';
import Legend from './components/Legend';

describe('Legend component', () => {
  // test('should render the legend indicators with correct colors and labels', () => {
  //   render(<Legend />);

  //   // Check if the LegendIndicator components are rendered with their respective colors and labels
  //   expect(screen.getByText('App Launched')).toHaveStyle('color: red');
  //   expect(screen.getByText('Category Viewed')).toHaveStyle('color: blue');
  //   expect(screen.getByText('Product Viewed')).toHaveStyle('color: orange');
  //   expect(screen.getByText('Searched')).toHaveStyle('color: green');
  //   expect(screen.getByText('Charged')).toHaveStyle('color: purple');
  //   expect(screen.getByText('App Uninstalled')).toHaveStyle('color: blue');
  // });

  // test('should render all legend indicators', () => {
  //   render(<Legend />);

  //   // Ensure all LegendIndicator elements are rendered
  //   expect(screen.getByText('App Launched')).toBeInTheDocument();
  //   expect(screen.getByText('Category Viewed')).toBeInTheDocument();
  //   expect(screen.getByText('Product Viewed')).toBeInTheDocument();
  //   expect(screen.getByText('Searched')).toBeInTheDocument();
  //   expect(screen.getByText('Charged')).toBeInTheDocument();
  //   expect(screen.getByText('App Uninstalled')).toBeInTheDocument();
  // });

  test('should have the correct number of LegendIndicator elements', () => {
    render(<Legend />);

    // Ensure there are exactly 6 LegendIndicator elements
    const indicators = screen.getAllByText(/./);
    expect(indicators.length).toBe(6);
  });
});
    
import { render, screen } from '@testing-library/react';
import LegendIndicator from '../LegendIndicator';

// Write a test suite for the LegendIndicator component
describe('LegendIndicator', () => {
  it('should render with the correct label and color', () => {
    const label = 'App Launched';
    const color = 'red';

    // Render the component
    render(<LegendIndicator label={label} color={color} />);

    // Check if the label is rendered correctly
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();

    // Check if the color box has the correct background color
    const colorBox = screen.getByText(label).previousElementSibling;
    expect(colorBox).toHaveStyle(`background-color: ${color}`);
  });
});
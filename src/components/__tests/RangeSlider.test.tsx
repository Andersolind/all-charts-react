import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Stats } from '../../features/campus/campusSlice';
import store from '../../store/store';
import RangeSlider from '../Slider';


describe('RangeSlider Component', () => {
  const mockOnSliderChange = jest.fn();

  const stats: Stats[] = [
    { name: 'Campus 1', id: "1" },
    { name: 'Campus 2', id: "2" },
    { name: 'Campus 3', id: "3" },
  ];

  const min = 0;
  const max = stats.length - 1;
  const step = 1;

  // Wrapper function to provide the Redux store context
  const renderWithStore = (component: JSX.Element) => {
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    );
  };

  it('should render the slider and display the correct name for the first campus', () => {
    renderWithStore(
      <RangeSlider
        min={min}
        max={max}
        step={step}
        names={stats}
        onSliderChange={mockOnSliderChange}
      />
    );

    // Check if the selected name is displayed correctly
    expect(screen.getByText('Selected Name: Campus 1')).toBeInTheDocument();
  });

  it('should call onSliderChange when the slider value is changed', () => {
    renderWithStore(
      <RangeSlider
        min={min}
        max={max}
        step={step}
        names={stats}
        onSliderChange={mockOnSliderChange}
      />
    );

    // Simulate the slider change event
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '1' } });

    // Expect the mock function to be called with the correct name
    expect(mockOnSliderChange).toHaveBeenCalledWith('Campus 2');
  });

  it('should not display slider if there are no stats', () => {
    renderWithStore(
      <RangeSlider
        min={min}
        max={max}
        step={step}
        names={[]}
        onSliderChange={mockOnSliderChange}
      />
    );

    expect(screen.getByText("No Campus's are available")).toBeInTheDocument();
    expect(screen.queryByRole('slider')).toBeNull(); // Ensure no slider is present
  });

  it('should render correctly when stats are provided and the slider is in bounds', () => {
    renderWithStore(
      <RangeSlider
        min={min}
        max={max}
        step={step}
        names={stats}
        onSliderChange={mockOnSliderChange}
      />
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '2');
    expect(slider).toHaveAttribute('step', '1');
  });

  it('should handle edge case when slider value is out of bounds', () => {
    renderWithStore(
      <RangeSlider
        min={min}
        max={max}
        step={step}
        names={stats}
        onSliderChange={mockOnSliderChange}
      />
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '5' } }); // Test an out-of-bounds value
    expect(mockOnSliderChange).not.toHaveBeenCalled();
  });
});
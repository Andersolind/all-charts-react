import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserSession from '../UserSession';
import { Provider } from 'react-redux';
import  store  from '../../store/store'; // Assuming store is in src/store/store.ts
import { loadMockData } from '../features/campus/campusActions';
import  Stats  from '../../store/store';

// Mock the `anychart-react` and `anychart` libraries to avoid rendering the actual chart
jest.mock('anychart-react', () => {
    return ({ instance }: { instance: any }) => <div>Chart</div>;
});
jest.mock('anychart', () => ({
    data: {
        tree: jest.fn().mockReturnValue({
            search: jest.fn().mockReturnValue({}),
        }),
    },
    sunburst: jest.fn().mockReturnValue({
        draw: jest.fn(),
        drillTo: jest.fn(),
        drillUp: jest.fn(),
        listen: jest.fn(),
        calculationMode: jest.fn(),
        hovered: jest.fn().mockReturnValue({
            fill: jest.fn(),
            stroke: jest.fn(),
        }),
        selected: jest.fn().mockReturnValue({
            fill: jest.fn(),
            stroke: jest.fn(),
            hatchFill: jest.fn(),
        }),
        labels: jest.fn().mockReturnValue({
            format: jest.fn(),
        }),
        tooltip: jest.fn().mockReturnValue({
            format: jest.fn(),
        }),
        container: jest.fn(),
        fill: jest.fn(),
        startAngle: jest.fn(),
        title: jest.fn(),
    }),
    color: {
        darken: jest.fn(),
    },
}));

describe('UserSessionChart', () => {
    const stats: Stats[] = [
        { id: 1, name: 'Campus 1' },
        { id: 2, name: 'Campus 2' },
        { id: 3, name: 'Campus 3' },
    ];

    // Mocking the dispatch and loadMockData
    const mockDispatch = jest.fn();
    const mockLoadMockData = jest.fn();

    // Wrapping the component with Redux store and mock dispatch
    const renderWithStore = (component: JSX.Element) => {
        return render(
            <Provider store={store}>
                {component}
            </Provider>
        );
    };

    it('should render loading state when stats are loading', () => {
        // Set up mock state with loading
        const mockState = {
            stats: {
                stats: [],
                loading: true,
                error: null,
            },
        };

        renderWithStore(<UserSession />);

        expect(screen.getByText('No Stats available.')).toBeInTheDocument();
    });

    it('should render chart when stats are available', async () => {
        // Set up mock state with stats loaded
        const mockState = {
            stats: {
                stats: stats,
                loading: false,
                error: null,
            },
        };

        renderWithStore(<UserSessionChart />);

        // Wait for chart to load
        await waitFor(() => {
            expect(screen.getByText('Chart')).toBeInTheDocument();
        });
    });

    it('should call handleSliderChange when slider value changes', () => {
        const mockHandleSliderChange = jest.fn();
        const sliderData = {
            min: 0,
            max: 2,
            step: 1,
            initialValue: 0,
            marks: [0, 1, 2],
            names: stats,
        };

        renderWithStore(
            <UserSessionChart />
        );

        // Find the slider and simulate a change event
        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: '1' } });

        // Check if the function is called
        expect(mockHandleSliderChange).toHaveBeenCalledWith('Campus 2');
    });

    it('should update customer data when chart item is clicked', () => {
        const chartClickEvent = {
            target: { me: { value: 1, name: 'Campus 2' } },
        };

        renderWithStore(<UserSessionChart />);

        // Simulate a click event on the chart
        const chart = screen.getByText('Chart');
        fireEvent.click(chart, chartClickEvent);

        // Check if customer data has been updated
        expect(screen.getByText('Campus 2')).toBeInTheDocument();
    });

    it('should filter customer data when chart item is double clicked', () => {
        const chartDoubleClickEvent = {
            target: { me: { value: 1, name: 'Campus 2' } },
        };

        renderWithStore(<UserSessionChart />);

        // Simulate a double-click event on the chart
        const chart = screen.getByText('Chart');
        fireEvent.dblClick(chart, chartDoubleClickEvent);

        // Check if customer data has been filtered
        expect(screen.queryByText('Campus 2')).not.toBeInTheDocument();
    });
});

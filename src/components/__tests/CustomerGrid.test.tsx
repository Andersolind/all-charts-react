import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerGrid from '../CustomerGrid';

// Mock the LengendIndicator component since it is not part of the test logic
jest.mock('../LegendIndicator', () => {
    return ({ color, label }: { color: string, label: string }) => (
        <span>{label}</span>
    );
});

describe('CustomerGrid', () => {
    const mockStatsData = [
        { id: '1000', name: 'Customer A' },
        { id: '2000', name: 'Customer B' },
    ];

    it('renders correctly with stats data', () => {
        render(<CustomerGrid statsData={mockStatsData} />);

        // Check if the table is rendered with the correct number of rows
        expect(screen.getByText('Stats Count- 2')).toBeInTheDocument();
        expect(screen.getByText('Customer A')).toBeInTheDocument();
        expect(screen.getByText('Customer B')).toBeInTheDocument();
        expect(screen.getByText('$10.00')).toBeInTheDocument(); // For Customer A
        expect(screen.getByText('$20.00')).toBeInTheDocument(); // For Customer B
    });

    it('displays "No Stats available." when no stats data is provided', () => {
        render(<CustomerGrid statsData={[]} />);

        // Check if the message "No Stats available." is displayed when statsData is empty
        expect(screen.getByText('No Stats available.')).toBeInTheDocument();
    });

    it('formats the currency correctly', () => {
        const formattedValue = new CustomerGrid({ statsData: [{ id: '2500', name: 'Customer C' }] });
        const formattedCurrency = formattedValue.formatCurrency('2500');
        expect(formattedCurrency).toBe('$25.00');
    });
});

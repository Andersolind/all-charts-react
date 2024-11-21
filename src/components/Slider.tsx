import React, { useEffect, useState } from "react";
import { Stats } from "../features/campus/campusSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface RangeSliderProps {
    min: number;
    max: number;
    step: number;
    names: Stats[];
    onSliderChange: (newValue: string) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, step, onSliderChange }) => {
    const { stats} = useSelector((state: RootState) => state.stats);
    
    // Local state for the range slider value
    const [sliderValue, setSliderValue] = useState<number>(0);

    useEffect(() => {
        // Update the slider bounds when the stats change
        if (stats.length > 0) {
            setSliderValue(0); // Reset the slider value if stats change
        }
    }, [stats]);

    // Handle slider value change
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        const selectedStatName = stats[newValue].name;
        setSliderValue(newValue); // Update the slider value
        onSliderChange(selectedStatName); // Call the parent handler with the new name
    };

    return (
        <div>
            {stats.length === 0 ? (
                <span>No Campus's are available</span>
            ) : (
                <>
                    <label htmlFor="range-slider">
                        <p>Selected Name: {stats[sliderValue].name}</p>
                    </label>
                    <br />
                    <input
                        id="range-slider"
                        type="range"
                        min={min}
                        max={Math.max(min, stats.length - 1)} // Ensure that max value is the length of stats - 1
                        step={step}
                        value={sliderValue}
                        onChange={handleSliderChange}
                    />
                </>
            )}
        </div>
    );
};

export default RangeSlider;
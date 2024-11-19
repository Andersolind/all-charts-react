import React, { useEffect, useState } from "react";
import { Stats } from "../features/campus/campusSlice";


// Define a type for the props if needed (optional in this case)
interface RangeSliderProps {
    min: number;
    max: number;
    step: number;
    names: Stats[];
    onSliderChange: (newValue: string) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, step, names, onSliderChange }) => {
    
    // Local state for the range slider value
    const [sliderValue, setSliderValue] = useState<number>(0);

   
    useEffect(() => {
        setSliderValue(0); // Set the initial slider value to the first name
    }, [names]);



    // Handle slider value change
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        const parseName = names[newValue].name;
        setSliderValue(newValue);
        onSliderChange(parseName);
    };
    return (
        <div>
            {names.length === 0 ? (<span>No Campus's are available</span>) : (
                <><label htmlFor="range-slider">
                    <p>Selected Name: {names[sliderValue].name}</p>
                </label><br /><input
                        id="range-slider"
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={sliderValue}
                        onChange={handleSliderChange} /></>
            )}
        </div>
    );
};

export default RangeSlider;
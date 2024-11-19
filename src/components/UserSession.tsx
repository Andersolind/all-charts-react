import AnyChart from "anychart-react";
import anychart from "anychart";
import { useEffect, useState } from "react";
import CustomerGrid from "./CustomerGrid";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/store";

import Slider from "./Slider";
import { loadMockData } from "../features/campus/campusActions";
import { Stats } from "../features/campus/campusSlice";

const UserSessionChart = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { stats, loading, error } = useSelector((state: RootState) => state.stats);
    let dataTree = anychart.data.tree(stats, "as-table");
    let chart = anychart.sunburst(dataTree);
    const [sliderData, setSliderData] = useState({
        min: 0,
        max: 100,
        step: 5,
        initialValue: 50,
        marks: [0,10,15,22,50,60,70, 100, 150, 200],
        names: stats
    });
    const [customerData, setCustomerData] = useState<Stats[]>([])


    useEffect(() => {
        dispatch(loadMockData());
        setTimeout(() => {    
            setSliderData({
                min: 0,
                max: 200,
                step: 10,
                initialValue: 100,
                marks: [0,10,15,22,50,60,70, 100, 150, 200],
                names: stats
            });
            
        }, 1000);
    }, []);

    

   
    const rangeChange = (name: string) => {
        var item = dataTree.search("name", name);

        // drill down to the item
        chart.drillTo(item);

        // drill up a level
        chart.drillUp();
        return chart.draw()
    }

    const setupChart = () => {

        chart.listen("dblclick", (event: any) => {
            setCustomerData((prevNotifications) =>
                prevNotifications.filter((stats) => stats.id !== event.target.me.value)
            );
        });

        chart.listen("click", (event: any) => {
            const isDouble = customerData.filter(stats => stats.id === event.target.me.value)
            if (isDouble.length === 0) {
                setCustomerData((prevItems) => [...prevItems, { id: event.target.me.value, name: event.target.me.name }]);
            }
        });
       
        // set calculation mode
        chart.calculationMode("parent-independent");
        chart.hovered().fill("#96a6a6", 0.4);
        chart.selected().fill("#96a6a6", 0.6);
        chart.selected().hatchFill("forward-diagonal", "#96a6a6", 0.5, 12);
        chart.normal().stroke("#96a6a6", 2);
        chart.hovered().stroke("#96a6a6", 2);
        chart.selected().stroke("#96a6a6", 4);
        // set chart title
        chart.title("Customer Stats 2024");

        // format chart labels
        chart.labels().format("{%Name}\n{%Value}{scale:(10000)(1)|( k)}");

        // format chart tooltip
        chart.tooltip().format("{%Name}: {%Value}{scale:(10000)(1)|( k)}");

        // the fill specified in the data has priority
        // set point fill
        chart.fill(() => {

            return anychart.color.darken("red", 0.15);
        });
        //sets the angle of the sunburt
        chart.startAngle(160);

        // set container id for the chart
        chart.container("container");
       
        return chart.draw()
    }

    const handleSliderChange = (newValue: string) => {
        rangeChange(newValue)
        console.log(newValue)
    };

    return (
        <><section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
            <div>
           
                <AnyChart instance={setupChart()} title="" /> 
                {loading ? (
                    <li>No Stats available.</li>
                ) : (
                  
                  <Slider
                    min={sliderData.min}
                    max={sliderData.max}
                    step={sliderData.step}
                    initialValue={sliderData.initialValue}
                    marks={sliderData.marks}
                    names={sliderData.names}
                    onSliderChange={handleSliderChange} />
                )
                  
            }
             </div>
                   
            <div><CustomerGrid statsData={customerData} /></div>
        </section>
        </>
    )
}

export default UserSessionChart
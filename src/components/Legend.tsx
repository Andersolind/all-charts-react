import React from "react"
import LengendIndicator from "./LegendIndicator"

const Legend : React.FC = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <LengendIndicator color="red" label="App Launched" />
            <LengendIndicator color="blue" label="Category Viewed" />
            <LengendIndicator color="orange" label="Product Viewed" />
            <LengendIndicator color="green" label="Searched" />
            <LengendIndicator color="purple" label="Charged" />
            <LengendIndicator color="blue" label="App Uninstalled" /> 
        </div>
    )
}

export default Legend
import React from "react"

import { Stats } from "../features/campus/campusSlice";
import LengendIndicator from "./LegendIndicator";

interface Customer {
    id: string;
    name: string;
}

interface CustomerGridProps {
    statsData: Customer[];
}
const CustomerGrid: React.FC<CustomerGridProps> = ({ statsData }) => {
    function formatCurrency(currencyString: string) {
        let convertNumber = currencyString.toString()
        let firstHalf = convertNumber.substring(0, convertNumber.length - 2);
        let secondHalf = convertNumber.substring(convertNumber.length - 2, convertNumber.length);
        return parseFloat(`${firstHalf}.${secondHalf}`).toLocaleString('en-EN', { style: 'currency', currency: 'USD' });
    }
    return (

        <>
            {statsData.length === 0 ? (
                <li>No Stats available.</li>
            ) : (
                <div className="align-middle inline-block overflow-auto   shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                    <div>Stats Count- {statsData.length}</div>
                    <table className="min-w-full w-full overflow-x-auto">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Name</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Total</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {statsData && statsData.map((item: Stats) => (
                                <tr>
                                    <><td key={item.name} className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                        <LengendIndicator color="red" label={item.name} />
                                    </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{formatCurrency(item.id)}
                                        </td></>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            )
            }

        </>
    )
}



export default CustomerGrid
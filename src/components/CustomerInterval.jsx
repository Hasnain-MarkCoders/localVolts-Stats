import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerInterval.css";
import { API_BASE_URL } from "../constants";

const CustomerInterval = () => {
	const [intervalData, setIntervalData] = useState([]);

	useEffect(() => {
		const fetchIntervalData = async () => {
			try {
				const response = await axios.get(
					`${API_BASE_URL}/interval`
				);
				setIntervalData(response.data);
			} catch (error) {
				console.error("Error fetching interval data:", error);
			}
		};

		fetchIntervalData();
	}, []);

// 	if (!intervalData.length) return <p>Loading...</p>;

// 	return (
// 		<div>
// 			<h1>Customer Interval Data</h1>
// 			<table className="interval-table">
// 				<thead>
// 					<tr>
// 						<th>NMI</th>
// 						<th>Interval Duration</th>
// 						<th>Interval End</th>
// 						<th>Imports (kWh)</th>
// 						<th>Exports (kWh)</th>
// 						<th>Costs</th>
// 						<th>Earnings</th>
// 						<th>Last Update</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{intervalData.map((data, index) => (
// 						<tr key={index}>
// 							<td>{data.NMI}</td>
// 							<td>{`${data.intervalDuration} ${data.intervalDurationUnits}`}</td>
// 							<td>
// 								{new Date(data.intervalEnd).toLocaleString()}
// 							</td>
// 							<td>{data.importsAll}</td>
// 							<td>{data.exportsAll}</td>
// 							<td>{`${data.costsAll.toFixed(2)} ${
// 								data.costsAllUnits
// 							}`}</td>
// 							<td>{`${data.earningsAll.toFixed(2)} ${
// 								data.earningsAllUnits
// 							}`}</td>
// 							<td>{data.lastUpdate}</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// };


if (!intervalData.length) return <p>Loading...</p>;

return (
  <div>
    <h1>Customer Interval Data</h1>
    <table className="interval-table">
      <thead>
        <tr>
          <th>NMI</th>
          <th>Interval Duration</th>
          <th>Interval Duration Units</th>
          <th>Interval End</th>
          <th>Exports (kWh)</th>
          <th>Exports Units</th>
          <th>Imports (kWh)</th>
          <th>Imports Units</th>
          <th>Demand Main</th>
          <th>Demand Main Units</th>
          <th>Demand Period</th>
          <th>Demand Period Units</th>
          <th>Demand Interval</th>
          <th>Earnings All</th>
          <th>Earnings All Units</th>
          <th>Earnings All Var</th>
          <th>Earnings All Fixed</th>
          <th>Earnings Flex Up</th>
          <th>Earnings Flex Down</th>
          <th>Costs All</th>
          <th>Costs All Units</th>
          <th>Costs Demand Main</th>
          <th>Costs Demand Rate</th>
          <th>Costs Flex Up</th>
          <th>Costs Flex Down</th>
          <th>Exports All Emissions</th>
          <th>Imports All Emissions</th>
          <th>Exports Zero Emission Energy (%)</th>
          <th>Imports Zero Emission Energy (%)</th>
          <th>Quality</th>
          <th>Last Update</th>
        </tr>
      </thead>
      <tbody>
        {intervalData.map((data, index) => (
          <tr key={index}>
            <td>{data.NMI}</td>
            <td>{data.intervalDuration}</td>
            <td>{data.intervalDurationUnits}</td>
            <td>{new Date(data.intervalEnd).toLocaleString()}</td>
            <td>{data.exportsAll}</td>
            <td>{data.exportsAllUnits}</td>
            <td>{data.importsAll}</td>
            <td>{data.importsAllUnits}</td>
            <td>{data.demandMain}</td>
            <td>{data.demandMainUnits}</td>
            <td>{data.demandPeriod}</td>
            <td>{data.demandPeriodUnits}</td>
            <td>{data.demandInterval}</td>
            <td>{data.earningsAll}</td>
            <td>{data.earningsAllUnits}</td>
            <td>{data.earningsAllVar}</td>
            <td>{data.earningsAllFixed}</td>
            <td>{data.earningsFlexUp}</td>
            <td>{data.earningsFlexDown}</td>
            <td>{data.costsAll}</td>
            <td>{data.costsAllUnits}</td>
            <td>{data.costsDemandMain}</td>
            <td>{data.costsDemandRate}</td>
            <td>{data.costsFlexUp}</td>
            <td>{data.costsFlexDown}</td>
            <td>{data.exportsAllEmissions}</td>
            <td>{data.importsAllEmissions}</td>
            <td>{data.exportsAllZeroEE}</td>
            <td>{data.importsAllZeroEE}</td>
            <td>{data.quality}</td>
            <td>{data.lastUpdate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default CustomerInterval;

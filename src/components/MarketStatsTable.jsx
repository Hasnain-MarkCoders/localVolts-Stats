import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import "./MarketStatsTable.css";

const MarketStatsTable = () => {
	const [marketStats, setMarketStats] = useState(null);

	useEffect(() => {
		const fetchMarketStats = async () => {
			try {
				const response = await axios.get(
					`${API_BASE_URL}/marketstats`
				);
				setMarketStats(response.data.objResult);
			} catch (error) {
				console.error("Error fetching market stats:", error);
			}
		};

		fetchMarketStats();
	}, []);

	if (!marketStats) return <p>Loading...</p>;

	return (
		<div>
			<h1>Market Stats</h1>
			<table className="market-stats-table">
				<thead>
					<tr>
						<th>Current Period</th>
						<th>Active Loads</th>
						<th>Electricity Purchased</th>
						<th>Active Generators</th>
						<th>Electricity Sold</th>
						<th>Emissions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{marketStats.currentPeriod}</td>
						<td>{marketStats.active_loads}</td>
						<td>{marketStats.electricity_purchased.toFixed(2)}</td>
						<td>{marketStats.active_generators}</td>
						<td>{marketStats.electricity_sold.toFixed(2)}</td>
						<td>{marketStats.emissions}</td>
					</tr>
				</tbody>
			</table>

			<h2>Sell Price Details</h2>
			<table className="sell-price-table">
				<thead>
					<tr>
						<th>Low</th>
						<th>Median</th>
						<th>High</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{marketStats.sellPrice.low.toFixed(4)}</td>
						<td>{marketStats.sellPrice.median.toFixed(2)}</td>
						<td>{marketStats.sellPrice.high.toFixed(3)}</td>
					</tr>
				</tbody>
			</table>

			<h2>Node Data</h2>
			<table className="node-data-table">
				<thead>
					<tr>
						<th>Postcode</th>
						<th>Latitude</th>
						<th>Longitude</th>
						<th>Type</th>
						<th>Volume</th>
					</tr>
				</thead>
				<tbody>
					{marketStats.nodes.map((node, index) => (
						<tr key={index}>
							<td>{node.postcode}</td>
							<td>{node.latitude}</td>
							<td>{node.longitude}</td>
							<td>{node.type}</td>
							<td>{node.volume}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MarketStatsTable;

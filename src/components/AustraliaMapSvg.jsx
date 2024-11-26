import React, { useEffect, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import {  Box, CircularProgress } from '@mui/material';
import geoUrl from './../assets/australia.topojson.json'; // Adjust path as necessary

const AustraliaMapSvg = ({ data }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Process the nodes from the data
    if (data?.objResult?.nodes) {
      const processedMarkers = data.objResult.nodes.map((node, index) => ({
        id: `${node.postcode}-${index}`,
        coordinates: [node.longitude, node.latitude],
        type: node.type,
        volume: node.volume,
      }));
      setMarkers(processedMarkers);
    }
  }, [data]);

  // Function to get color based on node type
  const getMarkerColor = (type) => {
    return type === 'Gen' ? 'green' : 'red';
  };

  return (
    <Box sx={{ backgroundColor: 'white' }}> {/* Outer Box with white background */}
      {markers.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%', // Full width of the container
          // height: '20dvh', // Full height of the container
        }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 1000, center: [133.7751, -28] }} // Adjust scale and center
          style={{
            // backgroundColor: 'black', // Map background color is black
            borderRadius: '8px', // Optional: rounded corners for map
            width: '600px', // Full width of the container
            height: '600px', // Full height of the container
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo, index) => (
                <Geography
                className={`${"australia"+index}`}
                  key={`${geo.rsmKey}+ ${index}`}
                  geography={geo}
                  stroke="#FFF" // White stroke for borders
                  fill="transparent" // Make geography areas transparent
                />
              ))
            }
          </Geographies>
          {markers.map((marker) => (
            <Marker key={marker.id} coordinates={marker.coordinates}>
              <circle
                r={5} // Adjust radius as needed
                fill={getMarkerColor(marker.type)}
                stroke="#FFF"
                strokeWidth={0.5}
              />
              <title>
                Postcode: {marker.id.split('-')[0]}
                {'\n'}Type: {marker.type}
                {'\n'}Volume: {marker.volume}
              </title>
            </Marker>
          ))}
        </ComposableMap>
        </Box>
      )}
    </Box>
  );
};

export default AustraliaMapSvg;

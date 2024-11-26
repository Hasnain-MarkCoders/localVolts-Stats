// Home.jsx
import React from 'react';
import {
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { COLORS } from '../../../styles';
import { parseCustomDate } from '../../utils/navigation';
import AustraliaMapSvg from "./../../components/AustraliaMapSvg"
import Button from '../../components/Button';
import { ArrowBigDownDash, ArrowDown10, ArrowUp01, Calendar, ChartCandlestick, Pickaxe, PlugZap, Unplug, UtilityPole } from "lucide-react"
import StatsInsight from '../../components/StatsInsight';
// Fetch function to get data from the API
const fetchMarketStats = async ({ queryKey }) => {
  const [_key] = queryKey;
  const response = await axiosInstance.get(`/marketstats`, {
    params: {

    },
  });
  return response.data;
};
const MarketStatsPage = () => {


  const {

    data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['get)market_stats'], // Assuming API pages start at 1
    queryFn: fetchMarketStats,
    retry: 3, // Retry up to 3 times on failure
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true, // Keep previous data while fetching new data
    refetchOnReconnect: true,

  });

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Market Stats
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress sx={{
            color: COLORS.BLACK
          }} />
        </Box>
      ) : isError ? (
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="50vh">
          <Typography variant="h6" color="error">
            Error fetching data
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {error.message}
          </Typography>
          <Box mt={2}>
            <Button
              fullWidth={false}
              sx={{ mt: 2 }}
              disabled={isLoading}
              title={"Retry"}
              cb={(e) => { refetch(e) }}
              type={"submit"}
            />
          </Box>
        </Box>
      ) : (
        <Box sx={{ position: 'relative' }}>
          {/* Show a LinearProgress indicator when fetching new data in the background */}
          {isFetching && (
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <Box mt={4}>
            <Box sx={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <StatsInsight
                value={data?.objResult?.sellPrice?.low}
                title="Low Value"
                Icon={ArrowDown10}
              />

              <StatsInsight
                value={data?.objResult?.sellPrice?.median}
                title="Mid Value"
                Icon={ChartCandlestick}
              />

              <StatsInsight
                value={data?.objResult?.sellPrice?.high}
                title="High Value"
                Icon={ArrowUp01}
              />

              <StatsInsight
                value={data?.objResult?.active_loads}
                title="Active Loads"
                Icon={ArrowBigDownDash}
              />


              <StatsInsight
                value={data?.objResult?.active_generators}
                title="Active Generators"
                Icon={Pickaxe}
              />


              <StatsInsight
                value={data?.objResult?.emissions}
                title="Emission"
                Icon={UtilityPole}
              />
              <StatsInsight
                value={new Date(parseCustomDate(data?.objResult?.currentPeriod)).toLocaleDateString()}
                title="Current Period"
                Icon={Calendar}
              />


              <StatsInsight
                value={data?.objResult?.electricity_purchased}
                title="Electricity Purchased"
                Icon={Unplug}
              />


              <StatsInsight
                value={data?.objResult?.electricity_sold}
                title="Electricity Sold"
                Icon={PlugZap}
              />
            </Box>

          </Box>
          <Box>
            <AustraliaMapSvg
            data={data}
            />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default MarketStatsPage
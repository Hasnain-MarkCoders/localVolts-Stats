import React, { useLayoutEffect, useMemo } from 'react'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { getTodayDate } from '../../utils/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import { COLORS } from '../../../styles';
import Button from '../../components/Button';
import { Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ROUTES } from '../../../routesName';
const fetchCustomerData = async ({ queryKey }) => {
    const [_key, nmi] = queryKey;
    const response = await axiosInstance.get(`/nmi-graph`, {
        params: {
            nmi,
            // date:getTodayDate()
        },
    });
    return response.data;
};

const CustomerDetailsPage = () => {
    const {state} = useLocation()
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        
        data,
        isLoading,
        isError,
        isFetching,
        error,
        refetch,
    } = useQuery({
        queryKey: ['get_customer_data',searchParams.get("nmi")], // Assuming API pages start at 1
        queryFn: fetchCustomerData,
        retry: 3, // Retry up to 3 times on failure
        staleTime: 5 * 60 * 1000, // 5 minutes
        keepPreviousData: true, // Keep previous data while fetching new data
        refetchOnReconnect: true,
        
    });


    useLayoutEffect(()=>{
        if(state){
            setSearchParams({nmi:state})
        }
    },[])
    const chartData = useMemo(()=>data?.[0]?.earnings?.map((earning, index) => ({
        name: `Time: ${new Date(data[0]?.interval[index]).toLocaleTimeString()} and Date:  ${new Date(data[0]?.interval[index]).toLocaleDateString()}`,  // Example, you can customize the time label as per your data
        earnings: earning,
        costs: data[0]?.costs[index] || 0
    })) || [],[state, data]);


    // if(!state){
    //     return <Navigate to={ROUTES.CUSTOMERS}/>
    // }
  return (
    <Box p={2}>
    <Typography variant="h4" gutterBottom>
        Customer Details
    </Typography>
    {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress sx={{
                color:COLORS.BLACK                    }}  />
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
            cb={(e)=>{refetch(e)}}
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
                    position:"absolute",
                    top:"0",
                    left:"0",
                    width:"100%",
                    height:"100%",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                  }}
                  >
                  <CircularProgress />
              </Box>
            )}
             <Box mt={4}>
                        <Typography variant="h6">Earnings and Costs Overview</Typography>
                        <ResponsiveContainer width="100%" height={400}>
                            <ComposedChart data={chartData}>
                                <CartesianGrid strokeDasharray="1 1" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                radius={10}
                                barSize={3}
                                animationBegin={400} animationDuration={400} animationEasing="linear"
                                dataKey="earnings" fill="#ff7f0e" 
                                
                                />
                                <Bar
                                radius={10}

                                barSize={3}

                                animationBegin={0} animationDuration={400} animationEasing="linear"ss
                                dataKey="costs" fill="#2ca02c" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </Box>
        </Box>
    )}
</Box>
  )
}

export default CustomerDetailsPage
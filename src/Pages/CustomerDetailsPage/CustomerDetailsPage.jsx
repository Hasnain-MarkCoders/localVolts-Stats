import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useQueries, useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { getTodayDate } from '../../utils/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import { COLORS } from '../../../styles';
import Button from '../../components/Button';
import { Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ROUTES } from '../../../routesName';
import StatsInsight from '../../components/StatsInsight';
import { ArrowDown10, ArrowUp01, ChartCandlestick, } from "lucide-react"

const fetchCustomerData = async ({ queryKey }) => {
    const [_key, nmi] = queryKey;
    const response = await axiosInstance.get(`/nmi-graph`, {
        params: {
            nmi,
            date: getTodayDate()
        },
    });
    return response.data;
};
const fetchCustomerDataOverTheTime = async ({ queryKey }) => {
    const [_key, nmi, period] = queryKey;
    const response = await axiosInstance.get(`/get-cost-values`, {
        params: {
            nmi,
            date: getTodayDate(),
            period
        },
    });
    return response.data;
};

const CustomerDetailsPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        data,
        isLoading,
        isError,
        isFetching,
        error,
        refetch,
    } = useQuery({
        queryKey: ['get_customer_data', searchParams.get("nmi")], // Assuming API pages start at 1
        queryFn: fetchCustomerData,
        retry: 3, // Retry up to 3 times on failure
        staleTime: 5 * 60 * 1000, // 5 minutes
        keepPreviousData: true, // Keep previous data while fetching new data
        refetchOnReconnect: true,
        enabled: searchParams.get("nmi") ? true : false

    });
    const periodQueries = useQueries({
        queries: ['6', '28', 'all'].map(period => ({
            queryKey: ['get_cost_values', searchParams.get("nmi"), period],
            queryFn: fetchCustomerDataOverTheTime,
            staleTime: 5 * 60 * 1000,
            keepPreviousData: true, // Keep previous data while fetching new data
            refetchOnReconnect: true,
            enabled: searchParams.get("nmi") ? true : false,
            select: (responseData) => ({
                period,
                total: responseData.total,
                costs: responseData.costs,
                interval: responseData.interval,
                imports: responseData.imports

            })
        }))
    });

    useEffect(() => {
        if (state) {
            setSearchParams({ nmi: state })
        }

    }, [state])
    useLayoutEffect(() => {
        if (!searchParams.get("nmi")) {
            navigate(ROUTES.CUSTOMERS)
        }
    }, [searchParams])
    const chartData = useMemo(() => data?.[0]?.earnings?.map((earning, index) => ({
        // name: `Time: ${new Date(data[0]?.interval[index]).toLocaleTimeString()} and Date:  ${new Date(data[0]?.interval[index]).toLocaleDateString()}`,  // Example, you can customize the time label as per your data
        name: `${new Date(data[0]?.interval[index]).toLocaleTimeString({
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })}`,  // Example, you can customize the time label as per your data

        earnings: earning,
        costs: data[0]?.costs[index] || 0
    })) || [], [state, data]);


    return (
        <Box p={2}>
            <Typography mb={6} variant="h4" gutterBottom>
                Customer Details
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
                    )}<>
                        <Box >
                            <Typography sx={{
                                mb: 4
                            }} variant="h6">Saving Overview over the Period</Typography>
                            <Box mt={4}>
                                <Box sx={{
                                    display: "flex",
                                    gap: "20px",
                                    flexWrap: "wrap",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                    {periodQueries.map((query, index) => {
                                        const periods = {
                                            0: { title: "Last 7 days", Icon: ArrowDown10 },
                                            1: { title: "Last 28 days", Icon: ChartCandlestick },
                                            2: { title: "All time", Icon: ArrowUp01 }
                                        };

                                        const { title, Icon } = periods[index];
                                        const sumImports = query?.data?.imports?.flatMap(i => i)?.reduce((acc, curr) => acc + curr, 0) || 0;
                                        const sumCosts = query?.data?.costs?.flatMap(i => i)?.reduce((acc, curr) => acc + curr, 0) || 0;
                                        const ratio = sumCosts / sumImports




                                        return (
                                            <Box key={title} sx={{ flex: 1, minWidth: 300 , display:query.isLoading?"grid":"unset", placeContent:query.isLoading?"center":"unset"}}>
                                                {query.isLoading ? (
                                                    <CircularProgress size={24} />
                                                ) : query.isError ? (
                                                    <Typography color="error">
                                                        Error loading {title.toLowerCase()}
                                                    </Typography>
                                                ) : (
                                                    <StatsInsight
                                                        value={ratio}
                                                        title={title}
                                                        Icon={Icon}
                                                        subText={`${query.data?.costs?.length || 0} data points`}
                                                    />
                                                )}
                                            </Box>
                                        )
                                    })}

                                </Box>

                            </Box>


                        </Box>
                        <Box >
                            <Typography sx={{
                                my: 4
                            }} variant="h6">Earnings and Costs Overview</Typography>
                            <ResponsiveContainer style={{
                                marginLeft: "-35px",

                            }} width="100%" height={400}>
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

                                        animationBegin={0} animationDuration={400} animationEasing="linear" ss
                                        dataKey="costs" fill="#2ca02c" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Box>


                    </>
                </Box>
            )}
        </Box>
    )
}

export default CustomerDetailsPage
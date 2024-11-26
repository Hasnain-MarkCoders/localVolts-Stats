// Home.jsx
import React, { useCallback, useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Box,
    TablePagination,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../../styles';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routesName';
import Button from '../../components/Button';
import { getTodayDate } from '../../utils/navigation';
// Fetch function to get data from the API
const fetchDetails = async ({ queryKey }) => {
    const [_key, page, limit] = queryKey;
    const response = await axiosInstance.get(`/nmi`, {
        params: {
            page: page,
            limit: limit,
            // date:getTodayDate()
        },
    });
    return response.data;
};

const AllCustomersPage = () => {
    // State for pagination
    const [page, setPage] = useState(0); // MUI uses zero-based indexing
    const [limit, setLimit] = useState(10); // Default to 10
    const dispatch = useDispatch();
    const [placeholderData, setPlaceHolderData] = useState(undefined)
    const navigate = useNavigate()
    // React Query to fetch data
    const {
        
        data,
        isLoading,
        isError,
        isFetching,
        error,
        refetch,
    } = useQuery({
        queryKey: ['details', page + 1, limit], // Assuming API pages start at 1
        queryFn: fetchDetails,
        retry: 3, // Retry up to 3 times on failure
        staleTime: 5 * 60 * 1000, // 5 minutes
        keepPreviousData: true, // Keep previous data while fetching new data
        refetchOnReconnect: true,
        placeholderData
        
    });
    const updatePlaceHolderData = useCallback(() => {
        if (data) {
            setPlaceHolderData(data)
        }
     
    },[data])


    useEffect(() => {
        updatePlaceHolderData()
    }, [updatePlaceHolderData])

    // Handler for page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handler for rows per page change
    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    const handleNavigate = (nmi)=>{
        navigate(ROUTES.CUSTOMER, {state:nmi});
    }

    // Destructure data and pagination from the response
    const tableData = data?.data || [];
    const pagination =  {
        page:data?.pagination?.page|| 1,
        limit: data?.pagination?.limit||limit,
        totalPages: data?.pagination?.totalPages,
        hasNextPage: data?.pagination.hasNextPage||false,
        totalItems:data?.pagination.totalRecords|| 0,
    };

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>
                All Customers Table
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
                    <TableContainer 
                    
                    sx={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', borderRadius: '12px' }}
                    component={Paper}>
                        <Table aria-label="details table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: COLORS.GRAY }} >
                                    <TableCell l sx={{ color: COLORS.BLACK, fontWeight: '600', fontSize: '16px' }}>
                                        <strong>NMI</strong>
                                    </TableCell>
                                    <TableCell l sx={{ color: COLORS.BLACK, fontWeight: '600', fontSize: '16px' }}align="right">
                                        <strong>Cost All Fixed Up (cents)</strong>
                                    </TableCell>
                                    <TableCell l sx={{ color: COLORS.BLACK, fontWeight: '600', fontSize: '16px' }}align="right">
                                        <strong>Earning All Fixed Up (cents)</strong>
                                    </TableCell>
                                    {/* <TableCell l sx={{ color: COLORS.WHITE, fontWeight: '600', fontSize: '16px' }} align="right">
                                        <strong>Details</strong>
                                    </TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.length > 0 ? (
                                    tableData.map((row, index) => (
                                        <TableRow 
                                        
                                        onClick={()=>{
                                            // alert(row?.NMI)
                                            handleNavigate(row?.NMI)
                                        }}
                                        sx={{ 
                                            backgroundColor: index % 2 === 0 ? COLORS.WHITE : COLORS.GRAY,
                                            '&:hover': {
                                                backgroundColor: COLORS.BLUE,
                                                cursor: 'pointer',
                                            },
                                        }}
                                        key={row.NMI}>
                                            <TableCell component="th" scope="row" sx={{ color: COLORS.BLACK, fontWeight: '500', alignItems:"center", display:"flex", gap:"20px" }}>
                                                {row.NMI}
                                            </TableCell>
                                            <TableCell  sx={{ color: COLORS.BLACK }} align="right">{row.averageCostsFlexUp}</TableCell>
                                            <TableCell  sx={{ color: COLORS.BLACK }} align="right">{row.averageEarningsFlexUp}</TableCell>
                                            {/* <TableCell  sx={{ color: COLORS.BLACK }} align="right"><Navigation />
                                            </TableCell> */}

                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3}  sx={{ padding: '40px 0', color: COLORS.BLACK }} align="center">
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        sx={{
                            '.MuiTablePagination-toolbar': {
                                backgroundColor: COLORS.GRAY,
                                borderRadius: '0 0 12px 12px',
                                boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.05)',
                            },
                            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                                color: COLORS.BLACK,
                                fontWeight: '500',
                            },
                            '.MuiTablePagination-select': {
                                color: COLORS.BLACK,
                            },
                            '.MuiTablePagination-menuItem': {
                                color: COLORS.BLACK,
                            },
                            '.MuiButtonBase-root': {
                                color: COLORS.BLACK,
                            },
                        }}
                        component="div"
                        count={pagination.totalItems || 0} // Use totalItems if available
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={limit}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10, 50, 100, 150, 200]} // Include 10 as it's the default
                        labelRowsPerPage="Rows per page:"
                    />
                </Box>
            )}
        </Box>
    );
};

export default AllCustomersPage;

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import pageNotFound from "./../../assets/404.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routesName";

const NotFound = () => {
    const { auth = false } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const handleNavigate = () => {
        if (auth) {
            navigate(ROUTES.STATS)
        }
        else {
            navigate(ROUTES.LOGIN)
        }
    }
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                background: "#B8DCE8",
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "fixed",
                    zIndex: 3,
                    top: "10%",
                    left: "10%",
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: {
                            xs: "40px",
                            sm: "60px",
                            md: "80px",
                            lg: "200px",
                        },
                        whiteSpace: "nowrap",
                    }}
                >
                    OOPS
                </Typography>

                <Typography
                    variant="h2"
                    sx={{
                        fontSize: {
                            xs: "24px",
                            sm: "36px",
                            md: "48px",
                            lg: "60px",
                        },
                        color: "#3d3d3d",
                        whiteSpace: "nowrap",
                    }}
                >
                    Where are we?
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontSize: {
                            xs: "16px",
                            sm: "18px",
                            md: "20px",
                            lg: "25px",
                        },
                        mt: 2,
                    }}
                >
                    The page you are looking for was moved, removed, renamed,
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: {
                            xs: "16px",
                            sm: "18px",
                            md: "20px",
                            lg: "25px",
                        },
                        mt: 2,
                    }}
                >
                    or might never have existed.
                </Typography>
                <Button
                    onClick={handleNavigate}
                    variant="contained"
                    sx={{
                        mt: 4,

                        background: "primary.main"
                    }}>{auth ? "Go to Home page" : "Go to Login page"} </Button>
            </Box>

            <img
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                }}
                src={pageNotFound}
                alt="Page Not Found"
            />
        </Box>
    );
};

export default NotFound;

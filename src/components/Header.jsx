import { Box, Button, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import logo from './../assets/local_volt_logo.png'
import elon from './../assets/elon.jpg'
import { resetProfile } from '../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routesName'
import { STYLES } from '../../styles'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state) => state?.auth)
  const {profile = {}} = auth
  const [isShowDropDown, setIsShowDropDown] = useState(false)
  const handleLogout = () => {
    dispatch(resetProfile())
    navigate(ROUTES.LOGIN)
  }
  return (
    <Box sx={{
      width: "100%",
      height: "100px"
      , display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "fixed",
      top: 0,
      zIndex: 1000,
      borderBottom: ".1px solid #d9d9d9",
      backgroundColor: "#fff",
      padding: "0 40px",
    }}>

      <Box sx={{
        width: "40px"
      }}>
        <img
          src={logo}
          style={{

            width: "100%",
          }}
        />

      </Box>

      <Box sx={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}>
        <Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: "600"
            }}
          >
            {profile?.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "600",
              color: "gray"
            }}
          >
            {profile?.email}
          </Typography>
        </Box>
        <Box sx={{
          width: "60px",
          cursor: "pointer",
          borderRadius: "50%",
          position: "relative",
          
        }}
        
          onMouseLeave={() => {
            setIsShowDropDown(false)
          }}
          onMouseEnter={() => {
            setIsShowDropDown(true)
          }}
        >
          <img
            src={elon}
            style={{
              borderRadius: "50%",
              width: "100%",
            }}
          />
 {isShowDropDown && <Box
            sx={{
              position: "absolute",
              top: 60,
              left: "-120px",
              background: "white",
              zIndex: "111",
              minWidth: "180px",
              borderRadius:"8px",
              p:"0",
              m:0,
              border: ".1px solid #d9d9d9",
              borderRadius: STYLES.BORDER_RADIUS,
              padding: `10px ${STYLES.PADDING_HORIZONTAL}`,
            }}>
            <List sx={{
              p:0,
              m:0
            }}>
              <ListItem
              sx={{
                "&:hover":{
                  background:"white"
                }
                ,
              borderRadius:"8px",

              }}
                onClick={() => {
                  setIsShowDropDown(false)
                  handleLogout()
                }}
                disablePadding>
                <ListItemButton sx={{
                      textAlign:"center",

                    "&:hover":{
                      background:"white",
                    }
                }}>
                  <ListItemText primary="Log out" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>}
        </Box>
      </Box>

    </Box>
  )
}

export default Header
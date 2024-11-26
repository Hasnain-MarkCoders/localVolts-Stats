import React, { useEffect } from 'react'
import { COLORS, STYLES } from '../../styles'
import { Button as MuiButton } from '@mui/material'

const Button = ({
    title="",
    cb=()=>{},
    variant="contained",
    backgroundColor=COLORS.BLACK,
    color=COLORS.WHITE,
    disabled=false,
    fullWidth=false,
    sx={},
    type = "button",
    isLoadingTexts="Loading...",
    isLoading=false,
}) => {
  return (
    <MuiButton 
    type={type}
    fullWidth={fullWidth}
    disabled={disabled}
    sx={{
        backgroundColor,
        color,
        ...sx,
        padding:`${STYLES.PADDING_VERTICAL} ${STYLES.PADDING_HORIZONTAL}`,
        borderRadius:STYLES.BORDER_RADIUS
    }}
    variant={variant}
    onClick={cb}>
        {isLoading?isLoadingTexts:title}
    </MuiButton>
  )
}

export default Button
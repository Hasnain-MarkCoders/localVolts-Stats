import React from 'react'
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
        {title}
    </MuiButton>
  )
}

export default Button
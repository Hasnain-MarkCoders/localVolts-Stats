import { Box, Typography } from '@mui/material'
import React from 'react'
import { COLORS, STYLES } from '../../styles'
import { ArrowDown10 } from 'lucide-react'

const StatsInsight = ({
    Icon=<></>,
    title="",
    value=""
}) => {
  return (
   <Box sx={{
                border: ".1px solid #d9d9d9",
                minHeight: "110px",
                display: "flex",
                flexGrow:1,
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: STYLES.BORDER_RADIUS,
                padding: `${STYLES.PADDING_VERTICAL} ${STYLES.PADDING_HORIZONTAL}`,
                flexBasis: {
                  sm: "48%",
                  md: "32%",
                  xs: "100%",
                }
              }}>
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex:1

                }}>
                  <Box>

                    <Typography sx={{
                      color: COLORS.LIGHT_GRAY,
                    }}>
                      {title}
                    </Typography>
                    <Typography>
                      {value}
                    </Typography>
                  </Box>
                  <Box sx={{
                    borderRadius: "50%",
                    backgroundColor: COLORS.GRAY,
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",


                  }}>

                    <Icon />
                  </Box>
                </Box>
              </Box>
  )
}

export default StatsInsight
import React from 'react'
import StarIcon from '@mui/icons-material/Star'; // Import Star Icon
import Typography from '@mui/material/Typography';


export default function Rate({rate} : {rate:number}) {
  return (
   <div style={{ display: 'flex', alignItems: 'center' }}>
            <StarIcon sx={{ color: '#ffde59', fontSize: '1.5rem' }} /> {/* Star icon */}
            <Typography
              variant="body2"
              sx={{
                marginLeft: '5px',
                fontSize: '1rem',
                color: '#000000',
              }}
            >
              {rate}
            </Typography>
          </div>
  )
}

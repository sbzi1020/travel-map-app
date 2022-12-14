import { PersonPinCircle } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import React from 'react'

interface Props {
    sx?: any
}
const Logo = ({sx}: Props) => {
    return (
        <Stack direction='row' spacing={1} justifyContent='center' alignItems='center' color='tomato' {...sx}>
            <Typography variant='h5' sx={{ color: 'tomato', textAlign: 'center', fontWeight: 'bold' }}>Trama</Typography>
            <PersonPinCircle />
        </Stack>
    )
}

export default React.memo(Logo)

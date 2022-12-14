import { Button, Rating, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { FormValue, NewPlace } from '../App'
import PopUp from './PopUp'

interface Props {
    newPlace: { lat: number, lng: number }
    form: {
        title: string,
        disc: string,
        rating: number
    }
    setNewPlace: ({ }: NewPlace) => void
    setForm: ({ }: FormValue) => void
    handleSubmit: (e: any) => void
}
const MapPopupForm = ({ newPlace, setNewPlace, form, setForm, handleSubmit }: Props) => {
    return (
        < PopUp
            key={newPlace.lat}
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            onClose={() => {
                setNewPlace({ lat: 0, lng: 0 })
                setForm({
                    title: "",
                    disc: "",
                    rating: 0
                })
            }}
        >
            <Stack direction='column' className='popup' spacing={1}>
                <Stack spacing={2}
                    sx={{ marginBottom: '1rem' }}
                >
                    <Typography variant='h6' textAlign='center'>Add a place</Typography>
                    <TextField
                        id="outlined-basic"
                        label="Place"
                        placeholder='Enter a title'
                        variant="outlined"
                        value={form.title}
                        onChange={(e: any) => setForm({ ...form, title: e.target.value })}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="Review"
                        multiline
                        rows={6}
                        maxRows={6}
                        variant="outlined"
                        placeholder='Tell us more about this place.'
                        value={form.disc}
                        onChange={(e: any) => setForm({ ...form, disc: e.target.value })}
                    />
                    <Rating
                        name="simple-controlled"
                        value={form.rating}
                        onChange={(e: any) => setForm({ ...form, rating: e.target.value })}
                    />
                </Stack>
                <Button variant='contained' size='small' sx={{
                    backgroundColor: 'tomato',
                    boxShadow: 1,
                    '&:hover': {
                        backgroundColor: 'white',
                        color: 'tomato',
                        border: '1px solid tomato',
                        boxShadow: 0
                    }
                }}
                    onClick={handleSubmit}
                >Submit</Button>
            </Stack>

        </PopUp>)
}

export default React.memo(MapPopupForm)

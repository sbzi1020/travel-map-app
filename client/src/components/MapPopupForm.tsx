import { Button } from '@mui/material'
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
            <form className='newPlaceForm'
            >
                <label>Title</label>
                <input
                    placeholder='Enter a title'
                    value={form.title}
                    onChange={(e: any) => setForm({ ...form, title: e.target.value })}
                />
                <label>Review</label>
                <textarea
                    placeholder='Tell us more about this place.'
                    value={form.disc}

                    onChange={(e: any) => setForm({ ...form, disc: e.target.value })}
                />
                <label>Rating</label>
                <select
                    value={form.rating}
                    onChange={(e: any) => setForm({ ...form, rating: e.target.value })}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
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
            </form>
        </PopUp>)
}

export default React.memo(MapPopupForm)

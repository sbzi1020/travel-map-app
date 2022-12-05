import { LocationOn, Star } from '@mui/icons-material';
import moment from 'moment';
import axios, { Axios } from 'axios';
import { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import './App.css'
import { Button } from '@mui/material';
import { FormEvent } from 'react';

interface Pin {
    username: string
    title: string
    rating: number
    lat: number
    long: number
    disc: string
    createdAt: string
    _id: string
}
function App() {
    const [pins, setPins] = useState(Array<Pin>)
    const [currentPlaceId, setCurrentPlaceId] = useState("")
    const [currentUser, setCurrentUser] = useState("Fion")
    const [newPlace, setNewPlace] = useState({ lat: 0, lng: 0 })

    const [form, setForm] = useState({
        title: "",
        disc: "",
        rating: 0
    })
    // <label>Title</label>
    // <input placeholder='Enter a title' />
    // <label>Review</label>
    // <textarea placeholder='Tell us more about this place.' />
    // <label>Rating</label>
    const [viewPoint, setViewPoint] = useState({
        longitude: -100,
        latitude: 40,
        zoom: 4
    })



    useEffect(() => {
        const getPins = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/pins")
                // console.log(`${JSON.stringify(res, null, 4)}`)
                setPins(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getPins()
    }, [])

    const handleMarkerclick = (id: string, lat: number, long: number) => {
        setCurrentPlaceId(id)
        setViewPoint({ ...viewPoint, latitude: lat, longitude: long })
    }

    const handleAddClick = (e: any) => {
        const { lng, lat } = e.lngLat as any;
        setNewPlace({
            lat, lng
        })
        // clear the pre pin popup
        setCurrentPlaceId("")
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const newPin = {
            username: currentUser,
            title: form.title,
            disc: form.disc,
            rating: form.rating,
            lat: newPlace.lat,
            long: newPlace.lng
        }
        try {
            const res = await axios.post('http://localhost:3001/api/pins', newPin)
            setPins([...pins, res.data])
            setNewPlace({ lat: 0, lng: 0 })
            console.log(`${JSON.stringify(res.data, null, 4)}`)
            setForm({
                title: "",
                disc: "",
                rating: 0
            })
        } catch (err) {
            console.log(err)
        }
    }

    return <Map
        {...viewPoint}
        style={{ width: '100vw', height: '90vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onMove={nextviewpoint => setViewPoint(nextviewpoint as any)}
        onDblClick={handleAddClick}
    >
        {
            pins.map((pin) => (
                <div key={pin._id}>
                    <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom"
                    >

                        <LocationOn
                            style={{
                                fontSize: viewPoint.zoom * 8,
                                color: currentUser === pin.username ? "tomato" : "blue",
                                cursor: 'pointer'
                            }}
                            onClick={() => handleMarkerclick(pin._id, pin.lat, pin.long)}
                        />
                    </Marker>

                    {pin._id === currentPlaceId &&
                        < Popup
                            longitude={pin.long}
                            latitude={pin.lat}
                            anchor="left"
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => setCurrentPlaceId("")}
                        >

                            <div className='popup'>
                                <label>Place</label>
                                <p>{pin.title}</p>
                                <label>Review</label>
                                <p>{pin.disc}</p>
                                <label>Rating</label>
                                <div className='stars'>
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                                <label>Information</label>
                                <p>Created by <strong>{pin.username}</strong></p>
                                <p className='time'>{moment(new Date(pin.createdAt)).fromNow()}</p>
                            </div>
                        </Popup>
                    }
                </div>
            ))
        }
        {
            newPlace && (
                < Popup
                    key={newPlace.lat}
                    longitude={newPlace.lng}
                    latitude={newPlace.lat}
                    anchor="left"
                    closeButton={true}
                    closeOnClick={false}
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
                </Popup>
            )
        }
    </Map >
}

export default App;

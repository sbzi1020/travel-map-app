import { LocationOn, Star } from '@mui/icons-material';
import { format } from 'timeago.js'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import './App.css'

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
    const [showPopup, setShowPopup] = useState(true);
    const [viewPoint, setViewPoint] = useState({
        longitude: -100,
        latitude: 40,
        zoom: 4
    })



    useEffect(() => {
        const getPins = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/pins")
                console.log(`${JSON.stringify(res, null, 4)}`)
                setPins(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getPins()
    }, [])

    const handleMarkerclick = (id: string) => {
        setCurrentPlaceId(id)
    }

    return <Map
        {...viewPoint}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onMove={nextviewpoint => setViewPoint(nextviewpoint as any)}
    >
        {pins.map((pin) => (
            <>
                <Marker key={pin._id} longitude={pin.long} latitude={pin.lat} anchor="bottom" >
                    <LocationOn
                        style={{ fontSize: viewPoint.zoom * 8, color: 'blue' }}
                        onClick={() => handleMarkerclick(pin._id)}
                    />
                </Marker>

                {pin._id === currentPlaceId &&
                    < Popup longitude={pin.long} latitude={pin.lat}
                        anchor="left"
                        onClose={() => setShowPopup(false)}
                        key={pin.long}
                    >

                        <div

                            className='popup'
                        >
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
                            <p>Created by {pin.username}</p>
                            <p className='time'>{format(pin.createdAt)}</p>
                        </div>
                    </Popup>
                }
            </>

        ))
        }
    </Map >
}

export default App;

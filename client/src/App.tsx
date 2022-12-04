import { LocationOn, Star } from '@mui/icons-material';
import moment from 'moment';
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
    const [currentUser, setCurrentUser] = useState("Fion")
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

    // const handleMarkerclick = (id: string) => {

    //     setCurrentPlaceId(id)
    // }

    return <Map
        {...viewPoint}
        style={{ width: '100vw', height: '90vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onMove={nextviewpoint => setViewPoint(nextviewpoint as any)}
    >
        {pins.map((pin) => (
            <>
                <Marker key={pin._id} longitude={pin.long} latitude={pin.lat} anchor="bottom"
                >
                    <LocationOn
                        style={{
                            fontSize: viewPoint.zoom * 8,
                            color: currentUser === pin.username ? "tomato" : "blue",
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            setCurrentPlaceId(pin._id)
                            setViewPoint({ ...viewPoint, latitude: pin.lat, longitude: pin.long })
                        }}
                    />
                </Marker>

                {pin._id === currentPlaceId &&
                    < Popup longitude={pin.long} latitude={pin.lat}
                        anchor="left"
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => setCurrentPlaceId("")}
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
                            <p>Created by <strong>{pin.username}</strong></p>
                            <p className='time'>{moment(pin.createdAt).fromNow()}</p>
                        </div>
                    </Popup>
                }
            </>

        ))
        }
    </Map >
}

export default App;

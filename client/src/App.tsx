import { LocationOn, Star } from '@mui/icons-material';
import moment from 'moment';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import { toast } from 'react-toastify'
import PopUp from './components/PopUp';
import MapPopupForm from './components/MapPopupForm';
import Notify from './components/Notify';
import Auth from './components/Auth';
import './App.css'
import { Outlet } from 'react-router-dom';
import MapContainer from './components/MapContainer';
import { AppStateService } from './states/state_service';

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
export interface FormValue {
    title: string
    disc: string
    rating: number
}
export interface NewPlace {
    lat: number
    lng: number
}
export interface ViewPoint {
    longitude: number
    latitude: number
    zoom: number
    pitch?: number
    bearing?: number
}

function App() {
    const [pins, setPins] = useState(Array<Pin>)
    const [currentPlaceId, setCurrentPlaceId] = useState<string>("")
    const [newPlace, setNewPlace] = useState<NewPlace>({ lat: 0, lng: 0 })
    const [appState, setAppState] = useState(AppStateService.getLatest())
    //
    // console.log(`====AppState: ${JSON.stringify(appState, null, 4)}`)

    const currentUser = appState.user.username



    const [form, setForm] = useState<FormValue>({
        title: "",
        disc: "",
        rating: 0
    })

    const [viewPoint, setViewPoint] = useState<ViewPoint>({
        longitude: -100,
        latitude: 40,
        zoom: 5
    })

    //
    // subscribe to AppStateService
    //
    useEffect(() => {
        let subscription = AppStateService.$state.subscribe((latestState) => {
            setAppState(latestState)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])
    //
    // fetch API
    //
    useEffect(() => {
        const getPins = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/pins")
                setPins(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getPins()
    }, [])

    //
    // Event handlers
    //
    const handleMarkerclick = (id: string, lat: number, long: number) => {
        setCurrentPlaceId(id)
        setViewPoint({ ...viewPoint, latitude: lat, longitude: long })
    }

    const handleAddClick = (e: any) => {
        if (currentUser) {
            const { lng, lat } = e.lngLat as any;
            setNewPlace({
                lat, lng
            })
            // clear the pre pin popup
            setCurrentPlaceId("")
        } else {
            toast.error(`Please Login`)
        }
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

        if (newPin.title.length > 0 && newPin.disc.length > 0 && newPin.rating > 0) {
            try {
                const res = await axios.post('http://localhost:3001/api/pins', newPin)

                if (res.data) {
                    toast.success('Add pin successfully')
                } else {
                    toast.error(`Eorr, try again`)
                }
                setPins([...pins, res.data])
                setNewPlace({ lat: 0, lng: 0 })
                setForm({
                    title: "",
                    disc: "",
                    rating: 0
                })

            } catch (err) {
                console.log(err)
            }
        } else {
            toast.error(`Sorry, please fill all the fields!`)
        }

    }

    return (
        <>
            <MapContainer
                {...viewPoint}
                onDblClick={handleAddClick}
                viewPoint={viewPoint}
                setViewPoint={setViewPoint}
            >

                {/* Login&Register====================================== */}
                <Auth currentUser={currentUser} />

                {/* Pins ====================================== */}
                {pins.map((pin) => (
                    <div key={pin._id}>
                        <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom"
                        >
                            {currentUser && currentUser === pin.username ?
                                <LocationOn
                                    style={{
                                        fontSize: viewPoint.zoom * 8,
                                        color: 'tomato',
                                        cursor: 'pointer'
                                    }}

                                    onClick={() => handleMarkerclick(pin._id, pin.lat, pin.long)}
                                />
                                : <LocationOn
                                    style={{
                                        fontSize: viewPoint.zoom * 8,
                                        color: "blue",
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleMarkerclick(pin._id, pin.lat, pin.long)}
                                />
                            }

                        </Marker>


                        {pin._id === currentPlaceId &&
                            < PopUp
                                longitude={pin.long}
                                latitude={pin.lat}
                                onClose={() => setCurrentPlaceId("")}
                            >
                                <div className='popup'>
                                    <label>Place</label>
                                    <p>{pin.title}</p>
                                    <label>Review</label>
                                    <p>{pin.disc}</p>
                                    <label>Rating</label>
                                    <div className='stars'>
                                        {Array(pin.rating).fill(<Star />)}
                                    </div>
                                    <label>Information</label>
                                    <p>Created by <strong>{pin.username}</strong></p>
                                    <p className='time'>{moment(new Date(pin.createdAt)).fromNow()}</p>
                                </div>
                            </PopUp>
                        }
                    </div>
                ))
                }

                {/* Add new pin ====================================== */}
                {currentUser && newPlace && <MapPopupForm newPlace={newPlace} setNewPlace={setNewPlace} form={form} setForm={setForm} handleSubmit={handleSubmit} />}

                {/* Notification ====================================== */}
                <Notify />
            </MapContainer>
            <Outlet />
        </>)
}

export default App;

import { Dispatch, ReactNode } from 'react';
import Map, { Marker } from 'react-map-gl';

interface Props {
    children: ReactNode
    viewPoint: any
    setViewPoint: Dispatch<React.SetStateAction<any>>
    onDblClick: (e: any) => void
    other?: any
}
const MapContainer = ({ other, children, viewPoint, setViewPoint, onDblClick }: Props) => {

    return (
        <Map
            {...viewPoint}
            style={{ width: '100vw', height: '100vh' }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            onMove={nextviewpoint => setViewPoint(nextviewpoint)}
            onDblClick={onDblClick}
            {...other}
        >
            {children}
        </Map >

    )
}

export default MapContainer;

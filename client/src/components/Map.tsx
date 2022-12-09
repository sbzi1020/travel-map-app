import { Dispatch, ReactNode } from 'react';
import Map, { Marker } from 'react-map-gl';

interface Props {
    children: ReactNode
    viewPoint: any
    setViewPoint: ({ }) => Dispatch<any>
    onDblClick: () => void
}
const MapComponent = ({ children, viewPoint, setViewPoint, onDblClick }: Props) => {

    return (
        <Map
            {...viewPoint}
            style={{ width: '100vw', height: '90vh' }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            onMove={nextviewpoint => setViewPoint(nextviewpoint)}
            onDblClick={onDblClick}
        >
            {children}
        </Map >

    )
}

export default MapComponent;

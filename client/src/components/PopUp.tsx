import React, { ReactNode } from 'react'
import { Popup } from 'react-map-gl'

interface Props {
    key?: number
    longitude: number
    latitude: number
    children: ReactNode
    onClose?: () => void
}
const PopUp = ({ children, onClose, key, longitude, latitude }: Props) => {
    return (
        < Popup
            key={key}
            longitude={longitude}
            latitude={latitude}
            anchor="left"
            closeButton={true}
            closeOnClick={false}
            onClose={onClose}
        >
            {children}
        </Popup>
    )
}

export default React.memo(PopUp)

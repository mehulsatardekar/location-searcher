import React from 'react'
import { MapDataType } from '../../types';
import { MapContainer, Marker, Popup, TileLayer, Polygon } from 'react-leaflet'

type MapType = {
    mapdata: MapDataType[] | undefined;
}
const Map = ({ mapdata }: MapType) => {

    return (
        <div className='map'>
            {
                mapdata && <MapContainer center={[Number(mapdata![0]?.lat), Number(mapdata![0]?.lon)]} zoom={13} scrollWheelZoom={true}
                    key={`${Number(mapdata![0]?.lat)} ${Number(mapdata![0]?.lon)}`}
                    bounds={mapdata && mapdata![0].geojson.coordinates.map((row: any[]) => row.map(e => [e[1], e[0]]))}
                    boundsOptions={{ padding: [1, 1] }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polygon positions={mapdata && mapdata![0].geojson.coordinates.map((row: any[]) => row.map(e => [e[1], e[0]]))} />

                    <Marker position={[Number(mapdata![0]?.lat), Number(mapdata![0]?.lon)]}>
                        <Popup>
                            <p>Population : </p>
                        </Popup>
                    </Marker>
                </MapContainer>
            }
        </div>
    )
}

export { Map }
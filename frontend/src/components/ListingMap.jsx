import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"


mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

const ListingMap = ({ coordinates, title, location })=>{
    const mapContainerRef = useRef(null);

    useEffect(()=>{
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: coordinates,
            zoom: 12,
        });

        new mapboxgl.Marker({ color:"red" })
        .setLngLat(coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h6>${title}</h6><p>${location}</p>`
            )
        )
        .addTo(map);

        return ()=> map.remove();
    },[coordinates, title, location]);

    return(
        <div
            ref={mapContainerRef}
            style={{ height: "350px", width:"100%", borderRadius:"12px"}}
        />
    )
}

export default ListingMap;
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import image from '../img/home_wallpaper_02.jpg'

export const Maps = () => {

    const Thatmap = () => {
        let MainObj = [-12.804936763990627, 28.240294429780192]
        const position = { lat: MainObj[0], lng: MainObj[1] };

        return (
            <APIProvider apiKey={"AIzaSyApUNCa_x6MQAAWGCBGaSC3n5GTvdVk2Us"}>
                <Map style={{ height:'100%'}}  center={position} zoom={15}>
                    <Marker position={position} />
                </Map>
            </APIProvider>
        );
    }


    return (
        <>
        <div style={{background: `url(${image}) no-repeat`, backgroundSize: 'cover', height:'100vh', paddingTop:'100px'}}>
            <div className=" h-100 p-3">
                <Thatmap />
            </div>
        </div>
        </>
    )
}

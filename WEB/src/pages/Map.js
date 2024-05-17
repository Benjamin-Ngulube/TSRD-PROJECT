import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import image from '../img/home_wallpaper_02.jpg'
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import axios from 'axios';

export const Maps = () => {
    const [val, setVAl] = useState(false)
    const [loader, setLoader] = useState(true)
    const [MainObj, setMainObj] = useState([-12.804936763990627, 28.240294429780192])

    let params = useParams()
    useEffect(() => {
        if(params.id){
            axios.post("http://192.168.7.183:8000/location", {"location_id": 6})
            .then((res) => {
                if(res.data != []){
                    let maindata = res.data
                    setMainObj([maindata.latitude, maindata.longitude])
                }
            })
            .finally(()=>{
                setLoader(false)
            })
        } else {
            setLoader(false)
        }
    },[])




    const Thatmap = () => {

        const position = { lat: MainObj[0], lng: MainObj[1] };

        return (
            <APIProvider apiKey={"AIzaSyApUNCa_x6MQAAWGCBGaSC3n5GTvdVk2Us"}>
                <Map style={{ height: '100%' }} center={position} defaultZoom={15}>
                    <Marker position={position} />
                </Map>
            </APIProvider>
        );
    }

    return (
        <>
            <div style={{ background: `url(${image}) no-repeat`, backgroundSize: 'cover', height: '100vh', paddingTop: '100px' }}>
                <div className=" h-100 p-3">
                    {loader ?
                        <>
                        <div className='text-center mt-5'>
                            <InfinitySpin
                                visible={true}
                                width="200"
                                color="#fff"
                                ariaLabel="infinity-spin-loading"
                            />
                        </div>
                        </>   
                        :
                        <Thatmap />
                         
            }
                </div>
            </div>
        </>
    )
}

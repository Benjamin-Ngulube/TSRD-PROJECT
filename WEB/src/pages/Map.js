import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import image from '../img/home_wallpaper_02.jpg'
import { useParams, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import axios from 'axios';
import { MyContextCont } from '../functions/Context';

export const Maps = () => {
    const [val, setVAl] = useState(false)
    const [loader, setLoader] = useState(true)
    const {MainObj, setMainObj} = useContext(MyContextCont)

    let params = useParams()
    useEffect(() => {
        if(params.id){
            axios.get(`${process.env.REACT_APP_LOCAL}/location/${params.id}`)
            .then( async (res) => {
                if(res.data != []){
                    let maindata = await res.data 
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
            <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
                <Map style={{ height: '100%' }} center={position} defaultZoom={15}>
                    <Marker position={position} />
                </Map>
            </APIProvider>
        );
    }

    return (
        <>
            <div style={{ backgroundColor:'#ddd', height: '100vh', padding:'120px 50px 10px 50px' }}>
                <div className=" h-100 shadow rounded" style={{overflow:'hidden'}}>
                    {loader ?
                        <>
                        <div className='text-center mt-5 '>
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

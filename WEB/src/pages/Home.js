import image from '../img/home__wallpaper.jpg'
export const Home = () => {
    return (
        <>
            <div style={{background: `url(${image}) no-repeat`, backgroundSize: 'cover', height:'100vh'}} className="p-2">
                <div  className='d-flex justify-content-center flex-column h-100'>
                    <div className='text-white text-center'>
                        <h2>Intelligent DTSRA Portal</h2>
                        <div className='justify-content-center d-flex'>
                            <div className=' text-black p-5 fw-bold'  style={{ width: '40%', marginTop:'10px', backgroundColor:'rgba(255,255,255,0.9)' }}>
                                <p>
                                    An intelligent system that utilizes AI, GPS, and sensor technology to enhance road safety for public transportation in Zambia.
                                </p>
                                <p>
                                    A Safer Zambia, Is a Better Zambia.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
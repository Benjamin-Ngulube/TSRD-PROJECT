import { useEffect, useState } from 'react'
import './Report.css'
import { get_Data } from '../functions/Api'
import { InfinitySpin } from 'react-loader-spinner'
import image from '../img/wallpaper.jpg'



export const Reports = () => {
    const [datastate, setDatastate] = useState(true)
    useEffect(() => {
        get_Data()

    }, [])

    const RecordData = () => {
        return (
            <>
                <tbody>
                    <tr>
                        <td>data</td>
                        <td>data</td>
                        <td>data</td>
                        <td>data</td>
                        <td>data</td>
                        <td>data</td>
                        <td>data</td>
                    </tr>
                    <tr>
                        <td>data</td>
                        <td>data</td>
                        <td>data</td>
                        <td>data</td>
                        <td>data</td>
                        <td>data</td>
                        <td>data</td>
                    </tr>
                </tbody>
            </>
        )
    }
    return (
        <>
            <div style={{background: `url(${image}) no-repeat`, backgroundSize: 'cover', minHeight:'100vh', paddingTop:'100px'}} className="p-2">
                <div className=''>
                    <div style={{ marginTop: '120px' }} className='text-white text-center'>
                        <div>
                            <table style={{ marginInline: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th>Violation ID</th>
                                        <th>Violeter ID</th>
                                        <th>Vehicle ID</th>
                                        <th>Location ID</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Speed Limit</th>
                                    </tr>
                                </thead>
                                {datastate ?
                                    <RecordData />
                                    :
                                    <td colSpan={7} className='text-center w-100 '>
                                        <InfinitySpin
                                            visible={true}
                                            width="200"
                                            color="#fff"
                                            ariaLabel="infinity-spin-loading"
                                        />
                                    </td>
                                }
                            </table>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
import { useEffect, useState } from 'react'
import './Report.css'
import axios from "axios"
import { InfinitySpin } from 'react-loader-spinner'
import image from '../img/wallpaper.jpg'
import { Link, NavLink } from "react-router-dom"



export const Reports = () => {
    const [loader, setLoader] = useState(true)
    const [datastate, setDatastate] = useState(true)
    const [recievedData, setRecievedData] = useState([{}])

    const GetDAta = () => {
        setLoader(true)
        axios.get(`${process.env.REACT_APP_LOCAL}/violations`)
            .then((res) => {
                if (res.data != []) {
                    let finalDAta = res.data
                    setDatastate(finalDAta)
                        setLoader(false)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        GetDAta()
    }, [])

    const RecordData = () => {
        return (
            <>
                <tbody>
                    {
                        datastate.map((e) => {
                            return (<>
                                <tr>
                                    <td>{e.violation_id}</td>
                                    <td>{e.violation_type}</td>
                                    <td>{e.vehicle_id}</td>
                                    <td>{e.location_id} <Link to={`/Map/${e.location_id }`}>Show</Link></td>
                                    <td>{`${new Date(e.timestamp).getMonth()}-${new Date(e.timestamp).getDate()}-${new Date(e.timestamp).getFullYear()}`}</td>
                                    <td>{`${new Date(e.timestamp).getHours()}:${new Date(e.timestamp).getMinutes()}`}</td>
                                    <td>{e.speed_limit}</td>
                                </tr>
                            </>)
                        })
                    }
                </tbody>
            </>
        )
    }
    return (
        <>
            <div style={{ background: `url(${image}) no-repeat`, backgroundSize: 'cover', minHeight: '100vh', paddingTop: '100px' }} className="p-2">
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
                                {!loader ?
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

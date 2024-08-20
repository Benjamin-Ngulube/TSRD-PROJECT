import { useContext, useEffect, useState } from 'react'
import './Report.css'
import axios from "axios"
import { InfinitySpin } from 'react-loader-spinner'
import image from '../img/wallpaper.jpg'
import { Link, NavLink } from "react-router-dom"
import { io } from 'socket.io-client'
import { MyContextCont } from '../functions/Context'



export const Reports = () => {
    const [loader, setLoader] = useState(false)
    const {datastate, setDatastate} = useContext(MyContextCont)
    const [recievedData, setRecievedData] = useState([{}])

    const socket = io(process.env.REACT_APP_LOCAL)
    
    socket.on('new_violation',(data)=>{
        if(data){
            console.log('data retrieved',data)
            setDatastate(data)
            console.log(datastate)

        }   else {
            console.log('nope')
        }
    })

    

    // const GetDAta = () => {
    //     setLoader(true)
    //     axios.get(`${process.env.REACT_APP_LOCAL}/violations`)
    //         .then((res) => {
    //             if (res.data != []) {
    //                 let finalDAta = res.data
    //                 setDatastate(finalDAta)
    //                     setLoader(false)
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    useEffect(() => {
        // GetDAta()
    }, [])

    const RecordData = () => {
        return (
            <>
                <tbody>
                    {
                        datastate ? 
                        <>
                        {datastate.map((e) => {
                            return (<>
                                <tr>
                                    <td>{e.violation_id}</td>
                                    <td>{e.violation_type}</td>
                                    <td>{e.vehicle_id}</td>
                                    <td>{e.location_id} <Link to={`/Map/${e.location_id }`}>Show</Link></td>
                                    {/* <td>{`${new Date(e.timestamp).getMonth()}-${new Date(e.timestamp).getDate()}-${new Date(e.timestamp).getFullYear()}`}</td> */}
                                    <td>{`${new Date(e.timestamp * 1000).getDate()}-${new Date(e.timestamp * 1000).getMonth(  )}-${new Date(e.timestamp * 1000).getFullYear()}`}</td>
                                    <td>{`${new Date(e.timestamp * 1000).getHours()}:${new Date(e.timestamp * 1000).getMinutes()}`}</td>
                                    <td>{e.speed_limit}</td>
                                </tr>
                            </>)
                        })}
                        </>
                        :
                        ''
                    }
                </tbody>
            </>
        )
    }
    return (
        <>
            <div style={{ minHeight: '100vh', paddingTop: '100px', backgroundColor:'#ddd' }} className="p-2">
                <div className=''>
                    <div style={{ marginTop: '120px' }} className=' text-center'>
                        <div >
                            <table  className='shadow-sm' style={{ marginInline: 'auto' }}>
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

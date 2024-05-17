import axios from "axios"

export const get_Data = (data) => {

    axios.get("http://192.168.1.183:8000/violations")
    .then((res) => {
        console.log(res.data)
       
    })
    .catch((err)=>{
        console.log(err)
    })
}
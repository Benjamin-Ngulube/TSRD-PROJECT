import axios from "axios"

export const get_Data = () => {

    axios.get("https://httpbin.org/get")
    .then((res) => {
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
}
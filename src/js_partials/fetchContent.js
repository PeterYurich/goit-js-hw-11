import { makeCurrentUrlRequest } from "./getContent"
import axios from 'axios'




export default async () => { 
    const url = makeCurrentUrlRequest()
    console.log(url)
    return await axios.get(url).data }
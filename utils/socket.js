import { io } from "socket.io-client";
import { FE_DOMAIN_URL } from "./constants";



export const  createSocketConnections=()=>{

        return io(FE_DOMAIN_URL)

}
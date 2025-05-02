import axios from 'axios'
import React, { useEffect } from 'react'
import { FE_DOMAIN_URL } from '../../utils/constants'
import { setUserConnections} from '../../utils/connectionSlice'
import { useDispatch, useSelector } from 'react-redux'
import ConnectionCard from './ConnectionCard'

const Connections=()=>{

  const connections=useSelector(store=>store.connections);
  const dispatch=useDispatch();
  
  const fetchConnections=async()=>{
    try{
      const res=await axios.get(FE_DOMAIN_URL+"/user/connections",
        {
          withCredentials:true,
        }
      )
      console.log(res?.data?.data)
      dispatch(setUserConnections(res?.data?.data));
      
  }
  catch(err){
    console.log(err.message)
  }
}


  useEffect(()=>{
    fetchConnections();

  },[])
  
   

  if(connections.length==0){
    return <p className='text-center font-bold text-3xl my-10'>No Request Found !</p>
  
}
  return (
    <div className='flex flex-wrap gap-3 justify-center my-10'>
       {connections && connections.map((card)=><ConnectionCard key={card?._id} user={{firstName:card?.firstName,lastName:card?.lastName,age:card?.age,photoUrl:card?.photoUrl,skills:card?.skills,about:card?.about}} />)} 
    </div>
  )
}

export default Connections;

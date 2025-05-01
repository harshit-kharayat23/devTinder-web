import axios from 'axios'
import React, { useEffect } from 'react'
import { FE_DOMAIN_URL } from '../../utils/constants'
import { setUserConnections} from '../../utils/connectionSlice'
import { useDispatch, useSelector } from 'react-redux'
import ConnectionCard from './ConnectionCard'

const Connections=()=>{

  const connections=useSelector(store=>store.connections.data);
  const dispatch=useDispatch();
  
  const fetchConnections=async()=>{
    try{
      const res=await axios.get(FE_DOMAIN_URL+"/user/connections",
        {
          withCredentials:true,
        }
      )
      dispatch(setUserConnections(res.data));
      
  }
  catch(err){
    console.log(err.message)
  }
}


  useEffect(()=>{
    fetchConnections();

  },[])

  return (
    <div className='flex flex-wrap gap-3 justify-center my-10'>
       {connections && connections.map((card)=><ConnectionCard key={card._id} user={{firstName:card.firstName,lastName:card.lastName,age:card.age,photoUrl:card.photoUrl,skills:card.skills,about:card.about}} />)} 
    </div>
  )
}

export default Connections;

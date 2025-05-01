import axios from 'axios'
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRequests} from '../../utils/requestSlice'
import RequestCard from './RequestCard'
import { FE_DOMAIN_URL } from '../../utils/constants'

const Requests = () => {
  const requests = useSelector(store => store.requests)
  const dispatch = useDispatch()
  

  const fetchRequest = async () => {
    try {
      const res = await axios.get(FE_DOMAIN_URL + "/user/requests/recieved", { withCredentials: true })
      dispatch(getRequests(res?.data?.data))
      
      
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchRequest()
  }, [])

  if(requests.length==0){
    return <p className='text-center font-bold text-3xl my-10'>No Request Found !</p>
  }
  return (
    <div className='flex flex-wrap gap-3 justify-center my-10'>
      {requests && requests?.map((req) => (
        <RequestCard
          key={req._id}
          user={{
            _id:req?._id,
            firstName: req?.fromUserId?.firstName,
            lastName: req?.fromUserId?.lastName,
            about: req?.fromUserId?.about,
            photoUrl: req?.fromUserId?.photoUrl,
            age: req?.fromUserId?.age,
            gender: req?.fromUserId?.gender,
            skills: req?.fromUserId?.skills
          }}
        />
      ))}
    </div>
  )
}

export default Requests

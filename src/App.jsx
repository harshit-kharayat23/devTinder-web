import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Components/Body'
import Login from './Components/Login'
import Profile from './Components/Profile'
import { Provider } from 'react-redux'
import appStore from '../utils/appStore'
import Feed from './Components/Feed'
import Connections from './Components/Connections'
import Requests from './Components/Requests'
import Premium from './Components/Premium'
import Chat from './Components/Chat'


function App() {


  return (
    
     <div>
     <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
        <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Body/>} >
              <Route path="/feed" element={<Feed/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/connections" element={<Connections/>}/>
              <Route path="/requests" element={<Requests/>}/>
               <Route path="/premium" element={<Premium/>}/>
               <Route path="/chat/:targetUserId" element={<Chat/>}/>

            </Route>

        </Routes>
      </BrowserRouter>
      </Provider>

     </div>
  )
}

export default App

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


function App() {


  return (
    
     <div>
     <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
            <Route path="/" element={<Body/>} >
              <Route path="/feed" element={<Feed/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/connections" element={<Connections/>}/>
              <Route path="/requests" element={<Requests/>}/>
               <Route path="/premium" element={<Premium/>}/>

            </Route>

        </Routes>
      </BrowserRouter>
      </Provider>

     </div>
  )
}

export default App

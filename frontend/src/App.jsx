import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signin  from "./Pages/Sigin"
import  Signup  from "./Pages/Signup"
import  Dashboard  from "./Pages/Dashboard"
import Send  from "./Pages/Send"
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='signin' element={<Signin/>}></Route>
      <Route path='signup' element={<Signup/>}></Route>
      <Route path='/send' element={<Send/>}></Route>
      <Route path='dashboard' element={<Dashboard/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

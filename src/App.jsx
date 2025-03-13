
// import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import NewWeather from "./features/Components/NewWeather";
import Weather from "./features/Components/Weather";


import { counterContext } from "./features/NewComponents/context";



function App() {
   
  

  return (
    <div className="App">
      <counterContext.Provider>
     
          {/* <NewWeather/> */}
          <Weather/>

      </counterContext.Provider>
      </div>
  )
}
export default App   

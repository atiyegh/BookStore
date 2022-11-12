//Hooks and Custom Components
import React,{Suspense} from 'react'
import { Routes, Route } from 'react-router-dom'

//Styles
import 'antd/dist/antd.css';


//Lazy loading 
const HomePage=React.lazy(()=>import('./Pages/Home'));
const DetailedPage=React.lazy(()=>import('./Pages/DetailedPage'));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path=':id' element={<DetailedPage/>}/>
      </Routes>
    </Suspense>
        
  );
}

export default App;

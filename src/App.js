import React,{Suspense} from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import 'antd/dist/antd.css';
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

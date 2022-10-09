
import './App.css';
import { Home,MyProfil,ListedItem } from '../src/Page';
import{ Navbar} from "./Compoments/Navbar";
import { BrowserRouter,Route,Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/MyProfil" element={<MyProfil />} />      
        <Route path="/" element={< Home/>} />
        <Route path="/ListedItem" element={<ListedItem/>} />
        <Route path="*" element={<div>Bulunamadı</div>}/>
      </Routes>

     </BrowserRouter>
     
    </div>
  );
}

export default App;

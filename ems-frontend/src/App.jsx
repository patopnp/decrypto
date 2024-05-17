import HeaderComponent from './components/HeaderComponent'
import ListComitentesComponent from './components/ListComitentesComponent'
import ComitentesComponent from './components/ComitentesComponent'
import ListMercadosComponent from './components/ListMercadosComponent'
import MercadosComponent from './components/MercadosComponent'
import ListPaisesComponent from './components/ListPaisesComponent'
import PaisesComponent from './components/PaisesComponent'
import ListStatsComponent from './components/ListStatsComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
        <Routes>
          {/* // http://localhost:3000 */}
          <Route path='/' element = {<ListComitentesComponent/>}></Route>
          {/* // http://localhost:3000/comitentes */}
          <Route path='/comitentes' element = {<ListComitentesComponent/>}></Route>
          {/* // http://localhost:3000/add-comitente */}
          <Route path='/add-comitente' element = {<ComitentesComponent/>}></Route>
          {/* // http://localhost:3000/edit-comitente/1 */}
          <Route path='/edit-comitente/:id' element = {<ComitentesComponent/>}></Route>
          {/* // http://localhost:3000/mercados */}
          <Route path='/mercados' element = {<ListMercadosComponent/>}></Route>
          {/* // http://localhost:3000/edit-comitente/1 */}
          <Route path='/edit-mercado/:id' element = {<MercadosComponent/>}></Route>
          {/* // http://localhost:3000/add-mercado */}
          <Route path='/add-mercado' element = {<MercadosComponent/>}></Route>
          {/* // http://localhost:3000/mercados */}
          <Route path='/paises' element = {<ListPaisesComponent/>}></Route>
          {/* // http://localhost:3000/edit-paises/1 */}
          <Route path='/edit-pais/:id' element = {<PaisesComponent/>}></Route>
          {/* // http://localhost:3000/add-pais */}
          <Route path='/add-pais' element = {<PaisesComponent/>}></Route>
          {/* // http://localhost:3000/stats */}
          <Route path='/stats' element = {<ListStatsComponent/>}></Route>
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App

import React, {useEffect, useState} from 'react'
import { deleteComitente, listComitentes, listMercados } from '../services/EntidadesService'
import { useNavigate } from 'react-router-dom'

const ListComitentesComponent = () => {

   const [comitentes, setComitentes] = useState([])
   const [mercados, setMercados] = useState([])

    const navigator = useNavigate();

   //Inicializo las variables comitentes y mercados con los registros de la base de datos
   useEffect(() => {
        getAllComitentes()
        getAllMercados()
   }, [])

   function getAllMercados() {
    listMercados().then((response) => {
            setMercados(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function getAllComitentes() {
        listComitentes().then((response) => {
            setComitentes(response.data);
        }).catch(error => {
            console.error(error);
        })
   }

    function getCodigoMercados(mercadosId) {
        let txt = "";

        //Para cada id busco el codigo del mercado al que corresponde
        mercadosId.forEach(codigoMercado);
        
        function codigoMercado(value, index, array) {

            let m = mercados.find(myFunction)

            function myFunction(value2, index, array) {
              return value == value2.id;
            }

          // Muestro el id seguido del codigo de mercado
          txt += m["id"] + ": " + m["codigo"] + ", ";
        }

        return txt.slice(0,-2);
    }

   function addNewComitente(){
        navigator('/add-comitente')
   }

   function updateComitente(id){
        navigator(`/edit-comitente/${id}`)
   }

   //Borro el comitente y actualizo la pagina
   function removeComitente(id){
        deleteComitente(id).then((response) => {
            getAllComitentes();
        }).catch(error => {
            console.error(error);
        })
   }

  return (
    <div className = 'container'>
        <h2 className = "text-center" style = {{marginTop: '10px'}}>Lista de Comitentes</h2>
        <button className = 'btn btn-primary mb-2' onClick = {addNewComitente}>Agregar Comitente</button>
        <table className = 'table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id del comitente</th>
                    <th>Descripcion del comitente</th>
                    <th>Mercados del comitente</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    comitentes.map(comitente => 
                        <tr key={comitente.id}>
                            <td>{comitente.id}</td>
                            <td>{comitente.descripcion}</td>
                            <td>{getCodigoMercados(comitente.mercadosId) }</td>
                            <td>
                                <button className = 'btn btn-info' onClick = {() => updateComitente(comitente.id)}>Modificar</button>
                                <button className = 'btn btn-danger' onClick = {() => removeComitente(comitente.id)}
                                    style = {{marginLeft: '10px'}}
                                >Eliminar</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListComitentesComponent
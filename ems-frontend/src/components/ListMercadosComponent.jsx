import React, {useEffect, useState} from 'react'
import { deleteMercado, listMercados, listPaises, listComitentes } from '../services/EntidadesService'
import { useNavigate } from 'react-router-dom'

const ListMercadosComponent = () => {

   const [mercados, setMercados] = useState([])
   const [comitentes, setComitentes] = useState([])
   const [paises, setPaises] = useState([])

   //Inicializo los errores en validos
   const [errors, setErrors] = useState({
    removeMercado: ''
   })

   const navigator = useNavigate();

   //Inicializo los arreglos de los campos
   useEffect(() => {
        getAllPaises(),
        getAllComitentes(),
        getAllMercados()
   }, [])


   function getAllPaises() {
    listPaises().then((response) => {
            setPaises(response.data);
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

    function getAllMercados() {
        listMercados().then((response) => {
                setMercados(response.data);
            }).catch(error => {
                console.error(error);
            })
        }

   function addNewMercado(){
        navigator('/add-mercado')
   }

   function updateMercado(id){
        navigator(`/edit-mercado/${id}`)
   }

   function removeMercado(id){

        const errorsCopy = {... errors} 

        //Compruebo que el mercado se puede borrar, es decir que no dejo algun comitente sin mercado
        let operacionInvalida = comitentes.some((c) => { 
            return (c.mercadosId[0] == id && c.mercadosId.length == 1); })

        if(operacionInvalida) {
            // Agrego error ya que no se puede borrar campo
            errorsCopy.removeMercado = 'No se puede eliminar mercado con id ' + id + ' porque un comitente lo tiene asignado como unico mercado.'
        }
        else
        {
            errorsCopy.removeMercado = ''

            //Mando la peticion al back-end
            deleteMercado(id).then((response) => {
                getAllMercados();
            }).catch(error => {
                console.error(error);
            })

        }
        
        //Asigno los errores si los hay
        setErrors(errorsCopy);
   }

  return (
        <div className = 'container'>
                {errors.removeMercado && <div class="alert alert-warning" role="alert" style = {{marginTop: '10px'}}>
        {errors.removeMercado}
        </div>}
        <h2 className = "text-center" style = {{marginTop: '10px'}}>Lista de Mercados</h2>
        <button className = 'btn btn-primary mb-2' onClick = {addNewMercado}>Agregar Mercado</button>
        <table className = 'table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id del mercado</th>
                    <th>Codigo del mercado</th>
                    <th>Descripcion del mercado</th>
                    <th>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    mercados.map(mercado => 
                        <tr key={mercado.id}>
                            <td>{mercado.id}</td>
                            <td>{mercado.codigo}</td>
                            <td>{mercado.descripcion}</td>
                            <td>{mercado.pais}</td>
                            <td>
                                <button className = 'btn btn-info' onClick = {() => updateMercado(mercado.id)}>Modificar</button>
                                <button className = 'btn btn-danger' onClick = {() => removeMercado(mercado.id)}
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

export default ListMercadosComponent
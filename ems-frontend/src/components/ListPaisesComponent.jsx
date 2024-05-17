import React, {useEffect, useState} from 'react'
import { deletePais, listMercados, listPaises} from '../services/EntidadesService'
import { useNavigate } from 'react-router-dom'

const ListPaisesComponent = () => {

   const [mercados, setMercados] = useState([])
   const [paises, setPaises] = useState([])

   //Inicializo errores en blanco
   const [errors, setErrors] = useState({
    removePais: ''
   })

   const navigator = useNavigate();

   // Inicializo arreglos con datos del back-end
   useEffect(() => {
        getAllPaises(),
        getAllMercados()
   }, [])


   function getAllPaises() {
    listPaises().then((response) => {
            setPaises(response.data);
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

   function addNewPais(){
        navigator('/add-pais')
   }

   function updatePais(id){
        navigator(`/edit-pais/${id}`)
   }

   function removePais(id){

        const errorsCopy = {... errors} 

        // Obtengo el nombre del pais a partir del id
        const nombrePais = paises.find(p => p.id == id).nombre;

        // Compruebo que el pais se puede borrar, es decir que no dejo algun mercado sin pais
        let operacionInvalida = mercados.some((c) => { 
            return (c.pais ==  nombrePais)})

        if(operacionInvalida) {
            // Agrego el error
            errorsCopy.removePais = 'No se puede eliminar ' + nombrePais + ' porque un mercado lo tiene asignado como pais.'
            console.log("Validacion correcta");
        }
        else
        {
            // Procedo a mandar peticion de eliminacion al backend
            errorsCopy.removePais = ''
            deletePais(id).then((response) => {
                getAllPaises();
            }).catch(error => {
                console.error(error);
            })

        }
        
        // Asigno los errores si los hay
        setErrors(errorsCopy);
   }

  return (
        <div className = 'container'>
                {errors.removePais && <div class="alert alert-warning" role="alert" style = {{marginTop: '10px'}}>
        {errors.removePais}
        </div>}
        <h2 className = "text-center" style = {{marginTop: '10px'}}>Lista de Paises</h2>
        <button className = 'btn btn-primary mb-2' onClick = {addNewPais}>Agregar Pais</button>
        <table className = 'table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id del pais</th>
                    <th>Nombre del pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    paises.map(pais => 
                        <tr key={pais.id}>
                            <td>{pais.id}</td>
                            <td>{pais.nombre}</td>
                            <td>
                                <button className = 'btn btn-info' onClick = {() => updatePais(pais.id)}>Modificar</button>
                                <button className = 'btn btn-danger' onClick = {() => removePais(pais.id)}
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

export default ListPaisesComponent
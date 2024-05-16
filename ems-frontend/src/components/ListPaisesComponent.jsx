import React, {useEffect, useState} from 'react'
import { deletePais, listMercados, listPaises} from '../services/ComitenteService'
import { useNavigate } from 'react-router-dom'

const ListPaisesComponent = () => {

   const [mercados, setMercados] = useState([])
   const [paises, setPaises] = useState([])

   const [errors, setErrors] = useState({
    removePais: ''
   })

   const navigator = useNavigate();

   useEffect(() => {
        getAllPaises()
   }, [])

   useEffect(() => {
        getAllMercados()
    }, [])

   function getAllPaises() {
    listPaises().then((response) => {
            setPaises(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function getNombrePaises(paisesId) {
        let txt = "";

        //Para cada id busco el nombre del pais al que corresponde
        paises.forEach(nombrePais);
        
        function nombrePais(value, index, array) {

            let m = paises.find(buscarCoincidencia)

            function buscarCoincidencia(value2, index, array) {
              return value == value2.id;
            }

          txt += m["id"] + ": " + m["codigo"] + ", ";
        }

        return txt.slice(0,-2);
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

        //Compruebo que el mercado se puede borrar, es decir que no dejo algun mercado sin pais

        const errorsCopy = {... errors} 

        //
        const nombrePais = paises.find(p => p.id == id).nombre;
        console.log(nombrePais);
        console.log(paises);

        let operacionInvalida = mercados.some((c) => { 
            //console.log(c.mercadosId[0] == id);
            return (c.pais ==  nombrePais)})

        console.log(operacionInvalida);

        if(operacionInvalida) {
            errorsCopy.removePais = 'No se puede eliminar ' + nombrePais + ' porque un mercado lo tiene asignado como pais.'
            console.log("Validacion correcta");
        }
        else
        {
            errorsCopy.removePais = ''
            deletePais(id).then((response) => {
                getAllPaises();
            }).catch(error => {
                console.error(error);
            })

        }
        
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
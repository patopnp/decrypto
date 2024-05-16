import React, {useEffect, useState} from 'react'
import { deleteMercado, listMercados, listPaises, listComitentes } from '../services/ComitenteService'
import { useNavigate } from 'react-router-dom'

const ListMercadosComponent = () => {

   const [mercados, setMercados] = useState([])
   const [comitentes, setComitentes] = useState([])
   const [paises, setPaises] = useState([])

   const [errors, setErrors] = useState({
    removeMercado: ''
   })

   const navigator = useNavigate();

   useEffect(() => {
        getAllPaises()
   }, [])

   useEffect(() => {
        getAllMercados()
    }, [])

    useEffect(() => {
        getAllComitentes()
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

   function addNewMercado(){
        navigator('/add-mercado')
   }

   function updateMercado(id){
        navigator(`/edit-mercado/${id}`)
   }

   function removeMercado(id){

        //Compruebo que el mercado se puede borrar, es decir que no dejo algun comitente sin mercado

        const errorsCopy = {... errors} 

        //console.log(comitentes);

        let operacionInvalida = comitentes.some((c) => { 
            //console.log(c.mercadosId[0] == id);
            return (c.mercadosId[0] == id && c.mercadosId.length == 1); })

        console.log(operacionInvalida);

        if(operacionInvalida) {
            errorsCopy.removeMercado = 'No se puede eliminar mercado con id ' + id + ' porque un comitente lo tiene asignado como unico mercado.'
            console.log("Validacion correcta");
        }
        else
        {
            errorsCopy.removeMercado = ''
            deleteMercado(id).then((response) => {
                getAllMercados();
            }).catch(error => {
                console.error(error);
            })

        }
        
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
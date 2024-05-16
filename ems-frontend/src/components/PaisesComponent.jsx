import React, {useState, useEffect} from 'react'
import { createPais, updatePais } from '../services/ComitenteService';
import { getPais } from '../services/ComitenteService';
import { useNavigate, useParams } from 'react-router-dom';
import { listPaises } from '../services/ComitenteService'

const PaisesComponent = () => {

    const [paises, setPaises] = useState([])

    function getAllPaises() {
    listPaises().then((response) => {
            setPaises(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const [nombre, setNombre] = useState('')

    const {id} = useParams();
    const navigator = useNavigate();

    const [errors, setErrors] = useState({
        descripcion: ''
    })


    function handleNombre(e){
        setNombre(e.target.value);
    }

    useEffect(()=> {
        getAllPaises();
        if(id){
            getPais(id).then((response) => {
                setNombre(response.data.nombre)
            }).catch(error => {console.error(error)})
        }

    }, [id])

    function saveOrUpdatePais(e){

        //Previene que se guarden los datos con defaults
        e.preventDefault();
        console.log(nombre);
        //Controlamos que el formulario sea valido
        if (validateForm()) {

            const pais = {id, nombre}
            console.log(nombre);

            if(id){
                updatePais(id, pais).then((response) => {
                    console.log(response.data);
                    navigator('/paises');
                }).catch(error => {console.error(error)})
            }
            else {
                createPais(pais).then((response) => {
                    console.log(response.data);
                    navigator('/paises')
                }).catch(error => {console.error(error)})
            }
        }

    }

    function validateForm(){
        let valid = true;

        //copiamos los errores en errorsCopy
        const errorsCopy = {... errors} 

        //Si el campo nombre no es Argentina o Uruguay agrego error
        if (nombre == 'Argentina' || nombre== 'Uruguay') {
            errorsCopy.nombre = '';
        } else {
            errorsCopy.nombre = 'Los paises validos son Argentina y Uruguay.';
            valid = false;
        }

        //Compruebo que no se haya ingresado previamente
        let paisExiste = paises.some((ePais) => {return ePais.nombre == nombre})
        console.log(paisExiste);
        if(paisExiste) {
            errorsCopy.nombre = 'El pais ' + nombre + ' ya existe.';
            valid = false;
        }
        else{
            errorsCopy.pais = ''
        }

        setErrors(errorsCopy);

        return valid;
    }

    

    function pageTitle(){
        if(id) {
            return <h2 className = 'text-center'>Modificar Pais</h2>
        }
        else {
            return <h2 className = 'text-center'>Agregar Pais</h2>
        }
    }

    function etiquetaBoton(){
        if(id) {
            return "Editar";
        }
        else{
            return "Agregar"
        }
    }

  return (
    <div className = 'container'>
        <br/><br/>
        <div className = 'row'>
            <div className = 'card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className = 'card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className = 'form-label'>Nombre:</label>
                            <input
                                type = 'text'
                                placeholder = 'Ingrese un nombre'
                                name = 'nombre'
                                value = {nombre}
                                className = {`form-control ${ errors.nombre ? 'is-invalid' : ''}`}
                                onChange = {handleNombre}
                            >
                            </input>
                            { errors.nombre && <div className = 'invalid-feedback'> {errors.nombre} </div> }
                            
                        </div>
                        <button className = 'btn btn-success' onClick={saveOrUpdatePais}>
                            {etiquetaBoton()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaisesComponent
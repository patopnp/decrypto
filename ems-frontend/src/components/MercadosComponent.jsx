import React, {useState, useEffect} from 'react'
import { createMercado, updateMercado } from '../services/ComitenteService';
import { getMercado } from '../services/ComitenteService';
import { useNavigate, useParams } from 'react-router-dom';
import { listPaises } from '../services/ComitenteService'

const MercadosComponent = () => {

    const [paises, setPaises] = useState([])

    function getAllPaises() {
    listPaises().then((response) => {
            setPaises(response.data);
            setPais(response.data[0].nombre)
        }).catch(error => {
            console.error(error);
        })
    }

    const [codigo, setCodigo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [pais, setPais] = useState('')

    const {id} = useParams();
    const navigator = useNavigate();

    const [errors, setErrors] = useState({
        descripcion: ''
    })

    function handleDescripcion(e){
        setDescripcion(e.target.value);
    }

    function handleCodigo(e){
        setCodigo(e.target.value);
    }

    function handlePais(e){
        setPais(e.target.value);
    }

    useEffect(()=> {
        getAllPaises();
        if(id){
            getMercado(id).then((response) => {
                setCodigo(response.data.codigo),
                setDescripcion(response.data.descripcion),
                setPais(response.data.pais)
            }).catch(error => {console.error(error)})
        }

    }, [id])

    function saveOrUpdateMercado(e){

        //Previene que se guarden los datos con defaults
        e.preventDefault();

        //Controlamos que el formulario sea valido
        if (validateForm()) {

            const mercado = {codigo, descripcion, pais}
            console.log(mercado);

            if(id){
                updateMercado(id, mercado).then((response) => {
                    console.log(response.data);
                    navigator('/mercados');
                }).catch(error => {console.error(error)})
            }
            else {
                createMercado(mercado).then((response) => {
                    console.log(response.data);
                    navigator('/mercados')
                }).catch(error => {console.error(error)})
            }
        }

    }

    function validateForm(){
        let valid = true;

        //copiamos los errores en errorsCopy
        const errorsCopy = {... errors} 

        //Si el campo descripcion esta vacio agrego error
        if (codigo.trim()) {
            errorsCopy.codigo = '';
        } else {
            errorsCopy.codigo = 'Descripcion es un campo requerido.';
            valid = false;
        }

        //Si el campo descripcion esta vacio agrego error
        if (descripcion.trim()) {
            errorsCopy.descripcion = '';
        } else {
            errorsCopy.descripcion = 'Descripcion es un campo requerido.';
            valid = false;
        }

        //Compruebo que se ingreso Argentina o Uruguay
        if(pais.trim()) {
            errorsCopy.pais = ''
        }
        else{
            errorsCopy.pais = 'Agregue un pais antes de ingresar un mercado';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    

    function pageTitle(){
        if(id) {
            return <h2 className = 'text-center'>Modificar Mercado</h2>
        }
        else {
            return <h2 className = 'text-center'>Agregar Mercado</h2>
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
                            <label className = 'form-label'>Codigo:</label>
                            <input
                                type = 'text'
                                placeholder = 'Ingrese un codigo'
                                name = 'codigo'
                                value = {codigo}
                                className = {`form-control ${ errors.codigo ? 'is-invalid' : ''}`}
                                onChange = {handleCodigo}
                            >
                            </input>
                            { errors.codigo && <div className = 'invalid-feedback'> {errors.codigo} </div> }
                            <label className = 'form-label'>Descripcion:</label>
                            <input
                                type = 'text'
                                placeholder = 'Ingrese una descripcion'
                                name = 'descripcion'
                                value = {descripcion}
                                className = {`form-control ${ errors.descripcion ? 'is-invalid' : ''}`}
                                onChange = {handleDescripcion}
                            >
                            </input>
                            { errors.descripcion && <div className = 'invalid-feedback'> {errors.descripcion} </div> }
                            <label className = 'form-label'>Pais:</label>
                            <select className="form-select" 
                                onChange = {handlePais}
                                value= {pais}
                                >
                                {
                                    paises.map(pais => (
                                        <option value={pais.nombre}>{pais.nombre}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button className = 'btn btn-success' onClick={saveOrUpdateMercado}>
                            {etiquetaBoton()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MercadosComponent
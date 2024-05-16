import React, {useState, useEffect} from 'react'
import { createComitente, updateComitente } from '../services/ComitenteService';
import { getComitente } from '../services/ComitenteService';
import { useNavigate, useParams } from 'react-router-dom';
import { listMercados } from '../services/ComitenteService'

const ComitentesComponent = () => {

    const [mercados, setMercados] = useState([])

    useEffect(() => {
        getAllMercados()
    }, [])

   function getAllMercados() {
    listMercados().then((response) => {
            setMercados(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const [descripcion, setDescripcion] = useState('')
    const [mercadosIdString, setMercadosIdString] = useState('')

    const {id} = useParams();
    const navigator = useNavigate();

    const [errors, setErrors] = useState({
        descripcion: '',
        mercadosIdString: ''
    })

    function handleDescripcion(e){
        setDescripcion(e.target.value);
    }

    function handleMercadosId(e){

        setMercadosIdString(e.target.value);
    }

    function handleMercadoId(e){

        //pasar un array
        if(mercadosIdString == '') {
            setMercadosIdString(e.target.value);
        }
        else{
            setMercadosIdString(mercadosIdString + ", " + e.target.value);
        }
    }

    useEffect(()=> {

        if(id){
            getComitente(id).then((response) => {
                setDescripcion(response.data.descripcion),
                setMercadosIdString(response.data.mercadosId.join(", "))
            }).catch(error => {console.error(error)})
        }

    }, [id])

    function saveOrUpdateComitente(e){

        //Previene que se guarden los datos con defaults
        e.preventDefault();

        //Controlamos que el formulario sea valido
        if (validateForm()) {

            const mercadosId = mercadosIdString.split(", ").map(Number);
            const comitente = {descripcion, mercadosId}
            console.log(comitente);

            if(id){
                updateComitente(id, comitente).then((response) => {
                    console.log(response.data);
                    navigator('/comitentes');
                }).catch(error => {console.error(error)})
            }
            else {
                createComitente(comitente).then((response) => {
                    console.log(response.data);
                    navigator('/comitentes')
                }).catch(error => {console.error(error)})
            }
        }

    }

    function validateForm(){
        let valid = true;

        //copiamos los errores en errorsCopy
        const errorsCopy = {... errors} 

        //Si el campo descripcion esta vacio agrego error
        if (descripcion.trim()) {
            errorsCopy.descripcion = '';
        } else {
            errorsCopy.descripcion = 'Descripcion es un campo requerido';
            valid = false;
        }

        const mercadosIds = mercadosIdString.split(", ");

        const mercadosIdPermitidosString = mercados.flatMap(m => m.id.toString());
        
        errorsCopy.mercadosIdString = '';

        mercadosIds.forEach(comprobarIdExista);

        function comprobarIdExista(mids, index, array) {
            if (mercadosIdPermitidosString.includes(mids) == false) {
                errorsCopy.mercadosIdString = 'Ids invalidos';
                valid = false;
            }
        }


        setErrors(errorsCopy);

        return valid;
    }




    function pageTitle(){
        if(id) {
            return <h2 className = 'text-center'>Modificar Comitente</h2>
        }
        else {
            return <h2 className = 'text-center'>Agregar Comitente</h2>
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
                            <label className = 'form-label'>Mercado:</label>
                            <input
                                type = 'text'
                                placeholder = 'Id de mercado'
                                name = 'mercadosIdString'
                                value = {mercadosIdString}
                                className = {`form-control ${ errors.mercadosIdString ? 'is-invalid' : ''}`}
                                onChange = {handleMercadosId}
                            >
                            </input>
                            { errors.mercadosIdString && <div className = 'invalid-feedback'> {errors.mercadosIdString} </div> }
                            
                            <select className="form-select" style = {{margin: '20px 0px', width: '200px'}} onChange = {handleMercadoId}>
                                {
                                    mercados.map(mercado => (
                                        <option value={mercado.id}>{mercado.id + ": " + mercado.codigo}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button className = 'btn btn-success' onClick={saveOrUpdateComitente}>
                            {etiquetaBoton()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ComitentesComponent
import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/comitentes';

const REST_API_BASE_URL_MERCADOS = 'http://localhost:8080/api/mercados';

const REST_API_BASE_URL_PAISES = 'http://localhost:8080/api/paises';

const REST_API_BASE_URL_STATS = 'http://localhost:8080/api/stats';

export const listPaises = () => {
    return axios.get(REST_API_BASE_URL_PAISES);
}

export const listMercados = () => {
    return axios.get(REST_API_BASE_URL_MERCADOS);
}

export const listComitentes = () => {
    return axios.get(REST_API_BASE_URL);
}

export const listStats = () => {
    return axios.get(REST_API_BASE_URL_STATS);
}

export const createComitente = (comitente) => axios.post(REST_API_BASE_URL, comitente);

export const getComitente = (comitenteId) => axios.get(REST_API_BASE_URL + '/' + comitenteId);

export const updateComitente = (comitenteId, comitente) => axios.put(REST_API_BASE_URL + '/' + comitenteId, comitente);

export const deleteComitente = (comitenteId) => axios.delete(REST_API_BASE_URL + '/' + comitenteId);

export const createMercado = (mercado) => axios.post(REST_API_BASE_URL_MERCADOS, mercado);

export const getMercado = (mercadoId) => axios.get(REST_API_BASE_URL_MERCADOS + '/' + mercadoId);

export const updateMercado = (mercadoId, mercado) => axios.put(REST_API_BASE_URL_MERCADOS + '/' + mercadoId, mercado);

export const deleteMercado = (mercadoId) => axios.delete(REST_API_BASE_URL_MERCADOS + '/' + mercadoId);

export const createPais = (pais) => axios.post(REST_API_BASE_URL_PAISES, pais);

export const getPais = (paisId) => axios.get(REST_API_BASE_URL_PAISES + '/' + paisId);

export const updatePais = (paisId, pais) => axios.put(REST_API_BASE_URL_PAISES + '/' + paisId, pais);

export const deletePais = (paisId) => axios.delete(REST_API_BASE_URL_PAISES + '/' + paisId);
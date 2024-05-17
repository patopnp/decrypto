import React, {useEffect, useState} from 'react'
import { listStats } from '../services/EntidadesService'

const ListStatsComponent = () => {

   const [stats, setStats] = useState([])

   // Cargo las estadisticas con datos del back-end
   useEffect(() => {
        getAllStats()
   }, [])

    function getAllStats() {
        listStats().then((response) => {
            setStats(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

  return (
        <div className = 'container'>
        <h2 className = "text-center" style = {{marginTop: '10px'}}>Estadisticas</h2>
        {
                    stats.map(stat =>
        <div>     
            <h5 style = {{margin: '20px 0px'}}>{stat.pais}</h5>           
        <table className = 'table table-striped table-bordered col-md-6'>
            
            <thead>
                <tr>
                
                    <th>Codigo de mercado</th>
                    <th>Porcentaje</th>
                </tr>
            </thead>
            <tbody>
                {stat.cantidadPorMercado.map(cpm => <tr><td>{cpm.codigoMercado}</td><td>{cpm.porcentaje + "%"}</td></tr>)}
            </tbody>
        </table></div>)
}
    </div>
  )
}

export default ListStatsComponent
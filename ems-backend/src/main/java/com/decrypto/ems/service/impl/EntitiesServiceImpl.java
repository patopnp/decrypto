package com.decrypto.ems.service.impl;

import com.decrypto.ems.dto.MercadoDto;
import com.decrypto.ems.dto.ComitenteDto;
import com.decrypto.ems.dto.PaisDto;
import com.decrypto.ems.dto.StatsDto;
import com.decrypto.ems.entity.Mercado;
import com.decrypto.ems.entity.Comitente;
import com.decrypto.ems.entity.Pais;
import com.decrypto.ems.exception.InvalidResourceOperationException;
import com.decrypto.ems.exception.ResourceNotFoundException;
import com.decrypto.ems.mapper.EntityMapper;
import com.decrypto.ems.repository.ComitenteRepository;
import com.decrypto.ems.repository.MercadoRepository;
import com.decrypto.ems.repository.PaisRepository;
import com.decrypto.ems.service.EntitiesService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EntitiesServiceImpl implements EntitiesService {

    private static final List<String> PAISES_ADMITIDOS = List.of("Argentina", "Uruguay");

    private MercadoRepository mercadoRepository;
    private ComitenteRepository comitenteRepository;
    private PaisRepository paisRepository;

    @Override
    public PaisDto createPais(PaisDto paisDto) {

        if (paisValido(paisDto)) {
            Pais pais = EntityMapper.mapToPais(paisDto);
            Pais savedPais = paisRepository.save(pais);
            return EntityMapper.mapToPaisDto(savedPais);
        }
        else{
            throw new InvalidResourceOperationException("El pais " + paisDto.getNombre() + " no se encuentra entre los paises admitidos.");
        }

    }

    //Comprueba que el nombre del pais sea valido y no este presente
    private boolean paisValido(PaisDto paisDto) {

        boolean paisAdmitido = PAISES_ADMITIDOS.contains(paisDto.getNombre());
        boolean paisYaPresente = !paisRepository.findByNombre(paisDto.getNombre()).isPresent();

        return paisAdmitido && paisYaPresente;
    }

    //Devuelve el pais con el id del parametro o arroja error si el pais no existe
    private Pais paisPorId(Long paisId) {
        return paisRepository.findById(paisId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Pais con id " + paisId + "no existe"));
    }

    @Override
    public PaisDto getPaisById(Long paisId) {
        Pais pais = paisPorId(paisId);
        return EntityMapper.mapToPaisDto(pais);
    }

    @Override
    public List<PaisDto> getAllPaises() {
        List<Pais> paises = paisRepository.findAll();
        return paises.stream().map((pais) -> EntityMapper.mapToPaisDto(pais)).collect(Collectors.toList());
    }

    @Override
    public PaisDto updatePais(Long paisId, PaisDto updatedPais) {

        if (paisValido(updatedPais)) {
            throw new InvalidResourceOperationException("El pais " + updatedPais.getNombre() + " no se encuentra entre los paises admitidos.");
        }

        Pais pais = paisPorId(paisId);

        //Asignamos el nombre modificado al pais
        pais.setNombre(updatedPais.getNombre());

        //Guardamos el pais en la base de datos
        Pais updatedPaisResponse = paisRepository.save(pais);

        return EntityMapper.mapToPaisDto(updatedPaisResponse);
    }

    @Override
    public void deletePais(Long paisId) {
        if (eliminacionPaisValida(paisId)) {
            paisRepository.deleteById(paisId);
        }
    }

    private boolean eliminacionPaisValida(Long paisId) {
        //Comprobamos que el pais esta cargado
        Pais pais = paisPorId(paisId);

        //Comprobamos que el pais no sea parte de algun mercado
        if (mercadoRepository.findByPais(pais).isPresent()){
            throw new InvalidResourceOperationException("Pais con id " + paisId + " esta siendo usado por un mercado.");
        }
        return true;
    }

    @Override
    public ComitenteDto createComitente(ComitenteDto comitenteDto) {

        //Verificamos validez de los mercados asignados
        Set<Mercado> mercados = mercadosDelComitente(comitenteDto);

        Comitente comitente = EntityMapper.mapToComitente(comitenteDto, mercados);
        Comitente savedComitente = comitenteRepository.save(comitente);

        return EntityMapper.mapToComitenteDto(savedComitente);
    }

    private Set<Mercado> mercadosDelComitente(ComitenteDto comitenteDto) {

        //Nos aseguramos que tenga al menos un mercado asignado
        if(comitenteDto.getMercadosId().isEmpty())
            throw new InvalidResourceOperationException("El comitente debe tener al menos un mercado asignado.");

        //Buscamos de acuerdo al id del mercado
        Set<Mercado> mercados =  comitenteDto.getMercadosId().stream().map(
                (mercadoId) -> mercadoRepository.findById(mercadoId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Mercado con id " + mercadoId + "no existe"))
        ).collect(Collectors.toSet());

        return mercados;
    }

    @Override
    public ComitenteDto getComitenteById(Long comitenteId) {
        Comitente comitente = comitentePorId(comitenteId);
        return EntityMapper.mapToComitenteDto(comitente);
    }

    private Comitente comitentePorId(Long comitenteId) {
        return comitenteRepository.findById(comitenteId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Comitente con id " + comitenteId + "no existe"));
    }

    @Override
    public List<ComitenteDto> getAllComitentes() {
        List<Comitente> comitentes = comitenteRepository.findAll();
        return comitentes.stream().map((comitente) -> EntityMapper.mapToComitenteDto(comitente)).collect(Collectors.toList());
    }

    @Override
    public ComitenteDto updateComitente(Long comitenteId, ComitenteDto updatedComitente) {

        //Comprobar que el comitente con ese id existe
        Comitente comitente = comitentePorId(comitenteId);

        //Buscamos de acuerdo al id del mercado
        Set<Mercado> mercados =  mercadosDelComitente(updatedComitente);

        //Asignamos de campos actualizados
        comitente.setMercados(mercados);
        comitente.setDescripcion(updatedComitente.getDescripcion());

        //Guardamos el comitente actualizado en la base de datos
        Comitente updatedComitenteResponse = comitenteRepository.save(comitente);

        return EntityMapper.mapToComitenteDto(updatedComitenteResponse);
    }

    @Override
    public void deleteComitente(Long comitenteId) {
        //Verificamos que existe algun comitente con este id.
        comitentePorId(comitenteId);
        comitenteRepository.deleteById(comitenteId);
    }

    @Override
    public MercadoDto createMercado(MercadoDto mercadoDto) {

        //Verificamos que el pais existe
        Pais pais = paisPorNombre(mercadoDto.getPais());

        Mercado mercado = EntityMapper.mapToMercado(mercadoDto, pais);

        Mercado savedMercado = mercadoRepository.save(mercado);
        return EntityMapper.mapToMercadoDto(savedMercado);
    }

    //Devuelve el pais que tiene el nombre del parametro o arroja error si no existe
    private Pais paisPorNombre(String nombrePais){
        return paisRepository.findByNombre(nombrePais)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Pais con nombre " + nombrePais + " no existe"));
    }

    @Override
    public MercadoDto getMercadoById(Long mercadoId) {
        Mercado mercado = mercadoRepository.findById(mercadoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Mercado con id " + mercadoId + "no existe"));

        return EntityMapper.mapToMercadoDto(mercado);
    }

    @Override
    public List<MercadoDto> getAllMercados() {
        List<Mercado> mercados = mercadoRepository.findAll();
        return mercados.stream().map((mercado) -> EntityMapper.mapToMercadoDto(mercado)).collect(Collectors.toList());
    }

    @Override
    public MercadoDto updateMercado(Long mercadoId, MercadoDto updatedMercado) {

        //Verificamos que el pais existe
        Pais pais = paisPorNombre(updatedMercado.getPais());

        //Verificamos que el mercado con ese id existe
        Mercado mercado = mercadoPorId(mercadoId);

        //Asignamos los campos del mercado actualizado
        mercado.setDescripcion(updatedMercado.getDescripcion());
        mercado.setCodigo(updatedMercado.getCodigo());
        mercado.setPais(pais);

        //Guardamos en la base de datos
        Mercado updatedMercadoResponse = mercadoRepository.save(mercado);

        return EntityMapper.mapToMercadoDto(updatedMercadoResponse);
    }

    //Devuelve el mercado con mercadoId o arroja error si no existe
    private Mercado mercadoPorId(Long mercadoId) {
        return mercadoRepository.findById(mercadoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Mercado con id " + mercadoId + "no existe"));
    }

    @Override
    public void deleteMercado(Long mercadoId) {
        mercadoRepository.findById(mercadoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Mercado con id " + mercadoId + "no existe"));

        borrarMercadoDeComitente(mercadoId);
        mercadoRepository.deleteById(mercadoId);
    }

    // Borra id del mercado del comitente o arroja error si no es posible
    private void borrarMercadoDeComitente(Long mercadoId){

        List<Comitente> todosLosComitentes = comitenteRepository.findAll();

        /*
        Me aseguro de que todos los comitentes tengan asignado algun otro mercado ademas del mercado con mercadoId,
        de lo contrario, quedaria un campo vacio y todos los comitentes deben tener asignado un mercado
        */
        boolean eliminacionInvalida = todosLosComitentes.stream().anyMatch(comitente -> comitente.getMercados().size()==1 && comitente.getMercados().stream().findAny().get().getId().equals(mercadoId) );

        if (eliminacionInvalida) {
            throw new InvalidResourceOperationException("El mercado "+ mercadoId + "no puede ser eliminado porque existen comitentes exclusivamente asignados a este mercado");
        }

        //Elimino este mercado de todos los comitentes
        for(Comitente comitente : todosLosComitentes){
            if(comitente.getMercados().removeIf(mercado -> mercado.getId().equals(mercadoId))) {
                comitenteRepository.save(comitente);
            }
        }
    }

    @Override
    public List<StatsDto> getStats() {

        List<StatsDto> stats = new ArrayList<>();

        List<Pais> paises = paisRepository.findAll();

        //Calculo las estadisticas para cada pais
        for (Pais p : paises) {

            Set<StatsDto.TotalPorMercado> mercadoPorPais = new HashSet<>();
            int totalComitentesPorPais = 0;

            //El total de comitentes por pais considerando todos los mercados, se utilizara en el denominador
            for (Mercado m : p.getMercados()){
                totalComitentesPorPais += m.getComitentes().size();
            }

            //Asegurarme de que cuando no hay comitente en mercado de algun pais no sea 0 el denominador, por ejemplo argentina podria no tener comitentes
            if(totalComitentesPorPais == 0) {
                continue;
            }

            //Para cada mercado de cada pais calculo el porcentaje de comitentes que perteneces a ese mercado
            for (Mercado m : p.getMercados()){
                mercadoPorPais.add(new StatsDto.TotalPorMercado(m.getCodigo(), (double)(m.getComitentes().size()/(double)totalComitentesPorPais)*100));
            }

            stats.add(new StatsDto(p.getNombre(), mercadoPorPais));

        }

        return stats;
    }
}

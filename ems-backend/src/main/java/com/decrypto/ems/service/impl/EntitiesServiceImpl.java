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

        //Comprobamos que el nombre del pais sea valido y no este presente
        if (contienePaisValido(paisDto.getNombre())  && !paisRepository.findByNombre(paisDto.getNombre()).isPresent()) {
            Pais pais = EntityMapper.mapToPais(paisDto);
            Pais savedPais = paisRepository.save(pais);
            return EntityMapper.mapToPaisDto(savedPais);
        }
        else{
            throw new InvalidResourceOperationException("El pais " + paisDto.getNombre() + " no se encuentra entre los paises admitidos.");
        }

    }

    private boolean contienePaisValido(String pais) {
        return PAISES_ADMITIDOS.contains(pais);
    }

    @Override
    public PaisDto getPaisById(Long paisId) {
        //Comprobamos que el pais existe
        Pais pais = paisRepository.findById(paisId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Comitente con id " + paisId + "no existe"));

        return EntityMapper.mapToPaisDto(pais);
    }

    @Override
    public List<PaisDto> getAllPaises() {
        List<Pais> paises = paisRepository.findAll();
        return paises.stream().map((pais) -> EntityMapper.mapToPaisDto(pais)).collect(Collectors.toList());
    }

    @Override
    public PaisDto updatePais(Long paisId, PaisDto updatedPais) {

        //Comprobamos que el nombre del pais sea valido y no este presente
        if (!contienePaisValido(updatedPais.getNombre()) || paisRepository.findByNombre(updatedPais.getNombre()).isPresent()) {
            throw new InvalidResourceOperationException("El pais " + updatedPais.getNombre() + " no se encuentra entre los paises admitidos.");
        }

        //tiene que tener todos los campos en el json para actualizarlos
        //Comprobamos que el pais con ese id existe
        Pais pais = paisRepository.findById(paisId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Pais con id " + paisId + "no existe"));

        pais.setNombre(updatedPais.getNombre());

        Pais updatedPaisResponse = paisRepository.save(pais);

        return EntityMapper.mapToPaisDto(updatedPaisResponse);
    }

    @Override
    public void deletePais(Long paisId) {
        //Comprobamos que el pais esta cargado
        Pais pais = paisRepository.findById(paisId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Pais con id " + paisId + " no existe"));

        //Comprobamos que el pais no sea parte de algun mercado
        if (mercadoRepository.findByPais(pais).isPresent()){
            throw new InvalidResourceOperationException("Pais con id " + paisId + " esta siendo usado por un mercado.");
        }

        paisRepository.deleteById(paisId);

    }

    @Override
    public ComitenteDto createComitente(ComitenteDto comitenteDto) {

        //Nos aseguramos que tenga al menos un mercado asignado
        if(comitenteDto.getMercadosId().isEmpty())
            throw new InvalidResourceOperationException("El comitente debe tener al menos un mercado asignado.");

        //Buscamos de acuerdo al id del mercado
        Set<Mercado> mercados =  comitenteDto.getMercadosId().stream().map(
                (mercadoId) -> mercadoRepository.findById(mercadoId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Mercado con id " + mercadoId + "no existe"))
        ).collect(Collectors.toSet());

        Comitente comitente = EntityMapper.mapToComitente(comitenteDto, mercados);
        Comitente savedComitente = comitenteRepository.save(comitente);

        return EntityMapper.mapToComitenteDto(savedComitente);
    }

    @Override
    public ComitenteDto getComitenteById(Long comitenteId) {
        Comitente comitente = comitenteRepository.findById(comitenteId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Comitente con id " + comitenteId + "no existe"));

        return EntityMapper.mapToComitenteDto(comitente);
    }

    @Override
    public List<ComitenteDto> getAllComitentes() {
        List<Comitente> comitentes = comitenteRepository.findAll();
        return comitentes.stream().map((comitente) -> EntityMapper.mapToComitenteDto(comitente)).collect(Collectors.toList());
    }

    @Override
    public ComitenteDto updateComitente(Long comitenteId, ComitenteDto updatedComitente) {

        //tiene que tener todos los campos en el json para actualizarlos
        //Comprobar que el comitente con ese id existe
        Comitente comitente = comitenteRepository.findById(comitenteId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Comitente con id " + comitenteId + "no existe"));

        comitente.setDescripcion(updatedComitente.getDescripcion());

        //Buscamos de acuerdo al id del mercado
        Set<Mercado> mercados =  updatedComitente.getMercadosId().stream().map(
                (mercadoId) -> mercadoRepository.findById(mercadoId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Mercado con id " + mercadoId + "no existe"))
        ).collect(Collectors.toSet());

        //Asignamos de acuerdo a los mercados encontrados
        comitente.setMercados(mercados);

        Comitente updatedComitenteResponse = comitenteRepository.save(comitente);

        return EntityMapper.mapToComitenteDto(updatedComitenteResponse);
    }

    @Override
    public void deleteComitente(Long comitenteId) {
        comitenteRepository.findById(comitenteId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Comitente con id " + comitenteId + "no existe"));
        comitenteRepository.deleteById(comitenteId);
    }

    @Override
    public MercadoDto createMercado(MercadoDto mercadoDto) {

        //Verificamos que el pais existe
        Pais pais = paisRepository.findByNombre(mercadoDto.getPais())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Pais con nombre " + mercadoDto.getPais() + " no existe"));



        //Buscamos de acuerdo al id del comitente
        /*Set<Comitente> comitentes =  mercadoDto.getComitentesId().stream().map(
                (comitenteId) -> comitenteRepository.findById(comitenteId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Comitente con id " + comitenteId + "no existe"))
        ).collect(Collectors.toSet());*/

        Mercado mercado = EntityMapper.mapToMercado(mercadoDto, pais/*, comitentes*/);
        Mercado savedMercado = mercadoRepository.save(mercado);
        return EntityMapper.mapToMercadoDto(savedMercado);
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
        Pais pais = paisRepository.findByNombre(updatedMercado.getPais())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Pais con nombre " + updatedMercado.getPais() + " no existe"));

        //Verificamos que el mercado con ese id existe
        Mercado mercado = mercadoRepository.findById(mercadoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Mercado con id " + mercadoId + "no existe"));

        mercado.setDescripcion(updatedMercado.getDescripcion());

        mercado.setCodigo(updatedMercado.getCodigo());

        mercado.setPais(pais);

        Mercado updatedMercadoResponse = mercadoRepository.save(mercado);

        return EntityMapper.mapToMercadoDto(updatedMercadoResponse);
    }

    @Override
    public void deleteMercado(Long mercadoId) {
        mercadoRepository.findById(mercadoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Mercado con id " + mercadoId + "no existe"));

        //Borro mercadoId de comitente primero
        for(Comitente comitente : comitenteRepository.findAll()){
            if(comitente.getMercados().removeIf(mercado -> mercado.getId().equals(mercadoId))) {

                //Compruebo que al eliminar el mercado no dejo a comitentes sin algun mercado asignado
                if (comitente.getMercados().isEmpty()) {
                    throw new InvalidResourceOperationException("El mercado "+ mercadoId + "no puede ser eliminado porque existen comitentes exclusivamente asignados a este mercado");
                }
                else {
                    comitenteRepository.save(comitente);
                }
            }
        }

        mercadoRepository.deleteById(mercadoId);
    }

    @Override
    public List<StatsDto> getStats() {

        List<StatsDto> stats = new ArrayList<>();

        List<Pais> paises = paisRepository.findAll();

        for (Pais p : paises) {

            Set<StatsDto.TotalPorMercado> mercadoPorPais = new HashSet<>();
            int totalComitentesPorPais = 0;

            for (Mercado m : p.getMercados()){
                totalComitentesPorPais += m.getComitentes().size();
            }
            //Asegurarme de que cuando no hay comitente en mercado de algun pais no sea 0 el denominador, por ejemplo argentina podria no tener comitentes
            if(totalComitentesPorPais == 0) {
                continue;
            }

            for (Mercado m : p.getMercados()){
                mercadoPorPais.add(new StatsDto.TotalPorMercado(m.getCodigo(), (double)(m.getComitentes().size()/(double)totalComitentesPorPais)*100));
            }

            stats.add(new StatsDto(p.getNombre(), mercadoPorPais));

        }


        return stats;
    }
}

package com.decrypto.ems.service;

import com.decrypto.ems.dto.MercadoDto;
import com.decrypto.ems.dto.PaisDto;
import com.decrypto.ems.dto.ComitenteDto;
import com.decrypto.ems.dto.StatsDto;

import java.util.List;

public interface EntitiesService {

    // CRUD para paises
    PaisDto createPais(PaisDto paisDto);
    PaisDto getPaisById(Long paisId);
    List<PaisDto> getAllPaises();
    PaisDto updatePais(Long id, PaisDto paisDto);
    void deletePais(Long paisId);

    //CRUD para comitentes
    ComitenteDto createComitente(ComitenteDto comitenteDto);
    ComitenteDto getComitenteById(Long comitenteId);
    List<ComitenteDto> getAllComitentes();
    ComitenteDto updateComitente(Long id, ComitenteDto comitenteDto);
    void deleteComitente(Long comitenteId);

    //CRUD para mercados
    MercadoDto createMercado(MercadoDto mercadoDto);
    MercadoDto getMercadoById(Long mercadoId);
    List<MercadoDto> getAllMercados();
    MercadoDto updateMercado(Long id, MercadoDto mercadoDto);
    void deleteMercado(Long mercadoId);

    List<StatsDto> getStats();
}

package com.decrypto.ems.mapper;

import com.decrypto.ems.dto.ComitenteDto;
import com.decrypto.ems.dto.MercadoDto;
import com.decrypto.ems.dto.PaisDto;
import com.decrypto.ems.entity.Comitente;
import com.decrypto.ems.entity.Mercado;
import com.decrypto.ems.entity.Pais;

import java.util.Set;
import java.util.stream.Collectors;

public class EntityMapper {

    public static ComitenteDto mapToComitenteDto(Comitente comitente) {
        return new ComitenteDto(
                comitente.getId(),
                comitente.getDescripcion(),
                comitente.getMercados().stream().map(Mercado::getId).collect(Collectors.toSet())
        );
    }

    public static Comitente mapToComitente(ComitenteDto comitenteDto, Set<Mercado> mercados) {
        return new Comitente(
                comitenteDto.getId(),
                comitenteDto.getDescripcion(),
                mercados
        );
    }

    public static MercadoDto mapToMercadoDto(Mercado mercado) {
        return new MercadoDto(
                mercado.getId(),
                mercado.getCodigo(),
                mercado.getDescripcion(),
                //mercado.getComitentes().stream().map(Comitente::getId).collect(Collectors.toSet()),
                mercado.getPais().getNombre()
        );
    }

    public static Mercado mapToMercado(MercadoDto mercadoDto, Pais pais/*, Set<Comitente> comitentes*/) {
        return new Mercado(
                mercadoDto.getId(),
                mercadoDto.getCodigo(),
                mercadoDto.getDescripcion(),
                null,
                pais
        );
    }

    public static PaisDto mapToPaisDto(Pais pais) {
        return new PaisDto(
                pais.getId(),
                pais.getNombre()
        );
    }

    public static Pais mapToPais(PaisDto paisDto) {
        return new Pais(
                paisDto.getId(),
                paisDto.getNombre(),
                null
        );
    }
}

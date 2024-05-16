package com.decrypto.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComitenteDto {
    private Long id;
    private String descripcion;
    Set<Long> mercadosId;
}

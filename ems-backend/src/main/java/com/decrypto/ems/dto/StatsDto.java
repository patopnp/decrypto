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
public class StatsDto {
    String pais;
    Set<TotalPorMercado> cantidadPorMercado;

    @Getter
    @Setter
    public static class TotalPorMercado {

        String codigoMercado;
        double porcentaje;

        public TotalPorMercado(String codigoMercado, double porcentaje){
            this.codigoMercado = codigoMercado;
            this.porcentaje = porcentaje;
        }
    }

}

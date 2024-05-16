package com.decrypto.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mercados")
public class Mercado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;

    private String descripcion;

    @ManyToMany(mappedBy = "mercados")
    Set<Comitente> comitentes;

    @ManyToOne
    @JoinColumn(name="paises.id", nullable=false)
    private Pais pais;
}

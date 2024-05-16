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
@Table(name = "comitentes")
public class Comitente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String descripcion;

    @ManyToMany
    /*@JoinTable(
            name = "comitente_mercado",
            joinColumns = @JoinColumn(name = "comitentes.id"),
            inverseJoinColumns = @JoinColumn(name = "mercados.id"))*/
    Set<Mercado> mercados;

}

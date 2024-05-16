package com.decrypto.ems.repository;

import com.decrypto.ems.entity.Pais;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaisRepository extends JpaRepository<Pais,Long>{

    public Optional<Pais> findByNombre(String nombre);
}

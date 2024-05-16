package com.decrypto.ems.repository;

import com.decrypto.ems.entity.Mercado;
import com.decrypto.ems.entity.Pais;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MercadoRepository extends JpaRepository<Mercado, Long> {
    public Optional<Mercado> findByPais(Pais pais);
}

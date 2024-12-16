package com.sattva.clinica.sattva.repository;

import com.sattva.clinica.sattva.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
}

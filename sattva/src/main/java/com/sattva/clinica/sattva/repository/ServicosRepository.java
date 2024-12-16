package com.sattva.clinica.sattva.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import com.sattva.clinica.sattva.model.Servicos;

public interface ServicosRepository extends JpaRepository<Servicos, Integer> {

	@Procedure(name = "sp_CadastrarServico")
	void sp_cadastrarServico(
			@Param("Descricao") String Descricao,
			@Param("Duracao") String Duracao,
			@Param("Valor") double Valor);

}

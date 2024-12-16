package com.sattva.clinica.sattva.repository;

import com.sattva.clinica.sattva.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
	
	@Query(value = "SELECT * FROM fn_ConsultarCliente(null, null, null, null, null, null)", nativeQuery = true)
	List<Cliente> consultarCliente();

	@Procedure(procedureName = "sp_CadastrarCliente")
	void cadastrarCliente(@Param("Nome") String nome,
			@Param("Sexo") String sexo,
			@Param("Telefone") String telefone,
			@Param("Data_Nasc") String dataNasc,
			@Param("CPF") String cpf,
			@Param("Email") String email,
			@Param("Senha") String senha);

	@Procedure(procedureName = "sp_AlterarCliente")
	void alterarCliente(@Param("ID_Cliente") int idCliente,
			@Param("Nome") String nome,
			@Param("Sexo") String sexo,
			@Param("Telefone") String telefone,
			@Param("Data_Nasc") String dataNasc,
			@Param("CPF") String cpf,
			@Param("Email") String email,
			@Param("Senha") String senha);

	@Procedure(procedureName = "sp_ExcluirCliente")
	void excluirCliente(@Param("ID_Cliente") int idCliente);

	@Procedure(procedureName = "fn_ConsultarCliente")
	List<Cliente> consultarCliente(@Param("ID_Cliente") Integer idCliente,
			@Param("Email") String email,
			@Param("CPF") String cpf,
			@Param("Nome") String nome,
			@Param("Data_Nasc") String dataNasc,
			@Param("Telefone") String telefone);

}

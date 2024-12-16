package com.sattva.clinica.sattva.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Clientes")
@Getter
@Setter
@ToString
public class Cliente {

	@Id
	@Column(name = "ID_Cliente")
	private int ID_Cliente;

	@Column(name = "Nome", length = 50, nullable = false)
	private String Nome;

	@Column(name = "Sexo", length = 1, nullable = false)
	private String Sexo;

	@Column(name = "Telefone", length = 15)
	private String Telefone;

	@Column(name = "Data_Nasc")
	private String Data_Nasc;

	@Column(name = "CPF", length = 14)
	private String CPF;

	@Column(name = "Email", length = 50, nullable = false, unique = true)
	private String Email;

	@Column(name = "Senha", length = 40, nullable = false)
	private String Senha;
}

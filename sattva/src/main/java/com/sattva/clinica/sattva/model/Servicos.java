package com.sattva.clinica.sattva.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/*
 * 	ID_Servico	int				not null	primary key,
 * 	Descricao   varchar(50)		not null,
 * 	Duracao		time			default '01:00:00',
 * 	Valor		decimal(10,2)	not null
 * 
*/

@Table(name = "Servicos")
@Entity(name = "Servicos")
public class Servicos {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_Servico")
	@Getter
	private int ID_Servico;

	@Getter
	@Setter
	@Column(name = "Descricao", length = 50, nullable = false)
	private String Descricao;

	@Column(name = "Duracao", columnDefinition = "time default '00:50:00'")
	@Getter
	@Setter
	private String Duracao;

	@Column(name = "Valor", nullable = false)
	@Getter
	@Setter
	private double Valor;

	@Override
	public String toString() {
		return "Servicos{" +
				"Descricao='" + this.getDescricao() + '\'' +
				", Duracao='" + this.getDuracao() + '\'' +
				", Valor=" + Double.toString(this.getValor()) +
				'}';
	}

}

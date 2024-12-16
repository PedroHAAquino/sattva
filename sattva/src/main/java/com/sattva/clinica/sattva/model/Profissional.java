package com.sattva.clinica.sattva.model;

import jakarta.persistence.Entity;

@Entity
public class Profissional extends Pessoa {
    private String especialidade;

    // Getters e Setters
    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }
}

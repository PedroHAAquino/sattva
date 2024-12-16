package com.sattva.clinica.sattva.service;

import com.sattva.clinica.sattva.model.Pessoa;
import com.sattva.clinica.sattva.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PessoaService {
    @Autowired
    private PessoaRepository pessoaRepository;

    public List<Pessoa> listarTodos() {
        return pessoaRepository.findAll();
    }

    public Pessoa salvar(Pessoa pessoa) {
        return pessoaRepository.save(pessoa);
    }
}

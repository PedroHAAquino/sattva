package com.sattva.clinica.sattva.service;

import com.sattva.clinica.sattva.model.Profissional;
import com.sattva.clinica.sattva.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfissionalService {
    @Autowired
    private ProfissionalRepository profissionalRepository;

    public List<Profissional> listarTodos() {
        return profissionalRepository.findAll();
    }

    public Profissional salvar(Profissional profissional) {
        return profissionalRepository.save(profissional);
    }

    public void deletar(Long id) {
        profissionalRepository.deleteById(id);
    }
}

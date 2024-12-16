package com.sattva.clinica.sattva.service;

import com.sattva.clinica.sattva.model.Servicos;
import com.sattva.clinica.sattva.repository.ServicosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoService {
    @Autowired
    private ServicosRepository servicoRepository;

    public List<Servicos> listarTodos() {
        return servicoRepository.findAll();
    }

    public Servicos salvar(Servicos servico) {
        return servicoRepository.save(servico);
    }

 /*    public void deletar(Long id) {
        servicoRepository.deleteById(id);
    }*/
    
}

package com.sattva.clinica.sattva.controller;

import com.sattva.clinica.sattva.model.Agendamento;
import com.sattva.clinica.sattva.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {
    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping
    public List<Agendamento> listarTodos() {
        return agendamentoService.listarTodos();
    }

    @PostMapping
    public Agendamento salvar(@RequestBody Agendamento agendamento) {
        return agendamentoService.salvar(agendamento);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        agendamentoService.deletar(id);
    }
}

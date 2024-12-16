package com.sattva.clinica.sattva.controller;

import com.sattva.clinica.sattva.model.Profissional;
import com.sattva.clinica.sattva.service.ProfissionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profissionais")
public class ProfissionalController {
    @Autowired
    private ProfissionalService profissionalService;

    @GetMapping
    public List<Profissional> listarTodos() {
        return profissionalService.listarTodos();
    }

    @PostMapping
    public Profissional salvar(@RequestBody Profissional profissional) {
        return profissionalService.salvar(profissional);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        profissionalService.deletar(id);
    }
}

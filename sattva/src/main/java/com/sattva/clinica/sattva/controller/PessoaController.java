package com.sattva.clinica.sattva.controller;

import com.sattva.clinica.sattva.model.Pessoa;
import com.sattva.clinica.sattva.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pessoas")
public class PessoaController {
    @Autowired
    private PessoaService pessoaService;

    @GetMapping
    public List<Pessoa> listar() {
        return pessoaService.listarTodos();
    }

    @PostMapping
    public Pessoa salvar(@RequestBody Pessoa pessoa) {
        return pessoaService.salvar(pessoa);
    }
}

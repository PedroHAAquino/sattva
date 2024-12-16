package com.sattva.clinica.sattva.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sattva.clinica.sattva.model.Cliente;
import com.sattva.clinica.sattva.repository.ClienteRepository;

@RestController
@RequestMapping("/sattva")
public class ClienteController {

	@Autowired
	private ClienteRepository clienteRepository;

	@GetMapping("/clientes")
	public List<Cliente> getAllClientes() {
		return clienteRepository.consultarCliente();
	}

	@GetMapping("/clientes/{id}")
	public List<Cliente> searchClientes(@RequestParam(required = false) Integer id,
			@RequestParam(required = false) String email,
			@RequestParam(required = false) String CPF,
			@RequestParam(required = false) String nome,
			@RequestParam(required = false) String dataNasc,
			@RequestParam(required = false) String telefone) {
		return clienteRepository.consultarCliente(id, email, CPF, nome, dataNasc, telefone);
	}

	@PostMapping
	public void createCliente(@RequestBody Cliente cliente) {
		clienteRepository.cadastrarCliente(cliente.getNome(), cliente.getSexo(), cliente.getTelefone(),
				cliente.getData_Nasc(), cliente.getCPF(), cliente.getEmail(),
				cliente.getSenha());
	}

	@PutMapping("/clientes/{id}")
	public void updateCliente(@PathVariable int id, @RequestBody Cliente cliente) {
		clienteRepository.alterarCliente(id, cliente.getNome(), cliente.getSexo(), cliente.getTelefone(),
				cliente.getData_Nasc(), cliente.getCPF(), cliente.getEmail(),
				cliente.getSenha());
	}

	@DeleteMapping("/clientes/{id}")
	public void deleteCliente(@PathVariable int id) {
		clienteRepository.excluirCliente(id);
	}
}

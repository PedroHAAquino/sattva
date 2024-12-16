package com.sattva.clinica.sattva.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.fasterxml.jackson.databind.ObjectMapper;
import com.sattva.clinica.sattva.model.Servicos;
import com.sattva.clinica.sattva.repository.ServicosRepository;

//import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/sattva")
public class ControlerServicos {

	@Autowired
	private ServicosRepository servicosRepository;

	@GetMapping("/servicos")
	public List<Servicos> getAll() {
		List<Servicos> servicosList = servicosRepository.findAll();
		return servicosList;
	}

	/*
	 * @PostMapping("/servicos")
	 * public void createServico(HttpServletRequest request) throws IOException {
	 * // Ler o corpo da requisição como uma String
	 * StringBuilder stringBuilder = new StringBuilder();
	 * BufferedReader bufferedReader = null;
	 * 
	 * try {
	 * bufferedReader = request.getReader();
	 * char[] charBuffer = new char[128];
	 * int bytesRead;
	 * while ((bytesRead = bufferedReader.read(charBuffer)) != -1) {
	 * stringBuilder.append(charBuffer, 0, bytesRead);
	 * }
	 * } catch (IOException ex) {
	 * throw ex;
	 * } finally {
	 * if (bufferedReader != null) {
	 * try {
	 * bufferedReader.close();
	 * } catch (IOException ex) {
	 * throw ex;
	 * }
	 * }
	 * }
	 * 
	 * String body = stringBuilder.toString();
	 * System.out.println("Corpo da requisição: " + body);
	 * 
	 * // Converter a String em um objeto Servicos
	 * ObjectMapper objectMapper = new ObjectMapper();
	 * Servicos servico = objectMapper.readValue(body, Servicos.class);
	 * 
	 * System.out.println("Dados recebidos: " + servico);
	 * servicosRepository.sp_cadastrarServico(servico.getDescricao(),
	 * servico.getDuracao(), servico.getValor());
	 * }
	 */

	@PostMapping("/servicos")
	public void createServico(@RequestBody Servicos servico) {
		System.out.println(servico.toString());
		servicosRepository.sp_cadastrarServico(servico.getDescricao(), servico.getDuracao(), servico.getValor());
	}

}

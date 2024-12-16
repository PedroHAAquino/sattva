------------------- inserts para entrega

-- Inserir dados na tabela Pessoas
insert into Pessoas (Nome, Sexo, Telefone, Data_Nasc, CPF, Email, Senha)
values 
('João Silva', 'M', '999999999', '1985-06-15', '12345678901', 'joao@exemplo.com', 'senha123'),
('Maria Souza', 'F', '988888888', '1990-07-25', '23456789012', 'maria@exemplo.com', 'senha123'),
('Carlos Oliveira', 'M', '977777777', '1982-11-02', '34567890123', 'carlos@exemplo.com', 'senha123'),
('Ana Pereira', 'F', '966666666', '1995-03-10', '45678901234', 'ana@exemplo.com', 'senha123'),
('Paulo Costa', 'M', '955555555', '1988-02-17', '56789012345', 'paulo@exemplo.com', 'senha123'),
('Fernanda Lima', 'F', '944444444', '1992-09-30', '67890123456', 'fernanda@exemplo.com', 'senha123'),
('Roberto Martins', 'M', '933333333', '1984-12-21', '78901234567', 'roberto@exemplo.com', 'senha123'),
('Juliana Ribeiro', 'F', '922222222', '1991-04-14', '89012345678', 'juliana@exemplo.com', 'senha123'),
('Lucas Santos', 'M', '911111111', '1987-01-08', '90123456789', 'lucas@exemplo.com', 'senha123'),
('Juliana Costa', 'F', '900000000', '1994-05-22', '01234567890', 'juliana.costa@exemplo.com', 'senha123');

-- Inserir dados na tabela Clientes
insert into Clientes (ID_Cliente, Numero_Atend)
values 
(1, 5),
(2, 3),
(3, 7),
(4, 2),
(5, 4),
(6, 6),
(7, 3),
(8, 1),
(9, 8),
(10, 5);

-- Inserir dados na tabela Profissionais
insert into Profissionais (ID_Profissional, Especialidade, Horarios, Custo, SuperUsuario)
values 
(1, 'Médico', '08:00-12:00', 150.00, 'N'),
(2, 'Dentista', '09:00-18:00', 120.00, 'N'),
(3, 'Fisioterapeuta', '07:00-14:00', 100.00, 'N'),
(4, 'Psicólogo', '10:00-17:00', 80.00, 'N'),
(5, 'Nutricionista', '08:00-16:00', 90.00, 'N'),
(6, 'Dermatologista', '11:00-15:00', 200.00, 'N'),
(7, 'Cardiologista', '08:00-12:00', 250.00, 'N'),
(8, 'Oftalmologista', '09:00-17:00', 180.00, 'N'),
(9, 'Pediatra', '08:00-13:00', 130.00, 'N'),
(10, 'Ortopedista', '09:00-18:00', 160.00, 'N');

-- Inserir dados na tabela Servicos
insert into Servicos (Descricao, Duracao, Valor)
values
('Consulta médica', '01:00:00', 150.00),
('Limpeza dental', '01:30:00', 120.00),
('Reabilitação física', '02:00:00', 100.00),
('Aconselhamento psicológico', '01:00:00', 80.00),
('Consulta nutricional', '01:00:00', 90.00),
('Exame dermatológico', '01:30:00', 200.00),
('Consulta cardiológica', '01:00:00', 250.00),
('Exame oftalmológico', '01:00:00', 180.00),
('Consulta pediátrica', '01:00:00', 130.00),
('Consulta ortopédica', '01:00:00', 160.00);

-- Inserir dados na tabela Agendamentos
insert into Agendamentos (ID_Profissional, ID_Cliente, ID_Servico, Data_Hora, Status_Agendamento)
values
(1, 1, 1, '2024-12-01 08:00:00', '1'),
(2, 2, 2, '2024-12-02 09:00:00', '1'),
(3, 3, 3, '2024-12-03 07:30:00', '1'),
(4, 4, 4, '2024-12-04 10:00:00', '1'),
(5, 5, 5, '2024-12-05 08:30:00', '1'),
(6, 6, 6, '2024-12-06 11:00:00', '1'),
(7, 7, 7, '2024-12-07 08:00:00', '1'),
(8, 8, 8, '2024-12-08 09:30:00', '1'),
(9, 9, 9, '2024-12-09 08:45:00', '1'),
(10, 10, 10, '2024-12-10 09:15:00', '1');

use master
go

if EXISTS (select name from sys.databases where name = 'sattva')
    DROP DATABASE sattva;
go

create database sattva
go

use sattva
go

create table Pessoas
(
	ID_Pessoa		int				primary key		IDENTITY,
	Nome			varchar(50)		not null,
	Sexo			char(1)			not null,
	Telefone		varchar(15),
	Data_Nasc		date,
	CPF				varchar(14),
	Email			varchar(50)     unique not null,
	Senha           varchar(40)		not null,
	constraint ct_Pessoa_Sexo check (Sexo in ('M', 'F'))
)
go

create table Clientes
(
	ID_Cliente		int		primary key,
	Numero_Atend	int		not null default 0,
	foreign key (ID_Cliente) references Pessoas(ID_Pessoa)
)
go

create table Profissionais
(	
	ID_Profissional		int				primary key,
	Especialidade		varchar(20)		not null,
	Horarios			varchar(100),
	Custo				decimal(10,2)   not null default 0.0,
	SuperUsuario        varchar(1)		not null default 'N',
	foreign key (ID_Profissional) references Pessoas(ID_Pessoa),
	constraint	CT_Profissional_SuperUsuario check (SuperUsuario in ('S', 'N'))
)
go

create table Servicos (
	ID_Servico	int				primary key	identity,
	Descricao   varchar(50)		not null,
	Duracao		time			default '01:00:00',
	Valor		decimal(10,2)	not null
)
go

create table Agendamentos
(	
	ID_Agendamento		int		primary key		IDENTITY,
	ID_Profissional		int,
	ID_Cliente			int,
	ID_Servico			int, 
	Data_Hora			datetime,
	Status_Agendamento	char,
	constraint CK_Agendamento_Status check (Status_Agendamento IN ('0', '1')),   --O campo Status_Agendamento receber� apenas 0 ou 1, para ativo ou inativo
	foreign key (ID_Profissional) references Profissionais(ID_Profissional),
	foreign key (ID_Cliente) references Clientes(ID_Cliente),
	foreign key (ID_Servico) references Servicos(ID_Servico)
)

--tabela de log
CREATE TABLE LogAlteracoes (
    ID_Pessoa INT,
    Campo VARCHAR(50),
    ValorAntigo VARCHAR(255),
    ValorNovo VARCHAR(255),
    DataAlteracao DATETIME
);

go


--criando as stored procedures para cadastrarmos dados nas tabelas
create procedure sp_CadastrarCliente
    @Nome		varchar(50),
	@Sexo		char(1),
    @Telefone	char(15),
    @Data_Nasc	date,
    @CPF		char(14),
    @Email		varchar(50),
	@Senha		varchar(40)
as
begin
    declare @ID_Pessoa int;

    -- Inserir na tabela Pessoas e obter o ID gerado
    insert into Pessoas (Nome, Sexo, Telefone, Data_Nasc, Cpf, Email, Senha)
    values (@Nome, @Sexo, @Telefone, @Data_Nasc, @Cpf, @Email, @Senha);

    set @ID_Pessoa = SCOPE_IDENTITY();  -- Obt�m o ID da �ltima inser��o

    -- Inserir na tabela Clientes
    insert into Clientes (ID_Cliente)
    values (@ID_Pessoa);
end
go

create procedure sp_AlterarCliente
    @ID_Cliente int,
    @Nome       varchar(50),
    @Sexo       char(1),
    @Telefone   varchar(15),
    @Data_Nasc  date,
    @CPF        char(14),
    @Email      varchar(50),
    @Senha      varchar(40)
as
begin
    if exists (select 1 from Clientes where ID_Cliente = @ID_Cliente)
    begin
        -- Atualizar os dados na tabela Pessoas
        update Pessoas
        set Nome = @Nome,
            Sexo = @Sexo,
            Telefone = @Telefone,
            Data_Nasc = @Data_Nasc,
            CPF = @CPF,
            Email = @Email,
            Senha = @Senha
        where ID_Pessoa = @ID_Cliente;
    end
    else
    begin
        -- Cliente não encontrado
        raiserror('Cliente não encontrado com o ID especificado.', 16, 1);
    end
end

create procedure sp_ExcluirCliente
    @ID_Cliente int
as
begin
    if exists (select 1 from Clientes where ID_Cliente = @ID_Cliente)
    begin
        -- Excluir o cliente da tabela Clientes
        delete from Clientes where ID_Cliente = @ID_Cliente;

        -- Excluir a pessoa associada da tabela Pessoas
        delete from Pessoas where ID_Pessoa = @ID_Cliente;
    end
    else
    begin
        -- Cliente não encontrado
        raiserror('Cliente não encontrado com o ID especificado.', 16, 1);
    end
end

create function fn_ConsultarCliente
(
    @ID_Cliente int = null,
    @Email      varchar(50) = null,
    @CPF        char(14) = null,
    @Nome       varchar(50) = null,
    @Data_Nasc  date = null,
    @Telefone   varchar(15) = null
)
returns table
as
return
(
    select 
        P.ID_Pessoa as ID_Cliente,
        P.Nome,
        P.Sexo,
        P.Telefone,
        P.Data_Nasc,
        P.CPF,
        P.Email
    from Pessoas P
    inner join Clientes C on P.ID_Pessoa = C.ID_Cliente
    where 
        (@ID_Cliente is null or P.ID_Pessoa = @ID_Cliente)
        and (@Email is null or P.Email = @Email)
        and (@CPF is null or P.CPF = @CPF)
        and (@Nome is null or P.Nome like '%' + @Nome + '%')
        and (@Data_Nasc is null or P.Data_Nasc = @Data_Nasc)
        and (@Telefone is null or P.Telefone = @Telefone)
)


create procedure sp_CadastrarProfissional
    @Nome			varchar(50),
	@Sexo			char(1),
    @Telefone		char(15),
    @Data_Nasc		date,
    @Cpf			char(14),
    @Email			varchar(50),
	@Senha			varchar(40),
    @Especialidade	varchar(20),
    @Horarios		varchar(100),
    @Custo			float,
	@SuperUsuario	char(1) = 'N'
as
begin
    declare @ID_Pessoa int;

    -- Inserir na tabela Pessoas e obter o ID gerado
    insert into Pessoas (Nome, Sexo, Telefone, Data_Nasc, Cpf, Email, Senha)
    values (@Nome, @Sexo, @Telefone, @Data_Nasc, @Cpf, @Email, @Senha);

    set @ID_Pessoa = SCOPE_IDENTITY();  -- Obt�m o ID da �ltima inser��o

    -- Inserir na tabela Profissionais
    insert into Profissionais (ID_Profissional, Especialidade, Horarios, Custo, SuperUsuario)
    values (@ID_Pessoa, @Especialidade, @Horarios, @Custo, @SuperUsuario);
end
go

CREATE PROCEDURE sp_AlterarProfissional
    @ID_Profissional INT,
    @Nome            VARCHAR(50),
    @Sexo            CHAR(1),
    @Telefone        VARCHAR(15),
    @Data_Nasc       DATE,
    @CPF             CHAR(14),
    @Email           VARCHAR(50),
    @Senha           VARCHAR(40),
    @Especialidade   VARCHAR(20),
    @Horarios        VARCHAR(100),
    @Custo           DECIMAL(10, 2),
    @SuperUsuario    CHAR(1)
AS
BEGIN
    -- Verifica se o profissional existe
    IF EXISTS (SELECT 1 FROM Profissionais WHERE ID_Profissional = @ID_Profissional)
    BEGIN
        -- Atualizar os dados na tabela Pessoas
        UPDATE Pessoas
        SET Nome = @Nome,
            Sexo = @Sexo,
            Telefone = @Telefone,
            Data_Nasc = @Data_Nasc,
            CPF = @CPF,
            Email = @Email,
            Senha = @Senha
        WHERE ID_Pessoa = @ID_Profissional;

        -- Atualizar os dados na tabela Profissionais
        UPDATE Profissionais
        SET Especialidade = @Especialidade,
            Horarios = @Horarios,
            Custo = @Custo,
            SuperUsuario = @SuperUsuario
        WHERE ID_Profissional = @ID_Profissional;
    END
    ELSE
    BEGIN
        -- Profissional não encontrado
        RAISERROR('Profissional não encontrado com o ID especificado.', 16, 1);
    END
END;
GO

CREATE PROCEDURE sp_ExcluirProfissional
    @ID_Profissional INT
AS
BEGIN
    -- Verifica se o profissional existe
    IF EXISTS (SELECT 1 FROM Profissionais WHERE ID_Profissional = @ID_Profissional)
    BEGIN
        -- Deleta os agendamentos do profissional automaticamente (já tratado pelo Trigger)
        DELETE FROM Profissionais WHERE ID_Profissional = @ID_Profissional;

        -- Deletar a pessoa associada
        DELETE FROM Pessoas WHERE ID_Pessoa = @ID_Profissional;
    END
    ELSE
    BEGIN
        -- Profissional não encontrado
        RAISERROR('Profissional não encontrado com o ID especificado.', 16, 1);
    END
END;
GO

CREATE FUNCTION fn_ConsultarProfissional
(
    @ID_Profissional INT = NULL,
    @Nome            VARCHAR(50) = NULL,
    @Sexo            CHAR(1) = NULL,
    @Telefone        VARCHAR(15) = NULL,
    @Especialidade   VARCHAR(20) = NULL,
    @CustoMin        DECIMAL(10, 2) = NULL,
    @CustoMax        DECIMAL(10, 2) = NULL
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        P.ID_Pessoa AS ID_Profissional,
        P.Nome,
        P.Sexo,
        P.Telefone,
        P.Email,
        P.Data_Nasc,
        P.CPF,
        PR.Especialidade,
        PR.Horarios,
        PR.Custo,
        CASE 
            WHEN PR.SuperUsuario = 'S' THEN 'Sim'
            ELSE 'Não'
        END AS SuperUsuario
    FROM Pessoas P
    INNER JOIN Profissionais PR ON P.ID_Pessoa = PR.ID_Profissional
    WHERE 
        (@ID_Profissional IS NULL OR P.ID_Pessoa = @ID_Profissional)
        AND (@Nome IS NULL OR P.Nome LIKE '%' + @Nome + '%')
        AND (@Sexo IS NULL OR P.Sexo = @Sexo)
        AND (@Telefone IS NULL OR P.Telefone LIKE '%' + @Telefone + '%')
        AND (@Especialidade IS NULL OR PR.Especialidade LIKE '%' + @Especialidade + '%')
        AND (@CustoMin IS NULL OR PR.Custo >= @CustoMin)
        AND (@CustoMax IS NULL OR PR.Custo <= @CustoMax)
);
GO


create procedure sp_CadastrarServico
	@Descricao  varchar(50),
	@Duracao	time = '01:00:00',
	@Valor		float
as
begin
	declare @ID_Servico int;

	insert into Servicos(Descricao, Duracao, Valor)
		 values (@Descricao, @Duracao, @Valor);
end
go

create procedure sp_CadastrarAgendamento
    @ID_Profissional	int,
    @ID_Cliente			int,
	@ID_Servico			int,
    @Data_Hora			datetime,
    @Status_Agendamento bit
as
begin
    insert into Agendamentos (ID_Profissional, ID_Cliente, ID_Servico, Data_Hora, Status_Agendamento)
    values (@ID_Profissional, @ID_Cliente, @ID_Servico, @Data_Hora, @Status_Agendamento);
end
go


------ VIEWS QUE UTILIZAREMOS
CREATE VIEW vw_Clientes AS
SELECT 
    c.ID_Cliente,
    p.Nome,
    p.Telefone,
    p.Email,
    p.Data_Nasc,
    p.Cpf,
    c.Numero_Atend
FROM 
    Clientes c
JOIN 
    Pessoas p ON c.ID_Cliente = p.ID_Pessoa
go

CREATE VIEW vw_Profissionais AS
SELECT 
    p.ID_Pessoa AS ID_Profissional,
    p.Nome,
    p.Telefone,
    p.Email,
    p.Data_Nasc,
    p.Cpf,
    pr.Especialidade,
    pr.Horarios,
    pr.Custo
FROM 
    Profissionais pr
JOIN 
    Pessoas p ON pr.ID_Profissional = p.ID_Pessoa
go

CREATE VIEW vw_Agendamentos AS
SELECT 
    a.ID_Agendamento,
    p.Nome AS Nome_Cliente,  -- Nome do cliente
    pp.Nome AS Nome_Profissional,  -- Nome do profissional
    a.Data_Hora,
    CASE 
        WHEN a.Status_Agendamento = 1 THEN 'Ativo'
        WHEN a.Status_Agendamento = 0 THEN 'Inativo'
    END AS Status_Agendamento
FROM 
    Agendamentos a
JOIN 
    Clientes c ON a.ID_Cliente = c.ID_Cliente
JOIN 
    Pessoas p ON c.ID_Cliente = p.ID_Pessoa  -- Para pegar o nome do cliente
JOIN 
    Profissionais pr ON a.ID_Profissional = pr.ID_Profissional  -- Para relacionar com o profissional
JOIN 
    Pessoas pp ON pr.ID_Profissional = pp.ID_Pessoa  -- Aqui pegamos o nome do profissional
go

CREATE VIEW vw_ProfissionalAgendamentos AS
SELECT 
    a.ID_Agendamento,
    pp.Nome AS Nome_Profissional,  -- Nome do profissional
    p.Nome AS Nome_Cliente,  -- Nome do cliente
    a.Data_Hora,
    CASE 
        WHEN a.Status_Agendamento = 1 THEN 'Ativo'
        WHEN a.Status_Agendamento = 0 THEN 'Inativo'
    END AS Status_Agendamento
FROM 
    Agendamentos a
JOIN 
    Profissionais pr ON a.ID_Profissional = pr.ID_Profissional  -- Para relacionar com o profissional
JOIN 
    Pessoas pp ON pr.ID_Profissional = pp.ID_Pessoa  -- Aqui pegamos o nome do profissional
JOIN 
    Clientes c ON a.ID_Cliente = c.ID_Cliente  -- Para pegar o cliente
JOIN 
    Pessoas p ON c.ID_Cliente = p.ID_Pessoa  -- Para pegar o nome do cliente
go


--------TRIGGERS

CREATE TRIGGER trg_Log_Alteracao_Pessoa
ON Pessoas
AFTER UPDATE
AS
BEGIN
    DECLARE @ID_Pessoa INT, @OldNome VARCHAR(50), @NewNome VARCHAR(50);
    
    -- Obter os dados antigos e novos
    SELECT @ID_Pessoa = ID_Pessoa, @OldNome = Nome FROM deleted;
    SELECT @NewNome = Nome FROM inserted;

    -- Inserir a altera��o na tabela de log
    INSERT INTO LogAlteracoes (ID_Pessoa, Campo, ValorAntigo, ValorNovo, DataAlteracao)
    VALUES (@ID_Pessoa, 'Nome', @OldNome, @NewNome, GETDATE());
END
GO

CREATE TRIGGER trg_Deletar_Agendamentos_Profissional
ON Profissionais
AFTER DELETE
AS
BEGIN
    DECLARE @ProfissionalID INT;

    -- Obter o ID do profissional exclu�do
    SELECT @ProfissionalID = ID_Profissional FROM deleted;

    -- Deletar os agendamentos do profissional excluído
    DELETE FROM Agendamentos WHERE ID_Profissional = @ProfissionalID;
END;
GO


------------FUNCTION
CREATE FUNCTION fn_ObterTodosServicos ()
RETURNS TABLE
AS
RETURN
(
    SELECT ID_Servico, Descricao, Duracao, Valor
    FROM Servicos
);
GO

CREATE FUNCTION fn_ObterAgendamentosProfissional (@ID_Profissional INT)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        a.ID_Agendamento, 
        a.Data_Hora, 
        a.Status_Agendamento, 
        p.Nome AS Cliente,  -- Agora buscando o nome da tabela Pessoas
        s.Descricao AS Servico
    FROM Agendamentos a
    JOIN Clientes c ON a.ID_Cliente = c.ID_Cliente
    JOIN Pessoas p ON c.ID_Cliente = p.ID_Pessoa  -- Aqui estamos buscando o nome da tabela Pessoas
    JOIN Servicos s ON a.ID_Servico = s.ID_Servico
    WHERE a.ID_Profissional = @ID_Profissional
)
GO

use master
go



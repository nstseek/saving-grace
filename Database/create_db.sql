-- MySQL Script generated by MySQL Workbench
-- Sat Oct  3 20:36:05 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema u514786799_savinggrace
-- -----------------------------------------------------
-- 
-- 

-- -----------------------------------------------------
-- Schema u514786799_savinggrace
--
-- 
-- 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `u514786799_savinggrace` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `u514786799_savinggrace` ;

-- -----------------------------------------------------
-- Table `u514786799_savinggrace`.`Imagem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `u514786799_savinggrace`.`Imagem` ;

CREATE TABLE IF NOT EXISTS `u514786799_savinggrace`.`Imagem` (
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nomeArquivo` VARCHAR(300) NOT NULL,
  `conteudo` LONGBLOB NOT NULL,
  `EmpresaId` INT UNIQUE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Imagem_Empresa_idx` (`EmpresaId` ASC),
  CONSTRAINT `fk_Imagem_Empresa`
    FOREIGN KEY (`EmpresaId`)
    REFERENCES `u514786799_savinggrace`.`Empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `u514786799_savinggrace`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `u514786799_savinggrace`.`Usuario` ;

CREATE TABLE IF NOT EXISTS `u514786799_savinggrace`.`Usuario` (
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(300) NOT NULL,
  `saldo` INT NOT NULL,
  `email` VARCHAR(300) NOT NULL,
  `senha` VARCHAR(300) NOT NULL,
  `cnpj` VARCHAR(14) NULL,
  `cpf` VARCHAR(11) NULL,
  `ImagemId` INT UNIQUE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Usuario_Imagem1_idx` (`ImagemId` ASC),
  CONSTRAINT `fk_Usuario_Imagem1`
    FOREIGN KEY (`ImagemId`)
    REFERENCES `u514786799_savinggrace`.`Imagem` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `u514786799_savinggrace`.`Empresa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `u514786799_savinggrace`.`Empresa` ;

CREATE TABLE IF NOT EXISTS `u514786799_savinggrace`.`Empresa` (
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(300) NOT NULL,
  `descricao` LONGTEXT NOT NULL,
  `saldo` DECIMAL(20,2) NOT NULL,
  `website` VARCHAR(300) NULL,
  `facebook` VARCHAR(300) NULL,
  `twitter` VARCHAR(300) NULL,
  `UsuarioId` INT UNIQUE NOT NULL,
  `dataLimite` DATE NULL,
  `instagram` VARCHAR(300) NULL,
  `youtube` VARCHAR(300) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Empresa_Usuario1_idx` (`UsuarioId` ASC),
  CONSTRAINT `fk_Empresa_Usuario1`
    FOREIGN KEY (`UsuarioId`)
    REFERENCES `u514786799_savinggrace`.`Usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `u514786799_savinggrace`.`Avaliacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `u514786799_savinggrace`.`Avaliacao` ;

CREATE TABLE IF NOT EXISTS `u514786799_savinggrace`.`Avaliacao` (
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(300) NOT NULL,
  `conteudo` VARCHAR(4000) NOT NULL,
  `rating` INT NOT NULL,
  `EmpresaId` INT UNIQUE NOT NULL,
  `UsuarioId` INT UNIQUE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Avaliacao_Empresa1_idx` (`EmpresaId` ASC),
  INDEX `fk_Avaliacao_Usuario1_idx` (`UsuarioId` ASC),
  CONSTRAINT `fk_Avaliacao_Empresa1`
    FOREIGN KEY (`EmpresaId`)
    REFERENCES `u514786799_savinggrace`.`Empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Avaliacao_Usuario1`
    FOREIGN KEY (`UsuarioId`)
    REFERENCES `u514786799_savinggrace`.`Usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `u514786799_savinggrace`.`Comentario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `u514786799_savinggrace`.`Comentario` ;

CREATE TABLE IF NOT EXISTS `u514786799_savinggrace`.`Comentario` (
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(300) NOT NULL,
  `conteudo` VARCHAR(4000) NOT NULL,
  `EmpresaId` INT UNIQUE NOT NULL,
  `UsuarioId` INT UNIQUE NOT NULL,
  `ComentarioId` INT UNIQUE NULL COMMENT 'Caso seja um reply, aqui vai o link para o comentário raíz',
  PRIMARY KEY (`id`),
  INDEX `fk_Comentario_Empresa1_idx` (`EmpresaId` ASC),
  INDEX `fk_Comentario_Usuario1_idx` (`UsuarioId` ASC),
  INDEX `fk_Comentario_Comentario1_idx` (`ComentarioId` ASC),
  CONSTRAINT `fk_Comentario_Empresa1`
    FOREIGN KEY (`EmpresaId`)
    REFERENCES `u514786799_savinggrace`.`Empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentario_Usuario1`
    FOREIGN KEY (`UsuarioId`)
    REFERENCES `u514786799_savinggrace`.`Usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentario_Comentario1`
    FOREIGN KEY (`ComentarioId`)
    REFERENCES `u514786799_savinggrace`.`Comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `u514786799_savinggrace`.`Premios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `u514786799_savinggrace`.`Premios` ;

CREATE TABLE IF NOT EXISTS `u514786799_savinggrace`.`Premios` (
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `valor` INT NOT NULL,
  `titulo` VARCHAR(300) NOT NULL,
  `descricao` VARCHAR(4000) NOT NULL,
  `ImagemId` INT UNIQUE NULL,
  `EmpresaId` INT UNIQUE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Premios_Imagem1_idx` (`ImagemId` ASC),
  INDEX `fk_Premios_Empresa1_idx` (`EmpresaId` ASC),
  CONSTRAINT `fk_Premios_Imagem1`
    FOREIGN KEY (`ImagemId`)
    REFERENCES `u514786799_savinggrace`.`Imagem` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Premios_Empresa1`
    FOREIGN KEY (`EmpresaId`)
    REFERENCES `u514786799_savinggrace`.`Empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `u514786799_savinggrace`.`Transacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `u514786799_savinggrace`.`Transacao` ;

CREATE TABLE IF NOT EXISTS `u514786799_savinggrace`.`Transacao` (
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `valor` INT NOT NULL,
  `UsuarioId` INT UNIQUE NOT NULL,
  `EmpresaId` INT UNIQUE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Transacao_Usuario1_idx` (`UsuarioId` ASC),
  INDEX `fk_Transacao_Empresa1_idx` (`EmpresaId` ASC),
  CONSTRAINT `fk_Transacao_Usuario1`
    FOREIGN KEY (`UsuarioId`)
    REFERENCES `u514786799_savinggrace`.`Usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transacao_Empresa1`
    FOREIGN KEY (`EmpresaId`)
    REFERENCES `u514786799_savinggrace`.`Empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `u514786799_savinggrace`.`Favorito`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `u514786799_savinggrace`.`Favorito` ;

CREATE TABLE IF NOT EXISTS `u514786799_savinggrace`.`Favorito` (
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `UsuarioId` INT UNIQUE NOT NULL,
  `EmpresaId` INT UNIQUE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Favorito_Usuario1_idx` (`UsuarioId` ASC),
  INDEX `fk_Favorito_Empresa1_idx` (`EmpresaId` ASC),
  CONSTRAINT `fk_Favorito_Usuario1`
    FOREIGN KEY (`UsuarioId`)
    REFERENCES `u514786799_savinggrace`.`Usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Favorito_Empresa1`
    FOREIGN KEY (`EmpresaId`)
    REFERENCES `u514786799_savinggrace`.`Empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

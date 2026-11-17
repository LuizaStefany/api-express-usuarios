const Usuario = require("../models/usuarioModel");

function obterId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    res.status(400).json({ erro: "ID inválido" });
    return null;
  }
  return id;
}

function obterNome(req, res) {
  const nome = req.body?.nome;
  if (typeof nome !== "string" || !nome.trim()) {
    res.status(400).json({ erro: "Informe um nome válido" });
    return null;
  }
  return nome.trim();
}

exports.listar = (req, res) => res.json(Usuario.listar());

exports.buscarPorId = (req, res) => {
  const id = obterId(req, res);
  if (id === null) return;
  const usuario = Usuario.buscarPorId(id);
  if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
  res.json(usuario);
};

exports.criar = (req, res) => {
  const nome = obterNome(req, res);
  if (nome === null) return;
  res.status(201).json(Usuario.criar(nome));
};

exports.atualizar = (req, res) => {
  const id = obterId(req, res);
  if (id === null) return;
  if (!Usuario.buscarPorId(id)) return res.status(404).json({ erro: "Usuário não encontrado" });
  const nome = obterNome(req, res);
  if (nome === null) return;
  res.json(Usuario.atualizar(id, nome));
};

exports.remover = (req, res) => {
  const id = obterId(req, res);
  if (id === null) return;
  if (!Usuario.remover(id)) return res.status(404).json({ erro: "Usuário não encontrado" });
  res.json({ mensagem: "Usuário removido" });
};

let usuarios = [{ id: 1, nome: "João" }, { id: 2, nome: "Maria" }];
let proximoId = 3;

module.exports = {
  listar: () => usuarios,
  buscarPorId: (id) => usuarios.find(usuario => usuario.id === id),
  criar: (nome) => {
    const usuario = { id: proximoId++, nome };
    usuarios.push(usuario);
    return usuario;
  },
  atualizar: (id, nome) => {
    const usuario = usuarios.find(usuario => usuario.id === id);
    if (usuario) usuario.nome = nome;
    return usuario;
  },
  remover: (id) => {
    const index = usuarios.findIndex(usuario => usuario.id === id);
    if (index === -1) return false;
    usuarios.splice(index, 1);
    return true;
  }
};

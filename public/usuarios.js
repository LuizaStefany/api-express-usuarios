const API_URL = "/usuarios";
const lista = document.getElementById("usuarios");
const status = document.getElementById("status");
const formulario = document.getElementById("formulario");
const input = document.getElementById("nome");

async function requisitar(url, options) {
  const resposta = await fetch(url, options);
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.erro || "Não foi possível concluir a operação");
  return dados;
}

async function carregar() {
  const usuarios = await requisitar(API_URL);
  lista.replaceChildren();
  for (const usuario of usuarios) {
    const item = document.createElement("li");
    const nome = document.createElement("span");
    nome.textContent = usuario.id + " - " + usuario.nome;
    item.append(nome);
    for (const acao of ["Editar", "Excluir"]) {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.textContent = acao;
      botao.setAttribute("aria-label", acao + " usuário " + usuario.nome);
      if (acao === "Excluir") botao.className = "excluir";
      botao.addEventListener("click", async () => {
        const novoNome = acao === "Editar" ? prompt("Novo nome:", usuario.nome) : null;
        if (acao === "Editar" && (novoNome === null || !novoNome.trim())) return;
        botao.disabled = true;
        try {
          await requisitar(API_URL + "/" + usuario.id, acao === "Excluir"
            ? { method: "DELETE" }
            : { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nome: novoNome.trim() }) });
          await carregar();
          status.textContent = acao === "Excluir" ? "Usuário removido." : "Usuário atualizado.";
        } catch (erro) { status.textContent = erro.message; }
        finally { botao.disabled = false; }
      });
      item.append(botao);
    }
    lista.append(item);
  }
  if (!usuarios.length) status.textContent = "Nenhum usuário cadastrado.";
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const nome = input.value.trim();
  if (!nome) { status.textContent = "Informe um nome válido."; return; }
  const botao = formulario.querySelector("button");
  botao.disabled = true;
  try {
    await requisitar(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nome }) });
    input.value = "";
    await carregar();
    status.textContent = "Usuário adicionado.";
    input.focus();
  } catch (erro) { status.textContent = erro.message; }
  finally { botao.disabled = false; }
});

carregar().catch(erro => { status.textContent = erro.message; });

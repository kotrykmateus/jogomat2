let integridade = 100;
let etapa = 1;
let cenaAtual = "inicio";

const elementoCena = document.getElementById("cena");
const elementoBarra = document.getElementById("barra-integridade");
const elementoValor = document.getElementById("valor-integridade");
const contadorEtapas = document.getElementById("contador-etapas");

const cenas = {
    inicio: {
        titulo: "Turno 08:00",
        texto: "Uma luz vermelha pisca no painel da rede. Gabriela recebeu um alerta incomum e Mateus encontrou uma conta entrando fora de horário. Você assume o turno e precisa descobrir o que está acontecendo.",
        opcoes: [
            { texto: "Investigar os logs em detalhes", mensagem: "Você abre o registro de atividades e começa a separar os eventos.", mudanca: 5, proxima: "log1" },
            { texto: "Isolar imediatamente a conta suspeita", mensagem: "A conta é bloqueada enquanto os demais sistemas continuam funcionando.", mudanca: 5, proxima: "bloqueio1" },
            { texto: "Iniciar uma investigação completa do incidente", mensagem: "Você abre um protocolo detalhado para revisar todo o ataque.", mudanca: 5, proxima: "longa1" },
            { texto: "Ignorar o alerta e continuar o turno", mensagem: "Você fecha o painel. O ataque aproveita a distração.", mudanca: -20, proxima: "gameoverNegligencia" }
        ]
    },

    // Caminho 1: resposta rápida
    bloqueio1: {
        titulo: "Conta isolada",
        texto: "A conta suspeita não consegue mais entrar. Agora o painel revela outras sessões iniciadas no mesmo endereço.",
        opcoes: [
            { texto: "Revogar todas as sessões", mensagem: "Todas as sessões externas são encerradas.", mudanca: 10, proxima: "bloqueio2" },
            { texto: "Trocar apenas a senha", mensagem: "A senha muda, mas o invasor ainda pode usar uma sessão ativa.", mudanca: -5, proxima: "bloqueio2" }
        ]
    },
    bloqueio2: {
        titulo: "Novos pedidos de acesso",
        texto: "Mesmo com a conta isolada, um robô faz dezenas de tentativas por diferentes pontos de entrada.",
        opcoes: [
            { texto: "Ativar o limite de tentativas", mensagem: "O sistema começa a bloquear tentativas repetidas automaticamente.", mudanca: 10, proxima: "bloqueio3" },
            { texto: "Desligar apenas o servidor público", mensagem: "O ataque para, mas o serviço externo fica indisponível.", mudanca: -15, proxima: "bloqueio3" }
        ]
    },
    bloqueio3: {
        titulo: "Escaneamento da rede",
        texto: "Você encontra uma configuração antiga que aceita autenticação sem segunda confirmação.",
        opcoes: [
            { texto: "Corrigir a configuração", mensagem: "A regra antiga é substituída por uma política segura.", mudanca: 15, proxima: "bloqueio4" },
            { texto: "Deixar a configuração ativa", mensagem: "O invasor encontra uma nova brecha.", mudanca: -25, proxima: "gameoverBreach" }
        ]
    },
    bloqueio4: {
        titulo: "Proteção em preparação",
        texto: "A rede está estável. O próximo passo é decidir como manter a equipe protegida no futuro.",
        opcoes: [
            { texto: "Ativar autenticação em dois fatores", mensagem: "A segunda confirmação é exigida em todos os acessos.", mudanca: 15, proxima: "finalFortaleza" },
            { texto: "Confiar apenas em um novo firewall", mensagem: "O firewall ajuda, mas não protege contas roubadas.", mudanca: 5, proxima: "finalFortaleza" }
        ]
    },

    // Caminho 2: investigação
    log1: {
        titulo: "Primeiro registro",
        texto: "O log mostra que o ataque começou às 07:12. Gabriela confirma que ninguém deveria estar usando a rede nesse horário.",
        opcoes: [
            { texto: "Pesquisar o endereço de origem", mensagem: "Você rastreia a origem até uma rede que já apareceu em alertas anteriores.", mudanca: 10, proxima: "log2" },
            { texto: "Apagar o log suspeito", mensagem: "A evidência desaparece antes de ser analisada.", mudanca: -20, proxima: "gameoverBreach" }
        ]
    },
    log2: {
        titulo: "Padrão identificado",
        texto: "Os registros revelam quatro contas consultadas. Uma delas pode ter sido comprometida por phishing.",
        opcoes: [
            { texto: "Treinar usuários sobre phishing", mensagem: "A equipe recebe instruções claras e começa a reconhecer mensagens falsas.", mudanca: 10, proxima: "log3" },
            { texto: "Ocultar o incidente dos usuários", mensagem: "A equipe continua vulnerável porque não recebe aviso.", mudanca: -15, proxima: "log3" }
        ]
    },
    log3: {
        titulo: "Conta de alto privilégio",
        texto: "A conta mais poderosa da rede foi acessada por poucos segundos. Mateus sugere revogar todas as permissões temporariamente.",
        opcoes: [
            { texto: "Aplicar menor privilégio", mensagem: "Cada usuário passa a receber apenas o acesso necessário.", mudanca: 15, proxima: "log4" },
            { texto: "Manter todas as permissões", mensagem: "O invasor poderia agir em vários setores ao mesmo tempo.", mudanca: -20, proxima: "gameoverNegligencia" }
        ]
    },
    log4: {
        titulo: "Plano de defesa",
        texto: "Com os registros organizados, você prepara um plano para responder a futuros ataques.",
        opcoes: [
            { texto: "Criar monitoramento contínuo", mensagem: "Alertas passam a ser enviados para a equipe imediatamente.", mudanca: 15, proxima: "finalVigilancia" },
            { texto: "Organizar uma rotina de defesa coletiva", mensagem: "Gabriela e Mateus recebem funções claras na resposta a incidentes.", mudanca: 15, proxima: "finalEquipe" },
            { texto: "Fazer um relatório sem agir", mensagem: "Informação existe, mas a rede continua aberta.", mudanca: -10, proxima: "finalVigilancia" }
        ]
    },

    // Caminho longo: pelo menos 12 etapas após o início
    longa1: {
        titulo: "Etapa 1 — Arquivo recebido",
        texto: "A equipe encontra um arquivo anexado a uma mensagem suspeita.",
        opcoes: [{ texto: "Analisar em ambiente isolado", mensagem: "O arquivo é enviado para uma área sem acesso à rede.", mudanca: 10, proxima: "longa2" }]
    },
    longa2: {
        titulo: "Etapa 2 — Conteúdo do anexo",
        texto: "No ambiente isolado, o arquivo tenta executar um script oculto.",
        opcoes: [
            { texto: "Bloquear o script", mensagem: "A execução é interrompida antes de acessar dados.", mudanca: 10, proxima: "longa3" },
            { texto: "Executar fora do isolado", mensagem: "O script encontra acesso à rede real.", mudanca: -30, proxima: "gameoverMalware" }
        ]
    },
    longa3: {
        titulo: "Etapa 3 — Remetente falso",
        texto: "Os metadados mostram que o remetente foi falsificado.",
        opcoes: [{ texto: "Marcar o domínio como malicioso", mensagem: "Mensagens desse domínio passam a ser bloqueadas.", mudanca: 10, proxima: "longa4" }]
    },
    longa4: {
        titulo: "Etapa 4 — Contas conectadas",
        texto: "Algumas contas abriram o anexo antes da análise.",
        opcoes: [
            { texto: "Preservar os dados das contas", mensagem: "Você troca apenas o necessário para evitar perda.", mudanca: 10, proxima: "longa5" },
            { texto: "Excluir todas as contas", mensagem: "Dados legítimos são perdidos desnecessariamente.", mudanca: -20, proxima: "gameoverMalware" }
        ]
    },
    longa5: {
        titulo: "Etapa 5 — Tokens ativos",
        texto: "Sessões antigas continuam válidas mesmo após o alerta.",
        opcoes: [{ texto: "Revogar tokens antigos", mensagem: "As sessões antigas deixam de funcionar.", mudanca: 10, proxima: "longa6" }]
    },
    longa6: {
        titulo: "Etapa 6 — Segmentação",
        texto: "O script tentou alcançar outros setores da rede.",
        opcoes: [
            { texto: "Separar os setores", mensagem: "Um setor não pode mais movimentar dados livremente pelo outro.", mudanca: 15, proxima: "longa7" },
            { texto: "Libertar todas as regras", mensagem: "A proteção da segmentação desaparece.", mudanca: -25, proxima: "gameoverBreach" }
        ]
    },
    longa7: {
        titulo: "Etapa 7 — Cópias de segurança",
        texto: "Os backups estão atualizados, mas ninguém verificou se podem ser restaurados.",
        opcoes: [{ texto: "Testar uma restauração", mensagem: "Você confirma que os dados podem voltar a funcionar.", mudanca: 15, proxima: "longa8" }]
    },
    longa8: {
        titulo: "Etapa 8 — Senhas duplicadas",
        texto: "O sistema encontra várias contas reutilizando a mesma senha.",
        opcoes: [
            { texto: "Forçar senhas exclusivas", mensagem: "Cada conta passa a usar uma senha independente.", mudanca: 15, proxima: "longa9" },
            { texto: "Permitir reutilização", mensagem: "Uma senha roubada continua valendo em várias contas.", mudanca: -15, proxima: "longa9" }
        ]
    },
    longa9: {
        titulo: "Etapa 9 — Comunicação segura",
        texto: "Gabriela e Mateus precisam trocar informações técnicas sem expor dados.",
        opcoes: [{ texto: "Usar canal criptografado", mensagem: "A comunicação passa por um canal protegido.", mudanca: 10, proxima: "longa10" }]
    },
    longa10: {
        titulo: "Etapa 10 — Simulação",
        texto: "Você realiza um exercício curto para testar a equipe.",
        opcoes: [
            { texto: "Avaliar todos os grupos", mensagem: "A equipe demonstra melhor resposta ao alerta.", mudanca: 15, proxima: "longa11" },
            { texto: "Testar sem avisar", mensagem: "O exercício causa confusão e vários erros.", mudanca: -10, proxima: "longa11" }
        ]
    },
    longa11: {
        titulo: "Etapa 11 — Atualizações pendentes",
        texto: "Dois serviços críticos ainda não receberam correções de segurança.",
        opcoes: [{ texto: "Aplicar as atualizações", mensagem: "As falhas conhecidas são corrigidas.", mudanca: 15, proxima: "longa12" }]
    },
    longa12: {
        titulo: "Etapa 12 — Resposta documentada",
        texto: "A defesa está funcionando. Falta registrar o incidente para melhorar a próxima resposta.",
        opcoes: [
            { texto: "Criar manual de resposta", mensagem: "A equipe recebe um processo claro para futuros incidentes.", mudanca: 20, proxima: "finalVigilancia" },
            { texto: "Apagar todos os registros", mensagem: "Os aprendizados desaparecem junto com as evidências.", mudanca: -25, proxima: "gameoverNegligencia" }
        ]
    },

    finalFortaleza: {
        titulo: "Final 1 — Fortaleza Digital",
        texto: "Você contém o ataque com bloqueios, autenticação em dois fatores e regras revisadas. A rede fica protegida e o acesso só é liberado com confirmação.",
        tipo: "sucesso",
        opcoes: []
    },
    finalVigilancia: {
        titulo: "Final 2 — Vigilância Permanente",
        texto: "A equipe cria monitoramento, backups testados e procedimentos documentados. O ataque não impede o trabalho e novos riscos são detectados mais cedo.",
        tipo: "sucesso",
        opcoes: []
    },
    finalEquipe: {
        titulo: "Final 3 — Defesa em Equipe",
        texto: "Gabriela, Mateus e você transformam a resposta em uma rotina coletiva. Treinamento, comunicação e responsabilidades claras tornam a segurança parte do dia a dia.",
        tipo: "sucesso",
        opcoes: []
    },

    gameoverNegligencia: {
        titulo: "GAME OVER — Alerta Ignorado",
        texto: "Sem reação imediata, o atacante conquista contas importantes e bloqueia o acesso da equipe. A rede fica comprometida.",
        tipo: "derrota",
        opcoes: []
    },
    gameoverBreach: {
        titulo: "GAME OVER — Acesso Comprometido",
        texto: "Você deixou uma brecha aberta. Dados sensíveis foram copiados e a confiança da empresa na rede foi perdida.",
        tipo: "derrota",
        opcoes: []
    },
    gameoverMalware: {
        titulo: "GAME OVER — Arquivo no Sistema",
        texto: "O arquivo malicioso foi executado fora do ambiente seguro e chegou aos serviços principais. É necessário reiniciar a defesa.",
        tipo: "derrota",
        opcoes: []
    }
};

function atualizarBarra() {
    if (integridade < 0) integridade = 0;
    if (integridade > 100) integridade = 100;
    elementoBarra.style.width = integridade + "%";
    elementoValor.textContent = integridade + "%";

    if (integridade >= 70) {
        elementoBarra.style.backgroundColor = "#4ade80";
        elementoValor.style.color = "#4ade80";
    } else if (integridade >= 40) {
        elementoBarra.style.backgroundColor = "#facc15";
        elementoValor.style.color = "#facc15";
    } else {
        elementoBarra.style.backgroundColor = "#ef4444";
        elementoValor.style.color = "#ef4444";
    }
}

function renderizarCena() {
    const cena = cenas[cenaAtual];
    const classeFinal = cena.tipo === "sucesso" ? "final-sucesso" : cena.tipo === "derrota" ? "final-derrota" : "";

    contadorEtapas.textContent = `Etapa ${etapa} · ${cena.tipo === "derrota" ? "Game Over" : cena.tipo === "sucesso" ? "Final alcançado" : "Caminho de investigação"}`;

    let html = `<div class="${classeFinal}"><h2>${cena.titulo}</h2><p>${cena.texto}</p>`;

    if (cena.opcoes.length > 0) {
        html += '<div class="opcoes">';
        cena.opcoes.forEach((opcao, indice) => {
            html += `<button class="botao-opcao" data-indice="${indice}">${opcao.texto}</button>`;
        });
        html += "</div>";
    } else {
        html += `<button class="botao-reiniciar" id="botao-reiniciar">🔄 Jogar Novamente</button>`;
    }

    html += "</div>";
    elementoCena.innerHTML = html;

    elementoCena.querySelectorAll(".botao-opcao").forEach(botao => {
        botao.addEventListener("click", () => escolherOpcao(parseInt(botao.dataset.indice)));
    });

    const botaoReiniciar = document.getElementById("botao-reiniciar");
    if (botaoReiniciar) botaoReiniciar.addEventListener("click", reiniciarJogo);
}

function escolherOpcao(indice) {
    const opcao = cenas[cenaAtual].opcoes[indice];
    integridade += opcao.mudanca;
    atualizarBarra();

    cenaAtual = opcao.proxima;
    etapa += 1;

    const proximaCena = cenas[cenaAtual];
    const classeFeedback = opcao.mudanca < 0 ? "mensagem-feedback alerta" : "mensagem-feedback";
    elementoCena.innerHTML = `
        <div>
            <h2>${proximaCena.titulo}</h2>
            <div class="${classeFeedback}">${opcao.mensagem}</div>
            <p>${proximaCena.texto}</p>
        </div>
    `;
    contadorEtapas.textContent = `Etapa ${etapa} · ${proximaCena.tipo === "derrota" ? "Game Over" : "Caminho de investigação"}`;

    setTimeout(renderizarCena, 1200);
}

function reiniciarJogo() {
    integridade = 100;
    etapa = 1;
    cenaAtual = "inicio";
    atualizarBarra();
    renderizarCena();
}

atualizarBarra();
renderizarCena();
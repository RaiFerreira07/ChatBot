$(document).ready(function () {

    async function enviarPergunta() {
        let pergunta = $("#input").val().trim();
        if (!pergunta) return;

        // Mensagem do usuário (direita)
        $("#naosei").append(`
            <div style="
                align-self: flex-end;
                background-color: #595959;
                color: white;
                text-align: right;
                max-width: 60%;
                padding: 10px;
                border-radius: 10px;
                word-wrap: break-word;
                margin: 5px 0;
            ">
                ${pergunta}
            </div>
        `);

        // Limpa o input imediatamente
        $("#input").val("");

        // Animação de "digitando..." do bot
        let digitando = $(`
            <div class="mensagem bot" style="
                display:flex; gap:5px; align-items:center;
                padding:5px 10px; color:white;
                border-radius:10px; max-width:60%; min-width:50px;
            ">
                <span style="display:block;width:8px;height:8px;background-color:#1F598C;border-radius:50%;animation:piscar 1s infinite;"></span>
                <span style="display:block;width:8px;height:8px;background-color:#1F598C;border-radius:50%;animation:piscar 1s infinite 0.2s;"></span>
                <span style="display:block;width:8px;height:8px;background-color:#1F598C;border-radius:50%;animation:piscar 1s infinite 0.4s;"></span>
            </div>
        `);

        $("#naosei").append(digitando);

        // Chama o backend
        let resposta = await $.post("/Chat/EnviarPergunta", { pergunta: pergunta });

        // Remove o "digitando..."
        digitando.remove();

        // Mensagem do bot (esquerda)
        $("#naosei").append(`
            <div style="
                align-self: flex-start;
                background-color: #595959;
                color: white;
                text-align: left;
                max-width: 60%;
                padding: 10px;
                border-radius: 10px;
                word-wrap: break-word;
                margin: 5px 0;
            ">
                ${resposta}
            </div>
        `);

        // Scroll automático pro final
        $("#naosei").scrollTop($("#naosei")[0].scrollHeight);
    }

    // Clique no botão
    $("#texto button").click(enviarPergunta);

    // Teclas de atalho (Enter e Space)
    $(document).keydown(function (e) {
        if (e.which === 13) { // Enter
            e.preventDefault();
            enviarPergunta();
        } else if (e.which === 32) { // Space
            $("#input").focus();
        }
    });
});
$("<style>@keyframes piscar { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }</style>").appendTo("head");

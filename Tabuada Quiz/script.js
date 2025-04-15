const botaoIniciar = document.querySelector('.botao_iniciar');
const caixaInstrucoes = document.querySelector('.caixa_instrucoes');
const botaoSair = document.querySelector('.sair_btn');
const main = document.querySelector('.main');
const botaoContinuar = document.querySelector('.continuar_btn');
const quizPerguntas = document.querySelector('.quiz_perguntas');
const quizBox = document.querySelector('.quiz-box');
const resultadoBox = document.querySelector('.resultado-box');
const jogarNovamenteBtn = document.querySelector('.jogarNovamente-btn');
const voltarIncioBtn = document.querySelector('.inicio-btn');

botaoIniciar.onclick = () => {
    caixaInstrucoes.classList.add('active');
    main.classList.add('active');
}

botaoSair.onclick = () => {
    caixaInstrucoes.classList.remove('active');
    main.classList.remove('active');
}

botaoContinuar.onclick = () => {
    quizPerguntas.classList.add('active');
    caixaInstrucoes.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCont(1);
    headerPontuacao();
}

jogarNovamenteBtn.onclick = () => {
    quizBox.classList.add('active');
    proximoBtn.classList.remove('active');
    resultadoBox.classList.remove('active');

     questionCount = 0;
     questionNumb = 1;
     userPontuacao = 0;
     showQuestions(questionCount);
     questionCont(questionNumb);

     headerPontuacao();
}

voltarIncioBtn.onclick = () => {
    quizPerguntas.classList.remove('active');
    proximoBtn.classList.remove('active');
    resultadoBox.classList.remove('active');

     questionCount = 0;
     questionNumb = 1;
     userPontuacao = 0;
     showQuestions(questionCount);
     questionCont(questionNumb);
}

let questionCount = 0;
let questionNumb = 1;
let userPontuacao = 0;

const proximoBtn = document.querySelector('.proximo-btn');

proximoBtn.onclick = () => {
    if (questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCont(questionNumb);

        proximoBtn.classList.remove('ativo');
    } else {
        showResultadoBox();
    }   
}

const opcaoLista = document.querySelector('.opcoes-lista');

function showQuestions(index){
    const textosQuestoes = document.querySelector('.textos-questoes');
    textosQuestoes.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let opcaoTag = `<div class="opcao"><span>${questions[index].Options[0]}</span></div>
        <div class="opcao"><span>${questions[index].Options[1]}</span></div>
        <div class="opcao"><span>${questions[index].Options[2]}</span></div>
        <div class="opcao"><span>${questions[index].Options[3]}</span></div>`;

        opcaoLista.innerHTML = opcaoTag;

        const opcao = document.querySelectorAll('.opcao');
        for (let i = 0; i < opcao.length; i++){
            opcao[i].setAttribute('onclick', 'optionSeleceted(this)');
        }
}

function optionSeleceted(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer
    let todasOpecoes = opcaoLista.children.length;

    if (userAnswer == correctAnswer){
        answer.classList.add('correta');
        userPontuacao += 1;
        headerPontuacao();
    } else {
        answer.classList.add('incorreta');

        for (let i = 0; i < todasOpecoes; i++){
           if (opcaoLista.children[i].textContent == correctAnswer){
            opcaoLista.children[i].setAttribute('class', 'opcao correta');
           }
        }
    }

    for (let i = 0; i <todasOpecoes; i++){
        opcaoLista.children[i].classList.add('desabilitado');
    }

    proximoBtn.classList.add('ativo');
}

function questionCont(index){
    const questionTotal = document.querySelector('.total-questoes');
    questionTotal.textContent = `${index} de ${questions.length} Questões`;
}

function headerPontuacao(){
    const headerPontuacaoTexto = document.querySelector('.cabecalho-pontuacao');
    headerPontuacaoTexto.textContent =  `Pontuação: ${userPontuacao} / ${questions.length}`;
}

function showResultadoBox(){
    quizBox.classList.remove('active');
    resultadoBox.classList.add('active');

    const pontuacaoTexto = document.querySelector('.pontucao-texto');
    pontuacaoTexto.textContent = `Você Acertou ${userPontuacao} de ${questions.length} Questões`;

    const circularGrafico = document.querySelector('.circular-grafico');
    const porcentagemAcertos = document.querySelector('.porcentagem-acertos');
    let inicioPorcentagemAcertos = -1;
    let finalPorcentagemAcertos = (userPontuacao / questions.length) * 100;
    let velocidade = 20;

    let porcentagem = setInterval(() => {
        inicioPorcentagemAcertos++;

        porcentagemAcertos.textContent = `${inicioPorcentagemAcertos}%`;
        circularGrafico.style.background = `conic-gradient(#222294 ${inicioPorcentagemAcertos * 3.6}deg, #999 0deg)`;

        if (inicioPorcentagemAcertos >= finalPorcentagemAcertos){
            clearInterval(porcentagem);
        }
    }, velocidade);
}
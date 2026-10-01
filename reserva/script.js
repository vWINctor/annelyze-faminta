// Utilitários
function $(id) {
  return document.getElementById(id);
}

function ir(pagina) {
  location.href = pagina;
}

// Botões de navegação (só existem em algumas páginas)
if ($('login')) $('login').onclick = function () { ir('2.html'); };
if ($('inicio')) $('inicio').onclick = function () { ir('1.html'); };
if ($('signin')) $('signin').onclick = function () { ir('3.html'); };

// Página 1: opções protegidas levam ao login
// Página 4: opções mostram "teste concluido"
var opcoes = document.querySelectorAll('[data-o]');
var toast = $('toast');
var timer;

opcoes.forEach(function (b) {
  b.onclick = function () {
    if (!toast) {
      ir('2.html');
      return;
    }
    toast.classList.add('on');
    clearTimeout(timer);
    timer = setTimeout(function () {
      toast.classList.remove('on');
    }, 1800);
  };
});

if (toast) {
  toast.onclick = function () {
    toast.classList.remove('on');
  };
}

// Página 4: mostra o nome no canto superior direito
if ($('user')) {
  var p = new URLSearchParams(location.search).get('nome');
  var nome = p || localStorage.getItem('nome') || 'Visitante';
  if (p) localStorage.setItem('nome', p);
  $('user').textContent = nome;
}

// Páginas 2 e 3: validação e envio do formulário
if ($('enviar')) {
  $('enviar').onclick = function () {
    var campoNome = $('nome');
    var email = $('email').value.trim();
    var senha = $('senha').value.trim();
    var n = campoNome ? campoNome.value.trim() : 'ok';

    if (!n || !email || !senha) {
      $('err').classList.add('on');
      return;
    }

    var nomeFinal = campoNome ? n : (localStorage.getItem('nome') || email.split('@')[0]);
    localStorage.setItem('nome', nomeFinal);
    ir('4.html?nome=' + encodeURIComponent(nomeFinal));
  };
}

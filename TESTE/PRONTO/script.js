// Selecione o botão e o menu
const btn = document.querySelector('.btn');
const menu = document.querySelector('.menu');

// Adicione evento de clique ao botão
btn.addEventListener('click', () => {
  // Alterne a classe 'active' no botão e no menu
  btn.classList.toggle('active');
  menu.classList.toggle('active');
});

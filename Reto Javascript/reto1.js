const columns = document.querySelectorAll('.column');
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
});

columns.forEach(column => {
  column.addEventListener('dragover', dragOver);
  column.addEventListener('dragenter', dragEnter);
  column.addEventListener('dragleave', dragLeave);
  column.addEventListener('drop', drop);
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', this.id);
}

function dragEnd() {
  // No se requiere ninguna acción al finalizar el arrastre
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('hovered');
}

function dragLeave() {
  this.classList.remove('hovered');
}

function drop(e) {
  const cardId = e.dataTransfer.getData('text/plain');
  const card = document.getElementById(cardId);
  this.appendChild(card);
  this.classList.remove('hovered');
}

const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');

openModal.addEventListener('click', function() {
  modal.style.display = 'block';
});

window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});
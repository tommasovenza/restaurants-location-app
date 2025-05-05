const menu = document.querySelector('#menu')
const container = document.querySelector('#app')

function swipe(e) {
  if (
    e.target.classList.contains('rest-stars') ||
    e.target.classList.contains('rest-tags') ||
    e.target.classList.contains('title') ||
    e.target.classList.contains('rest-texts') ||
    e.target.classList.contains('fa-solid') ||
    e.target.classList.contains('distance-desc') ||
    e.target.classList.contains('tag') ||
    e.target.classList.contains('rest-pic') ||
    e.target.classList.contains('icon-distance') ||
    e.target.classList.contains('row')
  ) {
    e.target.closest('.row').classList.toggle('active')
  }

  console.log(e.target)
}

function init() {
  container.addEventListener('click', swipe)
}

document.addEventListener('DOMContentLoaded', init)

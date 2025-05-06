const menu = document.querySelector('#menu')
const container = document.querySelector('#app')

function swipe(e) {
  if (
    e.target.classList.contains('rest-stars') ||
    e.target.classList.contains('rest-tags') ||
    e.target.classList.contains('title') ||
    e.target.classList.contains('rest-texts') ||
    e.target.classList.contains('fa-arrows-turn-right') ||
    e.target.classList.contains('distance-desc') ||
    e.target.classList.contains('tag') ||
    e.target.classList.contains('rest-pic') ||
    e.target.classList.contains('icon-distance') ||
    e.target.classList.contains('row')
  ) {
    e.target.closest('.row').classList.toggle('active')
    e.target
      .closest('.row-wrapper')
      .querySelector('.row-hidden-section')
      .classList.toggle('active')
  }

  // changing bookmark status
  if (
    e.target.classList.contains('fa-bookmark') ||
    e.target.classList.contains('bookmark') ||
    e.target.classList.contains('span-bookmark')
  ) {
    const bookmark = e.target
      .closest('.bookmark')
      .querySelector('i.fa-bookmark')

    if (bookmark.classList.contains('fa-regular')) {
      bookmark.classList.remove('fa-regular')
      bookmark.classList.add('fa-solid')
    } else {
      bookmark.classList.remove('fa-solid')
      bookmark.classList.add('fa-regular')
    }
  }
}

function init() {
  container.addEventListener('click', swipe)
}

document.addEventListener('DOMContentLoaded', init)

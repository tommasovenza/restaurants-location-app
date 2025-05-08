import { data } from './data.js'
const menu = document.querySelector('#menu')
const closeBtn = document.querySelector('.close-btn')
const lensIcon = document.querySelector('.fa-solid.fa-magnifying-glass')
const inputSearch = document.querySelector('.input-search')
const rowContainer = document.querySelector('#row-container')
const tagGrid = document.querySelector('.tag-grid')
const btnConfirm = document.querySelector('.submit')
let selectedTagFromGrid = []

function filterUsingTagGrid() {
  closePanel()
  console.log(selectedTagFromGrid)
}

function chooseFilterTags(e) {
  // console.log(e.target)
  if (e.target.classList.contains('tag')) {
    let tag = e.target.textContent
    if (!selectedTagFromGrid.includes(tag)) {
      selectedTagFromGrid.push(tag)
      e.target.classList.add('selected')
    } else {
      selectedTagFromGrid = selectedTagFromGrid.filter(item => item !== tag)
      e.target.classList.remove('selected')
    }
  }
}

function createTagGrid(data) {
  const tags = []
  // getting all tags
  data.forEach(item => {
    const currentTags = item.tag
    currentTags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    })
  })

  // printing
  tags.map(tag => {
    const newTag = document.createElement('button')
    newTag.classList.add('tag')
    newTag.textContent = tag
    tagGrid.appendChild(newTag)
  })
}

function filterRestaurants() {
  let word = inputSearch.value.trim().toLowerCase()
  const allRows = document.querySelectorAll('.row-wrapper')

  allRows.forEach(row => {
    const tags = row.querySelectorAll('.tag')
    let matchFound = false

    tags.forEach(tag => {
      const tagText = tag.textContent.trim().toLowerCase()
      if (tagText.includes(word)) {
        matchFound = true
      }
    })

    if (matchFound) {
      row.classList.remove('d-none') // mostra la riga se almeno un tag corrisponde
    } else {
      row.classList.add('d-none') // nascondi la riga altrimenti
    }
  })
}

function printRestaurant(data) {
  // console.log(data)
  const rowContainer = document.querySelector('#row-container')

  // loop
  data.map((item, index) => {
    const rowWrapper = document.createElement('div')
    rowWrapper.classList.add('row-wrapper')
    rowWrapper.innerHTML = `
    <div class="row-hidden-section">
      <div class="order">
        <i class="fa-solid fa-phone"></i>
        <span>Order</span>
      </div>
      <div class="bookmark">
        <i class="fa-regular fa-bookmark"></i>
        <span class="span-bookmark">Bookmark</span>
      </div>
    </div>

    <div class="row">
      <div class="rest-pic" style="background-image: url(${item.image})"></div>
      <div class="rest-texts">
        <div class="rest-title">
          <h3 class="title">${item.title}</h3>
        </div>
        <div class="rest-stars">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-regular fa-star"></i>
        </div>
        <div class="rest-tags">
          <div class="tag">${item.tag[0]}</div>
          <div class="tag">${item.tag[1]}</div>
          <div class="tag">${item.tag[2]}</div>
        </div>
      </div>
    
      <div class="distance">
        <div class="icon-distance">
          <i class="fa-solid fa-arrows-turn-right"></i>
        </div>
        <div class="real-distance">
          <span class="distance-desc">${item.distance}</span>
        </div>
      </div>
    </div>
  `
    rowContainer.appendChild(rowWrapper)
  })
}

function openSearchBar(e) {
  console.log(e.target)
  inputSearch.style.width = '100px'
  inputSearch.style.opacity = '1'
  lensIcon.style.display = 'none'
}

function movePanel() {
  document.querySelector('.external-panel').classList.add('active')
}

function closePanel() {
  document.querySelector('.external-panel').classList.remove('active')
}

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
  // print
  printRestaurant(data)
  createTagGrid(data)
  // listeners
  rowContainer.addEventListener('click', swipe)
  menu.addEventListener('click', movePanel)
  closeBtn.addEventListener('click', closePanel)
  lensIcon.addEventListener('click', openSearchBar)
  btnConfirm.addEventListener('click', filterUsingTagGrid)

  setTimeout(() => {
    inputSearch.addEventListener('input', filterRestaurants)
    tagGrid.addEventListener('click', chooseFilterTags)
  }, 100)
}

document.addEventListener('DOMContentLoaded', init)

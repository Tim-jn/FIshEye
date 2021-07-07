//

    /* tag filter */

//

const TAGS = {
  PORTRAIT: 'portrait',
  ART: 'art',
  FASHION: 'fashion',
  ARCHITECTURE: 'architecture',
  TRAVEL: 'travel',
  SPORT: 'sport',
  ANIMALS: 'animals',
  EVENTS: 'events'
}

const mediaTags = document.getElementById('medias-tags')
Object.values(TAGS).forEach(tag => {
  const btn = document.createElement('button')
  btn.innerHTML = tag
  btn.id = 'btn-tag-' + tag
  mediaTags.appendChild(btn)
  btn.addEventListener('click', filterPhotographers)
})

function filterPhotographers(ev) {
  const tag = ev.target.id.split('-').pop()
  data.photographers.forEach((photographer) => {
    const photographerEl = document.getElementById("photographer-" + photographer.id)
    if (photographer.tags.includes(tag)) {
      photographerEl.style.display = "block"
    } else {
      photographerEl.style.display = "none"
    }
   })
}

// 

    /* artists informations */

//

let data

function photographerNodeFactory(photographer) {
    const element = document.createElement('div')
    element.id = "photographer-" + photographer.id
    const title = document.createElement('h2')
    title.innerHTML = photographer.name
    // Add tags button under title
    // + bind filterPhotographers on button
    element.appendChild(title)
    return element
}

fetch('./data/FishEyeData.json')
  .then((response) => response.json())
  .then((_data) => {
    data = _data
      const content = document.getElementById('main')
      data.photographers.forEach(photographer => 
        content.appendChild(photographerNodeFactory(photographer)))
  });

// 

    /* likes counter on "photographes" page */

//

function count() {
  let clickNumber = document.querySelector("#main span.likes span.number").innerText;
  let likesTotal = document.querySelector("#main span.likes-total span.number").innerText;
  clickNumber++;

  likesTotal++;
  document.querySelector("#main span.likes span.number").innerText = clickNumber;
  document.querySelector("#main span.likes-total span.number").innerText = likesTotal;  
}

document.querySelector("#main span.likes").addEventListener("click", count);

// 

    /* form modal */

//

// launch,close modal DOM elements
const formModalBg = document.querySelector("#form-modal.bground");
const formModalBtn = document.querySelectorAll("#main button.contact");

// launch modal event
formModalBtn.forEach((btn) => btn.addEventListener("click", launchFormModal));

// launch modal form
function launchFormModal() {
  formModalBg.style.display = "block";
  document.body.style.overflow = "hidden";
}

// close modal form
function closeFormModal() {
  formModalBg.style.display = "none";
  document.body.style.overflow = "auto";
}
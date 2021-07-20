/* function appendMediaToGallery(photographer, media, gallery) {
    const mediaEl = document.createElement('div')
    const mediaImg = document.createElement('img')
    const title = document.createElement('h2')
    title.innerHTML = photographer.name
    mediaImg.src = `../img/photos/${ photographer.name.split(' ')[0] }/${ media.image }`
    mediaEl.appendChild(mediaImg)
    gallery.appendChild(mediaEl)
}

fetch('../data/FishEyeData.json')
  .then((response) => response.json())
  .then((data) => {
      const { photographers, media } = data
      const photographerId = parseInt(document.getElementById("photographer-id").value)
      const photographer = photographers.find((photographer) => photographer.id === photographerId)
      const photographerMedias = media.filter((item) => item.photographerId === photographerId)
    const gallery = document.getElementById('gallery')
    photographerMedias.forEach(media => appendMediaToGallery(photographer, media, gallery))
  }); */ 

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
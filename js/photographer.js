function appendMediaToGallery(photographer, media, gallery) {
    const mediaElement = document.createElement('article')
    const mediaImg = document.createElement('img')
    mediaImg.id = 'media-image'
    const mediaText = document.createElement('div')
    mediaText.id = 'media-text'
    const mediaName = document.createElement('h2')
    const mediaLikes = document.createElement('span')
    const mediaHeart = document.createElement('img')
    mediaName.textContent = media.title
    mediaLikes.textContent = media.likes
    mediaImg.src = '../img/photos/' + photographer.name + '/' + media.image
    mediaHeart.src = '../img/logo/heart.png'
    mediaElement.appendChild(mediaImg)
    mediaElement.appendChild(mediaText)
    mediaText.appendChild(mediaName)
    mediaText.appendChild(mediaLikes)
    mediaLikes.appendChild(mediaHeart)
    gallery.appendChild(mediaElement)
}

fetch('../data/FishEyeData.json')
  .then((response) => response.json())
  .then((data) => {
      const { photographers, media } = data
      const photographerId = parseInt(document.getElementById("photographer-id").value)
      const photographer = photographers.find((photographer) => photographer.id === photographerId)
      const photographerMedias = media.filter((item) => item.photographerId === photographerId)
    const gallery = document.getElementById('media-section')
    photographerMedias.forEach(media => appendMediaToGallery(photographer, media, gallery))
  });


function photographerHeader(photographer) {
    const photographerProfile = document.createElement('article')
    const contactButton = document.createElement('button')
    contactButton.id = 'contact'
    const profilePicture = document.createElement('img')
    const photographerName = document.createElement('h2')
    const localisation = document.createElement('p')
    localisation.id = 'localisation'
    const tagline = document.createElement('p')
    tagline.id = 'tagline'
    const tagsList = document.createElement('span')
    tagsList.id = 'tags-list'

    profilePicture.src = '../photographersID/' + photographer.portrait
    profilePicture.alt = ''
    photographerName.textContent = photographer.name
    localisation.textContent = photographer.city + ', ' + photographer.country
    tagline.textContent = photographer.tagline
    contactButton.textContent = 'Contactez-moi'

    const tagList = photographer.tags;
    for (var j = 0; j < tagList.length; j++) {
      const listTags = document.createElement('button')
      listTags.id = 'list-tags'
      listTags.textContent = '#' + tagList[j]
      tagsList.appendChild(listTags)
    }

    photographerProfile.appendChild(contactButton)
    photographerProfile.appendChild(profilePicture)
    photographerProfile.appendChild(photographerName)
    photographerProfile.appendChild(localisation)
    photographerProfile.appendChild(tagline)
    photographerProfile.appendChild(tagsList)

    return photographerProfile
}

fetch('../data/FishEyeData.json')
  .then((response) => response.json())
  .then((data) => {
        const { photographers } = data
        const photographerId = parseInt(document.getElementById("photographer-id").value)
        const photographer = photographers.find((photographer) => photographer.id === photographerId)
        const photographerMedias = photographers.filter((item) => item.id === photographerId)
      const content = document.getElementById('artist')
      photographerMedias.forEach(photographer => content.appendChild(photographerHeader(photographer)))
});

  /*function photographerNodeFactory(photographer) {
    const photographerProfile = document.createElement('article')
    photographerProfile.id = 'photographer-' + photographer.id
    const urlPhotographer = document.createElement('a')
    const profilePicture = document.createElement('img')
    const photographerName = document.createElement('h2')
    const localisation = document.createElement('p')
    localisation.id = 'localisation'
    const tagline = document.createElement('p')
    tagline.id = 'tagline'
    const price = document.createElement('p')
    price.id = 'price'
    const tagsList = document.createElement('span')
    tagsList.id = 'tags-list'

    urlPhotographer.href = './photographers/photographer' + photographer.id + '.html'
    profilePicture.src = './photographersID/' + photographer.portrait
    profilePicture.alt = ''
    photographerName.textContent = photographer.name
    localisation.textContent = photographer.city + ', ' + photographer.country
    tagline.textContent = photographer.tagline
    price.textContent = photographer.price + '€/jour'

    const tagList = photographer.tags;
    for (var j = 0; j < tagList.length; j++) {
      const listTags = document.createElement('button')
      listTags.id = 'list-tags'
      listTags.textContent = '#' + tagList[j]
      tagsList.appendChild(listTags)
    }

    photographerProfile.appendChild(urlPhotographer)
    urlPhotographer.appendChild(profilePicture)
    urlPhotographer.appendChild(photographerName)
    photographerProfile.appendChild(localisation)
    photographerProfile.appendChild(tagline)
    photographerProfile.appendChild(price)
    photographerProfile.appendChild(tagsList)

    return photographerProfile
}

fetch('../data/FishEyeData.json')
  .then((response) => response.json())
  .then((_data) => {
    data = _data
      const content = document.getElementById('header')
      data.photographers.forEach(photographer => 
        content.appendChild(photographerNodeFactory(photographer)))
  });

let data*/

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
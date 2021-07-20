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
  btn.innerHTML = '#' + tag
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

let data

// 

    /* artists informations */

//

function photographerNodeFactory(photographer) {
    const photographerProfile = document.createElement('article')
    photographerProfile.id = 'photographer-' + photographer.id
    const profilePicture = document.createElement('img')
    const photographerName = document.createElement('h2')
    const localisation = document.createElement('p')
    localisation.id = 'localisation'
    const tagline = document.createElement('p')
    tagline.id = 'tagline'
    const price = document.createElement('p')
    price.id = 'price'
    const tagsList = document.createElement('ul')
    tagsList.id = 'tags-list'

    profilePicture.src = './photographersID/' + photographer.portrait
    photographerName.textContent = photographer.name
    localisation.textContent = photographer.city + ', ' + photographer.country
    tagline.textContent = photographer.tagline
    price.textContent = photographer.price + '€/jour'

    const tagList = photographer.tags;
    for (var j = 0; j < tagList.length; j++) {
      const listTags = document.createElement('button');
      listTags.id = 'list-tags';
      listTags.textContent = '#' + tagList[j];
      tagsList.appendChild(listTags);
    }

    photographerProfile.appendChild(profilePicture);
    photographerProfile.appendChild(photographerName)
    photographerProfile.appendChild(localisation);
    photographerProfile.appendChild(tagline);
    photographerProfile.appendChild(price);
    photographerProfile.appendChild(tagsList);

    return photographerProfile
}

fetch('./data/FishEyeData.json')
  .then((response) => response.json())
  .then((_data) => {
    data = _data
      const content = document.getElementById('main-index')
      data.photographers.forEach(photographer => 
        content.appendChild(photographerNodeFactory(photographer)))
  });

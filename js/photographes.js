function appendMediaToGallery(photographer, media, gallery) {
    const mediaEl = document.createElement('div')
    const mediaImg = document.createElement('img')
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
  });
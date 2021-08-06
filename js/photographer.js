/////////////////// init content ///////////////////



/////////////////// create photographers gallery ///////////////////

function appendMediaToGallery(photographer, media, gallery) {
  const mediaElement = document.createElement("article");
  const mediaImg = document.createElement("img");
  mediaImg.id = "media-image";
  mediaImg.alt = media.alt;
  const mediaText = document.createElement("div");
  mediaText.id = "media-text";
  const mediaName = document.createElement("h2");
  const mediaLikes = document.createElement("span");
  const mediaHeart = document.createElement("img");
  mediaHeart.alt = "likes";
  mediaName.textContent = media.title;
  mediaLikes.textContent = media.likes;
  mediaImg.src = "../img/photos/" + photographer.name + "/" + media.image;
  mediaHeart.src = "../img/logo/heart.png";
  mediaElement.appendChild(mediaImg);
  mediaElement.appendChild(mediaText);
  mediaText.appendChild(mediaName);
  mediaText.appendChild(mediaLikes);
  mediaLikes.appendChild(mediaHeart);
  gallery.appendChild(mediaElement);
}

fetch("../data/FishEyeData.json")
  .then((response) => response.json())
  .then((data) => {
    const { photographers, media } = data;
    const photographerId = parseInt(document.getElementById("photographer-id").value);
    const photographer = photographers.find((photographer) => photographer.id === photographerId);
    const photographerMedias = media.filter((item) => item.photographerId === photographerId);
    const gallery = document.getElementById("media-section");
    photographerMedias.forEach((media) => appendMediaToGallery(photographer, media, gallery));
  });

/////////////////// create photographers header ///////////////////

function photographerHeader(photographer) {
  const photographerProfile = document.createElement("article");
  const contactButton = document.getElementById("contact");
  const profilePicture = document.createElement("img");
  const photographerName = document.createElement("h2");
  const localisation = document.createElement("p");
  localisation.id = "localisation";
  const tagline = document.createElement("p");
  tagline.id = "tagline";
  const tagsList = document.createElement("nav");
  tagsList.id = "tags-list";

  profilePicture.src = "../photographersID/" + photographer.portrait;
  profilePicture.alt = "";
  photographerName.textContent = photographer.name;
  localisation.textContent = photographer.city + ", " + photographer.country;
  tagline.textContent = photographer.tagline;
  contactButton.textContent = "Contactez-moi";

  const tagList = photographer.tags;
  for (var j = 0; j < tagList.length; j++) {
    const listTags = document.createElement("button");
    listTags.id = "list-tags";
    listTags.textContent = "#" + tagList[j];
    tagsList.appendChild(listTags);
  }

  photographerProfile.appendChild(contactButton);
  photographerProfile.appendChild(profilePicture);
  photographerProfile.appendChild(photographerName);
  photographerProfile.appendChild(localisation);
  photographerProfile.appendChild(tagline);
  photographerProfile.appendChild(tagsList);

  return photographerProfile;
}

fetch("../data/FishEyeData.json")
  .then((response) => response.json())
  .then((data) => {
    const { photographers } = data;
    const photographerId = parseInt(document.getElementById("photographer-id").value);
    const photographerMedias = photographers.filter((item) => item.id === photographerId);
    const content = document.getElementById("artist");
    photographerMedias.forEach((photographer) =>
      content.appendChild(photographerHeader(photographer))
    );
  });

/////////////////// tag filter ///////////////////

/////////////////// likes counter function on "photographes" page ///////////////////

/*function count() {
  let clickNumber = document.querySelector("#main-photographer span").textContent;
  let likesTotal = document.querySelector("#main span.likes-total span.number").textContent;
  clickNumber++;

  likesTotal++;
  document.querySelector("#main-photographer span").textContent = clickNumber;
  document.querySelector("#main span.likes-total span.number").textContent = likesTotal;  
}

document.querySelector("#main-photographer span").addEventListener("click", count);*/

/////////////////// form modal ///////////////////

function formModal() {
  const formModalBg = document.querySelector("#form-modal.bground");
  const closeFormBtn = document.querySelectorAll("#form-modal span.close");
  const formModalBtn = document.querySelectorAll("#main-photographer #contact");

  formModalBtn.forEach((btn) => btn.addEventListener("click", launchFormModal));

  function launchFormModal() {
    formModalBg.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  closeFormBtn.forEach((btn) => btn.addEventListener("click", closeFormModal));

  function closeFormModal() {
    formModalBg.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

formModal();

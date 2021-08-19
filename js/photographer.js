/////////////////// init content ///////////////////

import { getPhotographers } from "./api.js";
import { getMedias } from "./api.js";
import { enableBodyScroll, disableBodyScroll } from "./body-scroll-lock.js";

async function init() {
  let photographers = await getPhotographers();
  const photographerId = parseInt(document.getElementById("photographer-id").value);
  const photographerItem = photographers.filter((item) => item.id === photographerId);
  const content = document.getElementById("artist");
  photographerItem.forEach((photographer) => content.appendChild(photographerHeader(photographer)));

  let medias = await getMedias();
  const photographer = photographers.find((photographer) => photographer.id === photographerId);
  const photographerMedias = medias.filter((item) => item.photographerId === photographerId);
  photographerMedias.forEach((media) => appendMediaToGallery(photographer, media));

  formModal(photographer);
  lightbox.init(photographerMedias);
  document.querySelector("#sort-by").addEventListener("change", () => sortBy(photographerMedias));
  incrementLikes(photographerMedias);
}

init();

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
  const tagsList = document.createElement("ul");
  tagsList.id = "tags-list";
  tagsList.setAttribute("aria-label", "Tags");

  profilePicture.src = "../photographersID/" + photographer.portrait;
  profilePicture.alt = photographer.name;
  photographerName.textContent = photographer.name;
  localisation.textContent = photographer.city + ", " + photographer.country;
  tagline.textContent = photographer.tagline;
  contactButton.textContent = "Contactez-moi";

  const tagList = photographer.tags;
  for (var j = 0; j < tagList.length; j++) {
    const listTags = document.createElement("li");
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

/////////////////// create photographers gallery ///////////////////

function appendMediaToGallery(photographer, media) {
  const gallery = document.getElementById("media-section");
  const mediaElement = document.createElement("article");
  const mediaLink = document.createElement("a");
  const mediaImg = document.createElement("img");
  const mediaVideo = document.getElementById("media-video");

  if (media.image) {
    mediaImg.id = "media-image";
    mediaImg.alt = media.alt + ", closeup view";
    mediaImg.src = "../img/photos/" + photographer.name + "/" + media.image;
    mediaLink.href = "../img/photos/" + photographer.name + "/" + media.image;
    mediaLink.appendChild(mediaImg);
  } else if (media.video) {
    mediaVideo.id = "media-video";
    mediaVideo.setAttribute("aria-label", media.alt + ", closeup view");
    mediaVideo.src = "../img/photos/" + photographer.name + "/" + media.video;
    mediaLink.href = "../img/photos/" + photographer.name + "/" + media.video;
    mediaLink.appendChild(mediaVideo);
  }

  const mediaText = document.createElement("div");
  mediaText.id = "media-text";
  const mediaName = document.createElement("h2");
  const mediaLikes = document.createElement("button");
  const mediaLikesText = document.createElement("p");
  mediaLikesText.id = "likes-number";
  const mediaHeart = document.createElement("img");
  mediaHeart.alt = "likes";
  mediaName.textContent = media.title;
  mediaLikesText.textContent = media.likes;
  mediaHeart.src = "../img/logo/heart.png";

  mediaElement.appendChild(mediaLink);
  mediaLikes.appendChild(mediaLikesText);
  mediaElement.appendChild(mediaText);
  mediaText.appendChild(mediaName);
  mediaText.appendChild(mediaLikes);
  mediaLikes.appendChild(mediaHeart);
  gallery.appendChild(mediaElement);
}

/////////////////// sort by function ///////////////////

// récupérer les données

function sortBy(photographerMedias) {
  const option = document.querySelector("#sort-by").value;

  if (option == "popularity") {
    photographerMedias.sort(function (a, b) {
      return b.likes - a.likes;
    });
  } else if (option == "date") {
    photographerMedias.sort(function (a, b) {
      let dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateA - dateB;
    });
  } else if (option == "title") {
    photographerMedias.sort(function (a, b) {
      let titleA = a.title.toLowerCase(),
        titleB = b.title.toLowerCase();
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
  }

  const gallery = document.getElementById("media-section");
  gallery.innerHTML = "";
  photographerMedias.forEach(appendMediaToGallery);
}

/////////////////// likes counter function on "photographes" page ///////////////////

function incrementLikes(photographerMedias) {
  const domLikesSum = document.querySelector(".popup-text span.number");
  const likesButton = document.querySelectorAll("#media-text button");
  const mediaLikes = document.querySelectorAll("#media-text button p");

  let imgLikes = [];
  photographerMedias.forEach((media) => {
    imgLikes.push(media.likes);
  });

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let likesSum = imgLikes.reduce(reducer);
  domLikesSum.textContent = likesSum;

  for (let i = 0; i < photographerMedias.length; i++) {
    likesButton[i].addEventListener("click", () => {
      mediaLikes[i].textContent = parseInt(mediaLikes[i].textContent) + 1;
      domLikesSum.textContent = parseInt(domLikesSum.textContent) + 1;
    });
  }
}

/////////////////// form modal ///////////////////

function formModal(photographer) {
  const photographerNameContent = document.querySelector("#form-modal div.form-text");
  const photographerName = document.createElement("span");
  photographerName.textContent = photographer.name;
  photographerNameContent.appendChild(photographerName);

  const formModalBg = document.querySelector("#form-modal.bground");
  const closeFormBtn = document.querySelector("#form-modal button.close");
  const formModalBtn = document.querySelector("#main-photographer #contact");

  formModalBtn.onclick = () => {
    formModalBg.style.display = "block";
    document.getElementById("first").focus();
    disableBodyScroll(formModalBg);
  };

  formModalBg.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      formModalBg.style.display = "none";
      enableBodyScroll(formModalBg);
    }
  });

  closeFormBtn.onclick = () => {
    formModalBg.style.display = "none";
    enableBodyScroll(formModalBg);
  };
}

/////////////////// lightbox modal ///////////////////

class lightbox {
  static init(photographerMedias) {
    const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
    const gallery = links.map((link) => link.getAttribute("href"));
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        new lightbox(e.currentTarget.getAttribute("href"), gallery);
      })
    );
  }

  constructor(url, images) {
    this.element = this.buildDOM(url);
    this.images = images;
    this.loadImage(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    disableBodyScroll(this.element);
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  // récupérer le données

  loadImage(url, photographerMedias) {
    const image = new Image();
    const video = document.createElement("video");
    /*const mediaName = document.createElement("h2");
    mediaName.textContent = photographerMedias.name;
    container.appendChild(mediaName);
    image.alt = media.alt;
    video.setAttribute("aria-label", photographerMedias.alt);*/
    const container = this.element.querySelector(".lightbox-container");
    container.innerHTML = "";
    this.url = url;

    console.log(photographerMedias);

    if (url.includes("jpg")) {
      container.appendChild(image);
      image.src = url;
    } else if (url.includes("mp4")) {
      container.appendChild(video);
      video.controls = true;
      video.src = url;
    }
  }

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }

  close(e) {
    e.preventDefault();
    this.element.classList.add("fadeOut");
    enableBodyScroll(this.element);
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  next(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === this.images.length - 1) {
      i = -1;
    }
    this.loadImage(this.images[i + 1]);
  }

  prev(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    this.loadImage(this.images[i - 1]);
  }

  buildDOM(url) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `<button class="close" aria-label="Close dialog"></button>
        <button class="next" aria-label="Next image" ></button>
        <button class="prev" aria-label="Previous image"></button>
        <div class="lightbox-container" aria-label= "image closeup view">
        </div>`;
    dom.querySelector(".close").addEventListener("click", this.close.bind(this));
    dom.querySelector(".next").addEventListener("click", this.next.bind(this));
    dom.querySelector(".prev").addEventListener("click", this.prev.bind(this));
    return dom;
  }
}

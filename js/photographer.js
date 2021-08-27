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
  let photographerMedias = medias.filter((item) => item.photographerId === photographerId);
  photographerMedias.forEach((media) => appendMediaToGallery(photographer, media));

  initLightbox();
  likesIncrement(photographerMedias);
  formModal(photographer);
  document.querySelector("#sort-by").addEventListener("change", () => {
    photographerMedias = sortBy(photographerMedias);
    const gallery = document.getElementById("media-section");
    gallery.innerHTML = "";
    likesArray.splice(0, likesArray.length);
    photographerMedias.forEach((media) => {
      appendMediaToGallery(photographer, media);
    });
    initLightbox();
    likesIncrement(photographerMedias);
  });
}

init();

/////////////////// go to content button ///////////////////

window.onscroll = function () {
  goToContent();
};

function goToContent() {
  const contentButton = document.querySelector(".content-link");
  if (document.documentElement.scrollTop > 400) {
    contentButton.style.transform = "translateY(-250%)";
  } else if (document.documentElement.scrollTop < 450) {
    contentButton.style.transform = "translateY(-400%)";
  }
}

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

let likesArray = [];

function appendMediaToGallery(photographer, media) {
  const gallery = document.getElementById("media-section");
  let medias = new MediaFactory(photographer, media);
  gallery.innerHTML += medias.createCard(photographer, media);
}

class MediaFactory {
  constructor(photographer, media) {
    if (media.image) {
      return new ImageMedia(photographer, media);
    } else if (media.video) {
      return new VideoMedia(photographer, media);
    }
  }
}
class ImageMedia {
  constructor(photographer, media) {
    this.name = photographer.name;
    this.image = media.image;
    this.alt = media.alt;
    this.title = media.title;
    this.likes = media.likes;
  }

  createCard() {
    return `
  <article>
    <a href="../img/photos/${this.name}/${this.image}">
      <img id="media-image" alt="${this.alt}" src="../img/photos/${this.name}/${this.image}">
    </a>
    <div id="media-text">
      <h2>${this.title}</h2>
      <button type="button" id="likes-button">
        <p id="likes-number">${this.likes}</p>
        <img alt="likes" src="../img/logo/heart.png">
      </button>
    </div>
  </article>
  `;
  }
}

class VideoMedia {
  constructor(photographer, media) {
    this.name = photographer.name;
    this.video = media.video;
    this.alt = media.alt;
    this.title = media.title;
    this.likes = media.likes;
  }

  createCard() {
    return `
  <article>
    <a href="../img/photos/${this.name}/${this.video}">
      <video id="media-video" controls="true" aria-label="${this.alt} + ", closeup view"" src="../img/photos/${this.name}/${this.video}">
    </a>
    <div id="media-text">
      <h2>${this.title}</h2>
      <button type="button" id="likes-button">
        <p id="likes-number">${this.likes}</p>
        <img alt="likes" src="../img/logo/heart.png">
      </button>
    </div>
  </article>
  `;
  }
}

function likesIncrement(photographerMedias) {
  const domLikesSum = document.querySelector(".popup-text span.number");

  photographerMedias.forEach((media) => {
    let mediaLikesTextContent = media.likes;
    likesArray.push(mediaLikesTextContent);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const likesSum = likesArray.reduce(reducer);
    domLikesSum.textContent = likesSum;
  });

  const mediaLikes = document.querySelectorAll("#likes-number");

  for (let i = 0; i < mediaLikes.length; i++) {
    mediaLikes[i].addEventListener("click", () => {
      mediaLikes[i].textContent = parseInt(mediaLikes[i].textContent) + 1;
      domLikesSum.textContent = parseInt(domLikesSum.textContent) + 1;
    });
  }
}

// The following code has been revised to conform to the evaluation criteria

/*function appendMediaToGallery(photographer, media) {
  const gallery = document.getElementById("media-section");
  const mediaElement = document.createElement("article");
  const mediaLink = document.createElement("a");
  const mediaImg = document.createElement("img");
  const mediaVideo = document.createElement("video");

  if (media.image) {
    mediaImg.id = "media-image";
    mediaImg.alt = media.alt + ", closeup view";
    mediaImg.src = "../img/photos/" + photographer.name + "/" + media.image;
    mediaLink.href = "../img/photos/" + photographer.name + "/" + media.image;
    mediaLink.appendChild(mediaImg);
  } else if (media.video) {
    mediaVideo.id = "media-video";
    mediaVideo.setAttribute("controls", "true");
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

  // likes increment

  const domLikesSum = document.querySelector(".popup-text span.number");
  const mediaLikesTextContent = media.likes;
  likesArray.push(mediaLikesTextContent);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const likesSum = likesArray.reduce(reducer);
  domLikesSum.textContent = likesSum;

  mediaLikes.addEventListener("click", () => {
    mediaLikesText.textContent = parseInt(mediaLikesText.textContent) + 1;
    domLikesSum.textContent = parseInt(domLikesSum.textContent) + 1;
  });
}*/

/////////////////// sort by function ///////////////////

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

  return photographerMedias;
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

function initLightbox() {
  const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
  const gallery = links.map((link) => link.getAttribute("href"));
  links.forEach((link) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      new LightboxFactory(e.currentTarget.getAttribute("href"), gallery);
    })
  );
}

class LightboxFactory {
  constructor(url, medias) {
    return new LightboxMedia(url, medias);
  }
}

class LightboxMedia {
  constructor(url, medias) {
    this.element = this.buildDOM(url);
    this.medias = medias;
    this.loadMedia(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    disableBodyScroll(this.element);
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  loadMedia(url) {
    const container = this.element.querySelector(".lightbox-container");
    container.innerHTML = "";

    const title = document.createElement("h2");
    title.innerHTML = this.getFormatedTitle(url);
    this.url = url;
    if (url.includes("jpg")) {
      const image = new Image();
      image.alt = this.getFormatedTitle(url);
      container.appendChild(image);
      image.src = url;
    } else if (url.includes("mp4")) {
      const video = document.createElement("video");
      video.setAttribute("aria-label", this.getFormatedTitle(url));
      container.appendChild(video);
      video.controls = true;
      video.src = url;
    }
    container.appendChild(title);
  }

  getFormatedTitle(path) {
    const splitedPath = path.split("/");
    const string = splitedPath[splitedPath.length - 1].split(".")[0];
    const formatedTitle = string.replaceAll("_", " ");
    return formatedTitle;
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
    let i = this.medias.findIndex((media) => media === this.url);
    if (i === this.medias.length - 1) {
      i = -1;
    }
    this.loadMedia(this.medias[i + 1]);
  }

  prev(e) {
    e.preventDefault();
    let i = this.medias.findIndex((media) => media === this.url);
    if (i === 0) {
      i = this.medias.length;
    }
    this.loadMedia(this.medias[i - 1]);
  }

  buildDOM(url) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.setAttribute("aria-modal", "true");
    dom.innerHTML = `<button class="close" aria-label="Close dialog"></button>
        <button class="next" aria-label="Next image"></button>
        <button class="prev" aria-label="Previous image"></button>
        <div class="lightbox-container" aria-label="image closeup view" role="dialog"></div>`;
    dom.querySelector(".close").addEventListener("click", this.close.bind(this));
    dom.querySelector(".next").addEventListener("click", this.next.bind(this));
    dom.querySelector(".prev").addEventListener("click", this.prev.bind(this));

    return dom;
  }
}

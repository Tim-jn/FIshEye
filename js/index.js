/////////////////// init content ///////////////////

import { getPhotographers } from "./api.js";

async function init() {
  let photographers = await getPhotographers();
  const content = document.getElementById("main-index");
  photographers.forEach((photographer) =>
    content.appendChild(photographerNodeFactory(photographer, photographers))
  );
  generateTags(photographers);
}

init();

/////////////////// create tags and filter function ///////////////////

let unfilteredTagsLists = [];

function generateTags(photographer) {
  const unfilteredTagList = unfilteredTagsLists.flat();
  const filteredTagList = [...new Set(unfilteredTagList)];
  const mediaTags = document.getElementById("medias-tags");

  filterAndCreateTags(filteredTagList, mediaTags, photographer);
}

function filterTags(photographers, btn) {
  btn.addEventListener("click", (event) => {
    const tag = event.target.id.split("-").pop();
    photographers.forEach((photographer) => {
      const photographerEl = document.getElementById("photographer-" + photographer.id);
      if (photographer.tags.includes(tag)) {
        photographerEl.style.display = "block";
      } else {
        photographerEl.style.display = "none";
      }
    });
  });
}

function filterAndCreateTags(tagList, tagContainer, photographers) {
  Object.values(tagList).forEach((tag) => {
    const btn = document.createElement("button");
    btn.textContent = "#" + tag;
    btn.id = "btn-tag-" + tag;
    tagContainer.appendChild(btn);

    filterTags(photographers, btn);
  });
}

/////////////////// create photographers content ///////////////////

function photographerNodeFactory(photographer, photographers) {
  const photographerProfile = document.createElement("article");
  photographerProfile.id = "photographer-" + photographer.id;
  const urlPhotographer = document.createElement("a");
  const profilePicture = document.createElement("img");
  const photographerName = document.createElement("h2");
  const localisation = document.createElement("p");
  localisation.id = "localisation";
  const tagline = document.createElement("p");
  tagline.id = "tagline";
  const price = document.createElement("p");
  price.id = "price";
  const tagsList = document.createElement("span");
  tagsList.id = "tags-list";

  urlPhotographer.href = "./photographers/photographer" + photographer.id + ".html";
  profilePicture.src = "./photographersID/" + photographer.portrait;
  profilePicture.alt = "";
  photographerName.textContent = photographer.name;
  localisation.textContent = photographer.city + ", " + photographer.country;
  tagline.textContent = photographer.tagline;
  price.textContent = photographer.price + "€/jour";

  const tagList = photographer.tags;
  filterAndCreateTags(tagList, tagsList, photographers);

  Object.values(tagList).forEach(() => {
    unfilteredTagsLists.push(tagList);
  });

  photographerProfile.appendChild(urlPhotographer);
  urlPhotographer.appendChild(profilePicture);
  urlPhotographer.appendChild(photographerName);
  photographerProfile.appendChild(localisation);
  photographerProfile.appendChild(tagline);
  photographerProfile.appendChild(price);
  photographerProfile.appendChild(tagsList);

  return photographerProfile;
}

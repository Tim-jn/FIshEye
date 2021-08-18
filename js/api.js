/////////////////// loading source file ///////////////////

async function getPhotographers() {
  let photographers = await fetch("/data/FishEyeData.json")
    .then((response) => response.json())
    .then((data) => {
      return data.photographers;
    });
  return photographers;
}

async function getMedias() {
  let medias = await fetch("/data/FishEyeData.json")
    .then((response) => response.json())
    .then((data) => {
      return data.media;
    });
  return medias;
}

export { getPhotographers };
export { getMedias };

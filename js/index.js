async function getPhotographers() {
	let photographers = await fetch('./data/FishEyeData.json').then((response) => response.json()).then((data) => {
		return data.photographers
	})
	return photographers
}

async function init() {
	let photographers = await getPhotographers()
	const content = document.getElementById('main-index')
	photographers.forEach(photographer => content.appendChild(photographerNodeFactory(photographer)))
	generateTags(photographers)
}

init()

//

    /* tag filter */

// 

let unfilteredTagsLists = []

function generateTags(photographers) {
	const unfilteredTagList = unfilteredTagsLists.flat()
	const filteredTagList = [...new Set(unfilteredTagList)]
	const mediaTags = document.getElementById('medias-tags')
  
	Object.values(filteredTagList).forEach(tag => {
		const btn = document.createElement('button')
		btn.textContent = '#' + tag
		btn.id = 'btn-tag-' + tag
		mediaTags.appendChild(btn)

		function filterTags() {
			btn.addEventListener('click', (event) => {
				const tag = event.target.id.split('-').pop()
				photographers.forEach((photographer) => {
					const photographerEl = document.getElementById('photographer-' + photographer.id)
					if(photographer.tags.includes(tag)) {
						photographerEl.style.display = 'block'
					} else {
						photographerEl.style.display = 'none'
					}
				})
			})
		}
		filterTags()
	})
}

// 

    /* artists informations */

//
 
function photographerNodeFactory(photographer) {
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
	for(var j = 0; j < tagList.length; j++) {
		unfilteredTagsLists.push(tagList);
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
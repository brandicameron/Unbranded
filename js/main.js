
//Global variables
const grid = document.querySelectorAll('.grid-container');
//Gives all product containers a universal class (used for keyboard use functions)
//This must remain above the products variable below to work
grid.forEach((item) => {
	item.classList.add('products');
})
const body = document.querySelector('body');
const products = document.querySelectorAll('.products');
//Capture active element for keyboard users to return to after large view
let activeElement;



//Global navigation
$(function () {
	$(".main-navigation").load("main-navigation.html");
	$(".footer-content").load("footer.html");
});;



function createLgImageModal() {
	body.style.overflow = "hidden";
	const modal = document.createElement('div');
	modal.classList.add('modal');
	body.appendChild(modal);

	const closeBtn = document.createElement('div');
	closeBtn.classList.add('close-btn');
	modal.appendChild(closeBtn);

	const imgContainer = document.createElement('div');
	imgContainer.classList.add('img-container');
	modal.appendChild(imgContainer);

	const image = document.createElement('img');
	image.classList.add('image');
	imgContainer.appendChild(image);
}

function viewLargeImage(e) {
	if (e.target.classList.contains('cards')) {
		createLgImageModal();
		const image = document.querySelector('.image');
		image.src = e.target.src;
		image.alt = e.target.alt;
	}
}


function viewLgChristmasCard(e) {
	if (e.target.classList.contains('view')) {
		body.style.overflow = "hidden";
		const template = document.querySelector(".template");
		const modal = template.content.cloneNode(true);
		document.body.appendChild(modal);

		const image = document.querySelector('.image');
		const thumbnails = document.querySelector('.thumbnails');
		const thumbFront = document.querySelector('.thumb-front');
		const thumbBack = document.querySelector('.thumb-back');

		image.src = e.target.src.replace('-3', '-2');
		image.alt = e.target.alt;
		thumbFront.src = e.target.src.replace('-3', '-2');
		thumbFront.alt = e.target.alt;
		thumbBack.src = e.target.src.replace('-2', '-3');
		thumbBack.alt = e.target.alt;

		thumbnails.addEventListener('click', (e) => {
			if (e.target.classList.contains('thumbnail')) {
				image.src = e.target.src;
			}
		})

		thumbnails.addEventListener('keydown', (e) => {
			if (e.keyCode === 13) {
				if (e.target.classList.contains('thumbnail')) {
					image.src = e.target.src;
				}
			}
		})
	}
}

function closeLargeImage(e) {
	const modal = document.querySelector('.modal');
	if (e.target.classList.contains('close-btn') || e.target.classList.contains('image')) {
		modal.remove();
		body.style.overflow = "scroll";
	} else if (e.keyCode === 27) {
		modal.remove();
		body.style.overflow = "scroll";
		// return keyboard user to same place on page after closing modal window
		if (!(activeElement === undefined)) {
			activeElement.focus();
		}
	}
}



// ******  ACCESSIBILITY  ******

//Make all product images tab accessible
const allImgs = document.querySelectorAll('img');
const albumImgs = document.querySelectorAll('.albums');
const firstAlbumImg = document.querySelector('.albums');


allImgs.forEach((img) => {
	if (img.classList.contains('cards')) {
		img.setAttribute('width', '600');
	}
})

allImgs.forEach((img) => {
	img.tabIndex = "0";
})

//Target for skip to content link
allImgs[0].setAttribute('id', 'first-product');

if (allImgs[0].classList.contains('albums')) {
	firstAlbumImg.removeAttribute('id');
	firstAlbumImg.parentElement.setAttribute('id', 'first-product');
}

//Removing tabIndex for albums, already wrapped in a tag and otherwise you have to tab twice to select an album design
albumImgs.forEach((album) => {
	album.removeAttribute('tabIndex');
})

//For tabbing to products and viewing large
products.forEach((container) => {
	container.addEventListener('keydown', (e) => {
		if (e.keyCode === 13) {
			activeElement = document.activeElement;

			if (e.target.classList.contains('cards')) {
				viewLargeImage(e);
			} else if (e.target.classList.contains('view')) {
				viewLgChristmasCard(e);
				thumbnailFocus();
			}
		}
	});
})

//Focus first thumbnail for keyboard users
function thumbnailFocus(e) {
	const thumbFront = document.querySelector('.thumb-front');
	thumbFront.focus();
}

//Adds focus indicator to images for keyboard users only
body.addEventListener('keydown', (e) => {
	if (e.keyCode === 9) {
		allImgs.forEach((img) => {
			img.classList.add('add-focus');
		})
	}
})



// EVENT LISTENERS
body.addEventListener('click', viewLargeImage);
body.addEventListener('click', viewLgChristmasCard);
body.addEventListener('click', closeLargeImage);
body.addEventListener('keydown', closeLargeImage);
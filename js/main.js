//const grid = document.querySelector('.grid-container');
//grid.style.gridTemplateColumns = "repeat(4, 1fr)";


// GLOBAL NAV
$(function () {
	$("#main-navigation").load("main-navigation.html");
});


// SCROLL TO TOP BUTTON
$(document).ready(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#scroll').fadeIn();
		} else {
			$('#scroll').fadeOut();
		}
	});
	$('#scroll').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});
});


const body = document.querySelector('body');

function viewLarge(e) {
	if (e.target.classList.contains('cards')) {
		
		const imgClicked = e.target.src;
		const frontImage = imgClicked.replace('-3','-2');
		const backImage = imgClicked.replace('-2','-3');
		const imageTitle = e.target.nextElementSibling.textContent;
		
		const lgViewContainer = document.createElement('div');
		lgViewContainer.classList.add('large-view');
		body.appendChild(lgViewContainer);

		const closeBtn = document.createElement('div');
		closeBtn.classList.add('close');
		closeBtn.textContent = "X";
		lgViewContainer.appendChild(closeBtn);

		const imgContainer = document.createElement('div');
		imgContainer.classList.add('large-image');
		lgViewContainer.appendChild(imgContainer);
		
		const lgImage = document.createElement('img');
		lgImage.src = frontImage;
		lgImage.onmouseover = function() {lgImage.src = backImage;};
		lgImage.onmouseout = function() {lgImage.src = frontImage;};
		lgImage.setAttribute('alt', imageTitle);
		imgContainer.appendChild(lgImage);
	}
}




function closeLargeView(e) {
	if (e.target.classList.contains('close')) {
		e.target.parentNode.remove();
	} else if (e.target.classList.contains('large-view')) {
		e.target.remove();
	}
}


// EVENT LISTENERS
body.addEventListener('click', viewLarge);
body.addEventListener('click', closeLargeView);

window.addEventListener('keydown', function (e) {
	const largeView = document.querySelector('.large-view');
	if (e.key === 'Escape') {
		largeView.remove();
	}
})
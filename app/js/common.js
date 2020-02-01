
"use strict";

// ...........................Custom JS......................... //
 

window.onload = function() {	
	let matrix = '128';
	let fileName = '4x4';
	
	let links = document.getElementsByClassName('link');
	let div = document.querySelector('.draw');

	sendRequest(fileName);		

	for(let i = 0; i < links.length; i++) {	

		links[i].addEventListener('click', function() {
			matrix = this.getAttribute('matrix');
			fileName = this.innerText.split(' ').join('');

			let current = document.getElementsByClassName('active');
			current[0].className = current[0].className.replace('active', '');
			this.parentElement.classList.add('active');						

			if(fileName == 'image') {
				showImage(fileName);
			} else {				
				sendRequest(fileName);
			}			
		});	
		
	}			
	
	function sendRequest(name) {
		let requestURL = `json/${name}.json`;
		
		let request = new XMLHttpRequest();
		request.open('GET', requestURL);

		request.responseType = 'json';
		request.send();

		request.onload = function() {
			let frame = request.response;			
			showFrame(frame, matrix);
		}
	}	
	
	function showImage(name) {		
		while (div.firstChild) {
			div.removeChild(div.firstChild);
		}
		div.insertAdjacentHTML('beforeend', `<img src="img/${name}.png" class="default-image" width="512" height ="512">`);
	}

	function showFrame(data, scale) {	
		while (div.firstChild) {
			div.removeChild(div.firstChild);
		}
		div.insertAdjacentHTML('beforeend', `<canvas id="canvas" width="512" height="512"></canvas>`);

		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');
		let width = data[0].length;
		let height = data.length;			
	
		canvas.width = width * scale;
		canvas.height = height * scale;

		for(let row = 0; row < height; row++) {
			for(let col = 0; col < width; col++) {
				if(scale == 128) {
					ctx.fillStyle = '#' + data[row][col];
				}
				if(scale == 16) {
					ctx.fillStyle = 'rgba(' + data[row][col] + ')';
				}						
				ctx.fillRect(col * scale, row * scale, scale, scale);
			}
		}		
		return false;			
	}	

}
	



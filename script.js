var key = "AIzaSyBS8A_uH1f-SVsyZvUnJqn5oMsXzqkKYpc";
var videoList = document.getElementById("video-list");
var video = document.getElementById("video");
var searchField = document.getElementById("search-field");
var searchButton = document.querySelector(".search-button");

function getVideos(searchTerm) {
	var videosRequest = new XMLHttpRequest();
	var url ="https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + searchTerm + "&key=" + key;

	videosRequest.open("GET", url);

	videosRequest.onload = function() {
		var videos = JSON.parse(videosRequest.responseText).items;
		console.log(videos);

		listVideos(videos);
	};

	videosRequest.send();
}

function relatedVideos(videoId) {
	var videosRequest = new XMLHttpRequest();
	var url ="https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&relatedToVideoId="+ videoId + "&type=video&key=" + key;

	videosRequest.open("GET", url);

	videosRequest.onload = function() {
		var videos = JSON.parse(videosRequest.responseText).items;
		console.log(videos);

		listVideos(videos);
	};

		videosRequest.send();
}

function listVideos(videos) {
	videoList.innerHTML = "";

	videos.forEach(function(video) {
		createVideo(video);
	});

	addClick();
}

function createVideo(video) {
	var videoElement = document.createElement("div");

	var thumb = '<img src="' + video.snippet.thumbnails.medium.url + '" alt="">';
	var title = '<h3>' + video.snippet.title + '</h3>';
	var desc = '<span>' + video.snippet.description + '</span>';
	
	videoElement.innerHTML = thumb + "<div class='video-text'>" + title + desc + "</div>";
	videoElement.classList.add("video");
	videoElement.dataset.id = video.id.videoId;
 
	videoList.appendChild(videoElement);

}

function onSearch(e) {
	var searchTerm = searchField.value;

	getVideos(searchTerm);
}

function addClick() {
	var clickableElements = document.querySelectorAll('.video > img, .video h3');

	clickableElements.forEach(function(element) {
		element.addEventListener("click", playVideo);
	})
}

function getVideoId(clickedElement) {

	return clickedElement.closest('.video').dataset.id;
}

function playVideo(e) {

	var videoId = getVideoId(e.target);

	video.innerHTML = '<iframe width="100%" height="550" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

	relatedVideos(videoId);

}

searchButton.addEventListener("click", onSearch);
searchField.addEventListener("keydown", function(e) {
	e.keyCode === 13 && onSearch();
})

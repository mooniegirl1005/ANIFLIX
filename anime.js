const animeData = {
  "spyxfamily": {
    title: "SPY x FAMILY - Official Trailer",
    video: "videos/spyxfamily.mp4",
    poster: "images/spy-thumb.jpg"
  },
  "onepiece": {
    title: "One Piece - Episode 1",
    video: "videos/onepiece.mp4",
    poster: "images/onepiece.jpg"
  },
  "naruto": {
    title: "Naruto - Episode 1",
    video: "videos/naruto.mp4",
    poster: "images/naruto.jpg"
  },
  "demon-slayer": {
    title: "Demon Slayer Trailer",
    video: "videos/demon-slayer.mp4",
    poster: "images/demon-slayer.jpg"
  }
};

// anime.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const anime = animeData[id];

  const container = document.getElementById("anime-container");

  if (anime) {
    container.innerHTML = `
      <h2>${anime.title}</h2>
      <video controls width="100%" ${anime.poster ? `poster="${anime.poster}"` : ''}>
        <source src="${anime.video}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
  } else {
    container.innerHTML = `<p>Anime not found 😢</p>`;
  }
});


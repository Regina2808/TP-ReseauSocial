
  //selection vue aperçu et ajout de storie 
 let selectedStoryFile = null;
  let selectedStoryType = null;

document.getElementById('storyFileInput').addEventListener('change', (e) => {
  selectedStoryFile = e.target.files[0];
  if (!selectedStoryFile) return;

  selectedStoryType = selectedStoryFile.type.startsWith('video') ? 'video' : 'image';

  const reader = new FileReader();
  reader.onload = ev => {
    const preview = document.getElementById('storyPreviewMedia');
    preview.innerHTML = selectedStoryType === 'image'
      ? `<img src="${ev.target.result}" class="img-fluid rounded">`
      : `<video controls class="w-100 rounded"><source src="${ev.target.result}" type="${selectedStoryFile.type}"></video>`;

    document.getElementById('storyPreviewModal').classList.remove('d-none');
  };
  reader.readAsDataURL(selectedStoryFile);
});

document.getElementById('publishStoryBtn').addEventListener('click', () => {
  const caption = document.getElementById('storyPreviewCaption').value.trim();
  if (!selectedStoryFile) return;

  const reader = new FileReader();
  reader.onload = e => {
    const storyData = {
      id: "story-" + Date.now(),
      username: "Gildas",
      image: selectedStoryType === 'image' ? e.target.result : '',
      video: selectedStoryType === 'video' ? e.target.result : '',
      caption,
      timestamp: Date.now()
    };
    renderStory(storyData);
    saveStoryToStorage(storyData);
    closeStoryPreview();
  };
  reader.readAsDataURL(selectedStoryFile);
});

function closeStoryPreview() {
  document.getElementById('storyPreviewModal').classList.add('d-none');
  document.getElementById('storyPreviewMedia').innerHTML = '';
  document.getElementById('storyPreviewCaption').value = '';
  selectedStoryFile = null;
  selectedStoryType = null;
}

//recuper et affiche la storie 

function renderStory(storyData) {
  const { id, username, image, video } = storyData;

  const story = document.createElement('div');
  story.className = 'text-center mx-2';
  story.style.cursor = 'pointer';
  story.innerHTML = `
    <div class="position-relative">
      <img src="${image || '/assets/image/video-icon.png'}" class="rounded-circle border border-primary" width="60" height="60" alt="${username}">
    </div>
    <small class="d-block mt-1 text-muted">${username}</small>
  `;

  story.addEventListener('click', () => {
    openStoryViewer([storyData]);
  });

  document.getElementById('storyBar').appendChild(story);
}


 //insertion de publication 
const postInput = document.getElementById('postInput');
const publishBtn = document.getElementById('publishBtn');
const postContainer = document.getElementById('postContainer');
const postImage = document.getElementById('postImage');
const postVideo = document.getElementById('postVideo');
const postLocation = document.getElementById('postLocation');
const postMood = document.getElementById('postMood');

publishBtn.addEventListener('click', () => {
  const content = postInput.value.trim();
  const location = postLocation.value.trim();
  const mood = postMood.value.trim();
  const imageFile = postImage.files[0];
  const videoFile = postVideo.files[0];

  if (!content && !imageFile && !videoFile) return;

  const post = document.createElement('div');
  post.className = 'card shadow-sm mb-4';

  const renderPost = (imageURL = '', videoURL = '') => {
    post.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center mb-2">
          <img src="/assets/image/logolooklive1.png" class="rounded-circle mr-2" width="40" height="40" alt="user">
          <div>
            <h6 class="mb-0">Gildas</h6>
            <small class="text-muted">${new Date().toLocaleString()}</small>
          </div>
        </div>
        ${content ? `<p>${content}</p>` : ""}
        ${mood ? `<p><i class="bi bi-emoji-smile text-warning"></i> Humeur : ${mood}</p>` : ""}
        ${imageURL ? `<img src="${imageURL}" class="img-fluid rounded mb-2" alt="publication">` : ""}
        ${videoURL ? `<video controls class="w-100 rounded mb-2"><source src="${videoURL}" type="video/mp4"></video>` : ""}
        ${location ? `<p class="text-muted"><i class="bi bi-geo-alt-fill text-primary"></i> ${location}</p>` : ""}

        <div class="d-flex justify-content-between align-items-center mb-2">
          <div>
            <button class="btn btn-light btn-sm like-btn"><i class="bi bi-hand-thumbs-up"></i> <span class="like-count">0</span></button>
            <button class="btn btn-light btn-sm dislike-btn"><i class="bi bi-hand-thumbs-down"></i> <span class="dislike-count">0</span></button>
          </div>
          <button class="btn btn-light btn-sm toggle-comments"><i class="bi bi-chat-dots"></i> Commenter</button>
        </div>

        <div class="comment-section d-none">
          <ul class="list-unstyled comment-list mb-3"></ul>
          <div class="d-flex align-items-center">
            <img src="/assets/image/mangas1.png" class="rounded-circle mr-2" width="40" height="40" alt="user">
            <input type="text" class="form-control rounded-pill mr-2 comment-input" placeholder="Ajouter un commentaire...">
            <button class="btn btn-primary rounded-circle send-comment"><i class="bi bi-send-fill text-white"></i></button>
          </div>
        </div>
      </div>
    `;

    postContainer.prepend(post);
    postInput.value = '';
    postLocation.value = '';
    postMood.value = '';
    postImage.value = '';
    postVideo.value = '';

    // Interactions
    const likeBtn = post.querySelector('.like-btn');
    const dislikeBtn = post.querySelector('.dislike-btn');
    const likeCount = post.querySelector('.like-count');
    const dislikeCount = post.querySelector('.dislike-count');
    const toggleBtn = post.querySelector('.toggle-comments');
    const commentSection = post.querySelector('.comment-section');
    const commentInput = post.querySelector('.comment-input');
    const sendBtn = post.querySelector('.send-comment');
    const commentList = post.querySelector('.comment-list');

    let likes = 0;
    let dislikes = 0;
    let userReaction = null; // like ou dislike est null

   
likeBtn.addEventListener('click', () => {
  if (userReaction === 'like') {
    // Annuler le like
    likes--;
    userReaction = null;
  } else {
    if (userReaction === 'dislike') {
      // Retirer le dislike précédent
      dislikes--;
    }
    likes++;
    userReaction = 'like';
  }
  updateCounts();
});

dislikeBtn.addEventListener('click', () => {
  if (userReaction === 'dislike') {
    // Annuler le dislike
    dislikes--;
    userReaction = null;
  } else {
    if (userReaction === 'like') {
      // Retirer le like précédent
      likes--;
    }
    dislikes++;
    userReaction = 'dislike';
  }
  updateCounts();
});
//mise a jour du compte 
function updateCounts() {
  likeCount.textContent = likes;
  dislikeCount.textContent = dislikes;
}


//cachier la liste des commentaire 
    toggleBtn.addEventListener('click', () => {
      commentSection.classList.toggle('d-none');
    });
      
 //envoie du commentaire    
    sendBtn.addEventListener('click', () => {
      const text = commentInput.value.trim();
      if (text !== '') {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Gildas</strong> ${text}`;
        commentList.appendChild(li);
        commentInput.value = '';
      }
    });

    commentInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        sendBtn.click();
        e.preventDefault();
      }
    });
  };

  //creation de la publication selon le fichier 
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = e => {
      if (videoFile) {
        const videoReader = new FileReader();
        videoReader.onload = v => renderPost(e.target.result, v.target.result);
        videoReader.readAsDataURL(videoFile);
      } else {
        renderPost(e.target.result, '');
      }
    };
    reader.readAsDataURL(imageFile);
  } else if (videoFile) {
    const videoReader = new FileReader();
    videoReader.onload = v => renderPost('', v.target.result);
    videoReader.readAsDataURL(videoFile);
  } else {
    renderPost();
  }
});



// class modal de  la map 
  let map;
  let marker;

  $('#mapModal').on('shown.bs.modal', function () {
    if (!map) {
      map = L.map('map').setView([6.497, 2.603], 13); // Position initiale : Cotonou

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Ajout du champ de recherche
      L.Control.geocoder({
        defaultMarkGeocode: false
      })
      .on('markgeocode', function(e) {
        const center = e.geocode.center;
        map.setView(center, 15);
        if (marker) map.removeLayer(marker);
        marker = L.marker(center).addTo(map);
        document.getElementById('selectedLocation').value = e.geocode.name;
      })
      .addTo(map);

      // Clic sur la carte
      map.on('click', function(e) {
        if (marker) map.removeLayer(marker);
        marker = L.marker(e.latlng).addTo(map);
        document.getElementById('selectedLocation').value = `Lat: ${e.latlng.lat.toFixed(5)}, Lng: ${e.latlng.lng.toFixed(5)}`;
      });
    }
    setTimeout(() => map.invalidateSize(), 200); // Corrige l'affichage
  });

   const moodOptions = document.querySelectorAll('.mood-option');
   const postmood = document.getElementById('postMood');
    const moodButton = document.getElementById('dropdownHumeur');

moodOptions.forEach(option => {
  option.addEventListener('click', () => {
    const mood = option.textContent.trim();
    postMood.value = mood;
    moodButton.innerHTML = `<i class="bi bi-emoji-smile-fill text-primary mr-2"></i> ${mood}`;
  });
});

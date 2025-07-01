document.addEventListener('DOMContentLoaded', function() {
                // Activer l'onglet Publications si nécessaire
                if (window.location.hash === '#posts' || localStorage.getItem('activeTab') === '#posts') {
                    const tabTrigger = document.querySelector('a[href="#posts"]');
                    if (tabTrigger) {
                        const tab = new bootstrap.Tab(tabTrigger);
                        tab.show();
                        
                        // Faire défiler vers la section
                        document.querySelector('#posts').scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                    localStorage.removeItem('activeTab');
                }
            });


            // Données des photos par défaut
const defaultProfilePics = [
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
];

const defaultCoverPhotos = [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
];

// Photos fixes de la galerie
const galleryPhotos = [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
];

// Données des publications
let posts = [
    {
        id: 1,
        author: "Laura Adh",
        authorPic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        date: "22 juillet 2022",
        content: "Si c'est pour avoir la femme de ta vie, que tu veux devenir riche à tout prix. Sache que même avec la richesse, tu es un homme pauvre 😊 ! La femme de ta vie, ça pas besoin de ta richesse. Mais de toi-même, de tout ce qui viendra de toi et qui la fera sentir femme. Ce sont ces paresseuses qui ne veulent rien faire qui veulent à tout prix rester avec des hommes riches. Sinon la femme n'a pas besoin d'un homme riche avant de vivre le vrai amour 😊.",
        likes: 175,
        comments: [
            {
                author: "Joinnia Hgb",
                authorPic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                date: "5 min",
                content: "Tout à fait d'accord avec toi !"
            }
        ]
    }
];

// Fonction pour basculer l'affichage des formulaires d'édition
function toggleEditForm(formId) {
    const form = document.getElementById(formId);
    form.style.display = form.style.display === 'block' ? 'none' : 'block';
}

// Fonction pour sauvegarder les informations modifiées
function saveInfo(infoId, inputId, formId) {
    const infoElement = document.getElementById(infoId);
    const inputElement = document.getElementById(inputId);
    
    // Cas spécial pour la bio
    if (inputId === 'bioInput') {
        infoElement.innerHTML = inputElement.value.replace(/\n/g, '<br>');
    }
    // Cas spécial pour le contenu à la une
    else if (inputId === 'featuredInput') {
        updateFeaturedContent();
        return;
    }
    // Formatage spécial pour la date de naissance
    else if (inputId === 'birthdayInput') {
        const date = new Date(inputElement.value);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        infoElement.textContent = "Né(e) le " + date.toLocaleDateString('fr-FR', options);
    } else {
        infoElement.textContent = inputElement.value;
    }
    
    toggleEditForm(formId);
    
    // Animation de confirmation
    infoElement.style.color = '#1b74e4';
    setTimeout(() => {
        infoElement.style.color = '';
    }, 1000);
}

// Fonction pour mettre à jour le contenu à la une
function updateFeaturedContent() {
    const featuredValue = document.getElementById('featuredInput').value;
    let displayText = "Aucun contenu sélectionné";
    
    switch(featuredValue) {
        case 'post1':
            displayText = "Publication: \"La femme de ta vie\"";
            break;
        case 'photo1':
            displayText = "Photo: Vacances à la plage";
            break;
        case 'video1':
            displayText = "Vidéo: Mon voyage";
            break;
    }
    
    document.getElementById('featuredContent').textContent = displayText;
    toggleEditForm('featuredForm');
}

// Fonctions pour la gestion des photos de profil et de couverture
function changeProfilePicture() {
    const modal = new bootstrap.Modal(document.getElementById('profilePicModal'));
    
    const container = document.getElementById('profilePicSelection');
    container.innerHTML = '';
    
    defaultProfilePics.forEach((pic, index) => {
        const img = document.createElement('img');
        img.src = pic;
        img.className = 'selectable-photo';
        img.onclick = function() {
            document.querySelectorAll('#profilePicSelection img').forEach(img => {
                img.classList.remove('selected');
            });
            
            img.classList.add('selected');
            document.getElementById('profilePic').src = pic;
            
            setTimeout(() => {
                modal.hide();
            }, 1000);
        };
        container.appendChild(img);
    });
    
    modal.show();
}


document.addEventListener('DOMContentLoaded', () => {
function showCoverPhotoModal() {
    const modal = new bootstrap.Modal(document.getElementById('coverPhotoModal'));
    
    const container = document.getElementById('coverPhotoSelection');
    container.innerHTML = '';
    
    defaultCoverPhotos.forEach((pic, index) => {
        const img = document.createElement('img');
        img.src = pic;
        img.className = 'selectable-photo';
        img.onclick = function() {
            document.querySelectorAll('#coverPhotoSelection img').forEach(img => {
                img.classList.remove('selected');
            });
            
            img.classList.add('selected');
            document.getElementById('coverPhoto').style.backgroundImage = `url(${pic})`;
            
            setTimeout(() => {
                modal.hide();
            }, 1000);
        };
        container.appendChild(img);
    });
    
    modal.show();
}
});
function showCoverPhotoModal() {
    const modal = new bootstrap.Modal(document.getElementById('coverPhotoModal'));
    
    const container = document.getElementById('coverPhotoSelection');
    container.innerHTML = '';
    
    defaultCoverPhotos.forEach((pic, index) => {
        const img = document.createElement('img');
        img.src = pic;
        img.className = 'selectable-photo';
        img.onclick = function() {
            document.querySelectorAll('#coverPhotoSelection img').forEach(img => {
                img.classList.remove('selected');
            });
            
            img.classList.add('selected');
            document.getElementById('coverPhoto').style.backgroundImage = `url(${pic})`;
            
            setTimeout(() => {
                modal.hide();
            }, 1000);
        };
        container.appendChild(img);
    });
    
    modal.show();
}

function uploadProfilePicture(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePic').src = e.target.result;
            const modal = bootstrap.Modal.getInstance(document.getElementById('profilePicModal'));
            modal.hide();
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function uploadCoverPhoto(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('coverPhoto').style.backgroundImage = `url(${e.target.result})`;
            const modal = bootstrap.Modal.getInstance(document.getElementById('coverPhotoModal'));
            modal.hide();
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// Fonctions pour les publications
function showPostOptions() {
    document.getElementById('postOptions').style.display = 'flex';
}

function showPostModal() {
    const modal = new bootstrap.Modal(document.getElementById('createPostModal'));
    modal.show();
}

function addMedia(type) {
    const preview = document.getElementById('postMediaPreview');
    preview.innerHTML = '';
    preview.style.display = 'block';
    
    if (type === 'photo') {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        fileInput.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.style.maxWidth = '100%';
                    img.style.borderRadius = '8px';
                    preview.innerHTML = '';
                    preview.appendChild(img);
                    document.getElementById('postButtonContainer').style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        };
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    } else if (type === 'video') {
        preview.innerHTML = '<div class="alert alert-info">Fonctionnalité vidéo en développement</div>';
        document.getElementById('postButtonContainer').style.display = 'block';
    } else if (type === 'mood') {
        preview.innerHTML = `
            <select class="form-select">
                <option>😊 Heureux</option>
                <option>😢 Triste</option>
                <option>😡 En colère</option>
                <option>😍 Amoureux</option>
                <option>🤔 Pensif</option>
            </select>
        `;
        document.getElementById('postButtonContainer').style.display = 'block';
    }
}

function createPost() {
    const postContent = document.getElementById('postInput').value;
    const mediaPreview = document.getElementById('postMediaPreview').innerHTML;
    
    if (!postContent && !mediaPreview) return;
    
    const newPost = {
        id: posts.length + 1,
        author: document.getElementById('profileName').textContent,
        authorPic: document.getElementById('profilePic').src,
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        content: postContent,
        media: mediaPreview,
        likes: 0,
        comments: []
    };
    
    posts.unshift(newPost);
    renderPosts();
    
    // Réinitialiser le formulaire
    document.getElementById('postInput').value = '';
    document.getElementById('postMediaPreview').innerHTML = '';
    document.getElementById('postMediaPreview').style.display = 'none';
    document.getElementById('postButtonContainer').style.display = 'none';
    document.getElementById('postOptions').style.display = 'none';
}

function renderPosts() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'content-section post-item';
        postElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center">
                    <img src="${post.authorPic}" alt="Photo de profil" class="rounded-circle me-2" width="40" height="40">
                    <div>
                        <h6 class="mb-0 fw-bold">${post.author}</h6>
                        <small class="text-muted">${post.date} · <i class="fas fa-globe-americas"></i></small>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="btn btn-link text-muted" data-bs-toggle="dropdown">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Enregistrer</a></li>
                        <li><a class="dropdown-item" href="#">Modifier</a></li>
                        <li><a class="dropdown-item" href="#" onclick="deletePost(${post.id})">Supprimer</a></li>
                    </ul>
                </div>
            </div>
            
            ${post.content ? `<div class="post-content mb-3">${post.content.replace(/\n/g, '<br>')}</div>` : ''}
            ${post.media ? `<div class="mb-3">${post.media}</div>` : ''}
            
            <div class="d-flex justify-content-between border-top border-bottom py-2 mb-3">
                <button class="btn btn-light reaction-btn">
                    <i class="fas fa-thumbs-up me-1"></i> J'adore (${post.likes})
                </button>
                <button class="btn btn-light reaction-btn">
                    <i class="fas fa-comment me-1"></i> Commenter
                </button>
                <button class="btn btn-light reaction-btn">
                    <i class="fas fa-share me-1"></i> Partager
                </button>
            </div>
            
            <div class="d-flex align-items-center mb-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Photo de profil" class="rounded-circle me-2" width="32" height="32">
                <div class="input-group">
                    <input type="text" class="form-control rounded-pill" placeholder="Écrire un commentaire...">
                </div>
            </div>
            
            ${post.comments.map(comment => `
                <div class="comment d-flex align-items-start mb-3">
                    <img src="${comment.authorPic}" alt="Photo de profil" class="rounded-circle me-2" width="32" height="32">
                    <div class="bg-light p-2 rounded-3 flex-grow-1">
                        <div class="d-flex justify-content-between">
                            <h6 class="mb-0 fw-bold">${comment.author}</h6>
                            <small class="text-muted">${comment.date}</small>
                        </div>
                        <p class="mb-0">${comment.content}</p>
                    </div>
                </div>
            `).join('')}
            
            ${post.comments.length > 1 ? `
                <a href="#" class="d-block text-center text-muted mb-2">
                    <small>Voir plus de commentaires</small>
                </a>
            ` : ''}
        `;
        
        container.appendChild(postElement);
    });
}

function deletePost(postId) {
    posts = posts.filter(post => post.id !== postId);
    renderPosts();
}

// Fonctions pour la galerie photo
function openGallery(index) {
    const modal = document.getElementById('galleryModal');
    const img = document.getElementById('galleryImage');
    img.src = galleryPhotos[index];
    modal.style.display = "block";
}

function closeGallery() {
    document.getElementById('galleryModal').style.display = "none";
}

function showAllPhotos() {
    const container = document.getElementById('allPhotosContainer');
    container.innerHTML = '';
    
    galleryPhotos.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = photo;
        img.className = 'gallery-item';
        img.onclick = function() { openGallery(index); };
        container.appendChild(img);
    });
    
    document.getElementById('allPhotosModal').style.display = "block";
}

function closeAllPhotos() {
    document.getElementById('allPhotosModal').style.display = "none";
}

// Initialisation de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les tooltips Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Remplir le nom dans le modal avec le nom du profil
    document.getElementById('modalProfileName').textContent = document.getElementById('profileName').textContent;
    
    // Initialisation de la bio si elle est vide
    if (!document.getElementById('bioInfo').textContent.trim()) {
        document.getElementById('bioInfo').textContent = "Weiss";
        document.getElementById('bioInput').value = "Weiss";
    }
    
    // Rendre les publications initiales
    renderPosts();
    
    // Activer la soumission de publication avec la touche Entrée
    document.getElementById('postInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            createPost();
        }
    });
    
    // Pré-remplir la grille de photos avec les photos fixes
    const photoGrid = document.getElementById('photoGrid');
    photoGrid.innerHTML = '';
    galleryPhotos.slice(0, 6).forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'photo-item';
        item.style.backgroundImage = `url(${photo})`;
        item.onclick = function() { openGallery(index); };
        photoGrid.appendChild(item);
    });
        // Au chargement de la page profil
    document.addEventListener('DOMContentLoaded', function() {
        // Vérifier si on vient de la page À propos
        const activeTab = localStorage.getItem('activeTab');
        
        if (activeTab) {
            // Activer l'onglet correspondant
            const tabTrigger = document.querySelector(`a[href="${activeTab}"]`);
            if (tabTrigger) {
                const tab = new bootstrap.Tab(tabTrigger);
                tab.show();
            }
            
            // Nettoyer le localStorage
            localStorage.removeItem('activeTab');
        }
    });
    // ... (conservez tout votre code existant jusqu'à la fin) ...

// Initialisation de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les tooltips Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Remplir le nom dans le modal avec le nom du profil
    document.getElementById('modalProfileName').textContent = document.getElementById('profileName').textContent;
    
    // Initialisation de la bio si elle est vide
    if (!document.getElementById('bioInfo').textContent.trim()) {
        document.getElementById('bioInfo').textContent = "Weiss";
        document.getElementById('bioInput').value = "Weiss";
    }
    
    // Rendre les publications initiales
    renderPosts();
    
    // Activer la soumission de publication avec la touche Entrée
    document.getElementById('postInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            createPost();
        }
    });
    
    // Pré-remplir la grille de photos avec les photos fixes
    const photoGrid = document.getElementById('photoGrid');
    photoGrid.innerHTML = '';
    galleryPhotos.slice(0, 6).forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'photo-item';
        item.style.backgroundImage = `url(${photo})`;
        item.onclick = function() { openGallery(index); };
        photoGrid.appendChild(item);
    });

    // Gestion de l'onglet actif au chargement
    handleActiveTab();
});

// Fonction pour gérer l'onglet actif
function handleActiveTab() {
    // Vérifier le hash dans l'URL
    if (window.location.hash === '#posts') {
        activateTab('#posts');
    }
    
    // Vérifier le localStorage pour les redirections
    const activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
        activateTab(activeTab);
        localStorage.removeItem('activeTab');
    }
}

// Fonction pour activer un onglet spécifique
function activateTab(tabId) {
    const tabTrigger = document.querySelector(`a[href="${tabId}"]`);
    if (tabTrigger) {
        const tab = new bootstrap.Tab(tabTrigger);
        tab.show();
        
        // Optionnel: Faire défiler vers la section
        document.querySelector(tabId).scrollIntoView({
            behavior: 'smooth'
        });
    }
}

function showAboutModal() {
    const modal = new bootstrap.Modal(document.getElementById('aboutModal'));
    document.getElementById('aboutModalContent').innerHTML = `
        <div class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Chargement...</span>
          </div>
        </div>`;
    
    fetch('about.html')
        .then(response => response.text())
        .then(html => {
            // Extraire juste le contenu utile (dans le body )
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const container = doc.querySelector('.about-container');
            if (container) {
                document.getElementById('aboutModalContent').innerHTML = container.outerHTML;
            } else {
                document.getElementById('aboutModalContent').innerHTML = "<p>Impossible de charger le contenu.</p>";
            }
        })
        .catch(error => {
            document.getElementById('aboutModalContent').innerHTML = "<p>Erreur de chargement du contenu.</p>";
            console.error("Erreur de chargement :", error);
        });

    modal.show();
}


});
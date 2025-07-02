document.addEventListener("DOMContentLoaded", () => {
  // Données de conversation
  const conversationsData = {
    "Moi": [
      { from: "me", text: "Bienvenue sur Messenger !", time: "12:00" }
    ],
    "Groupe 1": [
      { from: "Groupe 1", text: "Discussion de groupe active.", time: "09:15" }
    ],
    "Alice Bob": [
      { from: "me", text: "Salut, comment ça va ?", time: "12:45" },
      { from: "Alice Bob", text: "Ça va bien et toi ?", time: "12:46" }
    ],
    "Charlie Doe": [
      { from: "me", text: "Bon je te laisse", time: "11:04" },
      { from: "Charlie Doe", text: "À plus tard.", time: "11:05" }
    ],
    "Maryla Poli": [
      { from: "me", text: "Je suis indisposé ce jour-là", time: "10:30" },
      { from: "Maryla Poli", text: "Je comprends les circonstances", time: "10:31" }
    ],
    "Lauri Queni": [
      { from: "me", text: "Salut", time: "11:11" },
      { from: "Lauri Queni", text: "Ça va bien et toi ?", time: "11:00" }
    ],
    "Mira Lissa": [
      { from: "me", text: "Hello Mira !", time: "22:05" },
      { from: "Mira Lissa", text: "Tu m'envoie le document quand?", time: "10:30" }
    ],
    "Paula Lopo": [
      { from: "me", text: "Ne m'écris plus stp", time: "11:04" },
      { from: "Paula Lopo", text: "Pourquoi?", time: "08:26" }
    ]
  };

  // Sélection d'éléments
  const conversations = document.querySelectorAll(".conversation");
  const chatEmpty = document.getElementById("chat-empty");
  const chatContent = document.getElementById("chat-content");
  const chatMessages = document.getElementById("chat-messages");
  const chatName = document.getElementById("chat-name");
  const chatAvatar = document.getElementById("chat-avatar");
  const reactionMenu = document.getElementById("reaction-menu");
  let currentMessage = null;

  // Affiche la page neutre au chargement
  chatEmpty.style.display = "flex";
  chatContent.style.display = "none";

  // Sélection de conversation
  conversations.forEach(convo => {
    convo.addEventListener("click", () => {
      conversations.forEach(c => c.classList.remove("active"));
      convo.classList.add("active");

      // Affiche le chat, masque la page neutre
      chatEmpty.style.display = "none";
      chatContent.style.display = "flex";

      // Récupère le nom de la conversation
      const name = convo.querySelector(".conversation-name").textContent;
      const initials = convo.querySelector(".conversation-avatar")?.textContent || name[0];

      // Met à jour l'en-tête du chat
      chatName.textContent = name;
      chatAvatar.textContent = initials;

      // Affiche les messages de la conversation
      chatMessages.innerHTML = "";
      (conversationsData[name] || []).forEach(msg => {
        const msgDiv = document.createElement("div");
        msgDiv.className = "message " + (msg.from === "me" ? "sent" : "received");
        msgDiv.innerHTML = `
          <div class="message-content">${msg.text}</div>
          <div class="message-time">${msg.time}</div>
        `;
        chatMessages.appendChild(msgDiv);
      });

      // Ajoute les écouteurs pour les réactions sur chaque message
      chatMessages.querySelectorAll('.message-content').forEach(msgContent => {
        msgContent.addEventListener('contextmenu', function(e) {
          e.preventDefault();
          currentMessage = msgContent;
          if (reactionMenu) {
            reactionMenu.style.display = 'flex';
            reactionMenu.style.top = (e.pageY - 40) + 'px';
            reactionMenu.style.left = (e.pageX - 20) + 'px';
          }
        });
      });
    });
  });

  // Réactions Messenger
  if (reactionMenu) {
    document.querySelectorAll('.reaction-menu .reaction').forEach(r => {
      r.addEventListener('click', function() {
        if (currentMessage) {
          let react = currentMessage.parentNode.querySelector('.message-reaction');
          if (!react) {
            react = document.createElement('span');
            react.className = 'message-reaction';
            react.style.marginLeft = '8px';
            currentMessage.parentNode.appendChild(react);
          }
          react.textContent = this.textContent;
          reactionMenu.style.display = 'none';
        }
      });
    });
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.reaction-menu')) {
        reactionMenu.style.display = 'none';
      }
    });
  }

  // Filtres "Tout", "Non lu", "Groupe"
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.textContent.trim();
      document.querySelectorAll('.conversation').forEach(convo => {
        if (filter === "Tout") {
          convo.style.display = "";
        } else if (filter === "Non lu") {
          convo.style.display = convo.classList.contains("unread") ? "" : "none";
        } else if (filter === "Groupe") {
          convo.style.display = convo.classList.contains("group") ? "" : "none";
        }
      });
    });
  });

  // Profil panel (colonne 3)
  const profilePanel = document.getElementById("profile-panel");
  const closeProfileBtn = document.getElementById("close-profile");
  const profileName = document.getElementById("profile-name");
  const profileAvatar = document.getElementById("profile-avatar");
  if (chatAvatar && profilePanel) {
    chatAvatar.addEventListener("click", () => {
      profilePanel.style.display = "flex";
      profileName.textContent = chatName.textContent;
      profileAvatar.textContent = chatAvatar.textContent;
    });
  }
  if (closeProfileBtn && profilePanel) {
    closeProfileBtn.addEventListener("click", () => {
      profilePanel.style.display = "none";
    });
  }
  document.querySelectorAll('.profile-section .section-header').forEach(header => {
    header.addEventListener('click', function() {
      const section = this.parentNode;
      section.classList.toggle('open');
    });
  });
});
msgContent.addEventListener('click', function(e) {
  currentMessage = msgContent;
  if (reactionMenu) {
    reactionMenu.style.display = 'flex';
    reactionMenu.style.top = (e.pageY - 40) + 'px';
    reactionMenu.style.left = (e.pageX - 20) + 'px';
  }
});
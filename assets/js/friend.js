document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const friendsGrid = document.getElementById("friendsGrid");
  const friendCards = document.querySelectorAll(".friend-card");
  const subnavButtons = document.querySelectorAll(".subnav-btn");
  const countDisplay = document.querySelector(".friend-count");
  const invitationsSection = document.getElementById("invitations-section");
  const suggestionsSection = document.getElementById("suggestions-section");

  // Fonction de filtrage général
  function filterCards(query = "", category = "tous les amis") {
    friendCards.forEach(card => {
      const name = card.querySelector("h5").textContent.toLowerCase();
      const cat = card.dataset.cat || "tous les amis";
      const matchQuery = name.includes(query);
      const matchCat = category === "tous les amis" || cat === category;

      if (matchQuery && matchCat) {
        card.style.display = "block";
        setTimeout(() => card.classList.add("show"), 30);
      } else {
        card.style.display = "none";
        card.classList.remove("show");
      }
    });

    updateCount();
  }

  // Met à jour le compteur d'amis visibles
  function updateCount() {
    const visible = [...friendCards].filter(c => c.style.display !== "none");
    countDisplay.textContent = `${visible.length} ami${visible.length > 1 ? "s" : ""}`;
  }

  // Gestion de la recherche
  searchInput.addEventListener("input", () => {
    const val = searchInput.value.toLowerCase();
    const activeCat = document.querySelector(".subnav-btn.active").textContent.toLowerCase();
    filterCards(val, activeCat);
  });

  // Gestion des filtres par catégorie
  subnavButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      subnavButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Réafficher la section amis
      invitationsSection.style.display = "none";
      suggestionsSection.style.display = "none";
      friendsGrid.style.display = "flex";

      const cat = btn.textContent.toLowerCase();
      const query = searchInput.value.toLowerCase();
      filterCards(query, cat);
    });
  });

  // Gestion des liens “Invitations” et “Retrouver des amis”
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href").substring(1); // "invitations" ou "suggestions"

      // Cacher toutes les sections
      friendsGrid.style.display = "none";
      invitationsSection.style.display = "none";
      suggestionsSection.style.display = "none";

      // Afficher celle choisie
      if (target === "invitations") {
        invitationsSection.style.display = "block";
      } else if (target === "suggestions") {
        suggestionsSection.style.display = "block";
      }
    });
  });

  // Chargement initial
  filterCards();
});

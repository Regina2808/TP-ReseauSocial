   document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("#photoTabs .nav-link");
  const photoGrid = document.getElementById("photo-grid");
  const albumSection = document.getElementById("album-section");

  // Gestion des onglets
  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const tabName = tab.dataset.tab;
      photoGrid.classList.toggle("d-none", tabName !== "all");
      albumSection.classList.toggle("d-none", tabName === "all");
    });
  });

  // Visionneuse Bootstrap
  const modal = new bootstrap.Modal(document.getElementById("photoModal"));
  const modalImg = document.getElementById("modalImage");

  function bindModalToImage(img) {
    img.addEventListener("click", () => {
      modalImg.setAttribute("src", img.getAttribute("data-src"));
      modal.show();
    });
  }

  document.querySelectorAll(".photo-card img").forEach(bindModalToImage);

  // Ajout de photo par utilisateur
  const uploadForm = document.getElementById("uploadForm");
  const mediaInput = document.getElementById("mediaInput");
  const usernameInput = document.getElementById("usernameInput");
  const preview = document.getElementById("preview");

  mediaInput.addEventListener("change", () => {
    const file = mediaInput.files[0];
    preview.innerHTML = "";

    if (file && file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.alt = "aperçu";
      preview.appendChild(img);
    } else {
      preview.innerHTML = "<div class='text-muted'>Prévisualisation non disponible</div>";
    }
  });

  uploadForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const file = mediaInput.files[0];
    const username = usernameInput.value.trim();
    if (!file || !username) return;

    const reader = new FileReader();
    reader.onload = () => {
      const col = document.createElement("div");
      col.className = "col-6 col-md-4 col-lg-3 photo-card";

      const img = document.createElement("img");
      img.src = reader.result;
      img.alt = `Photo de ${username}`;
      img.className = "img-fluid rounded";
      img.setAttribute("data-src", reader.result);

      const caption = document.createElement("div");
      caption.className = "caption text-center text-muted small mt-1";
      caption.textContent = `Ajouté par ${username}`;

      col.appendChild(img);
      col.appendChild(caption);
      photoGrid.prepend(col);

      bindModalToImage(img);

      uploadForm.reset();
      preview.innerHTML = "";
      bootstrap.Modal.getInstance(document.getElementById("uploadModal")).hide();
    };

    reader.readAsDataURL(file);
  });
});

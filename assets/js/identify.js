// Validation du champ email 
function validerEmail(input, errorId) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'email
	const value = input.value.trim(); // Récupération de la valeur du champ email
	const error = document.getElementById(errorId); // Sélection de l'élément d'erreur (span sous le champ)
	if (value && !regex.test(value)) {
		error.textContent = "Veuillez entrer une adresse email valide.";
		return false;
	} else {
		error.textContent = "";
		return true;
	}
}

// Ajout d'un écouteur sur le bouton au chargement de la page
window.addEventListener('DOMContentLoaded', function() {
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function(e) {
      // Réinitialisation des messages d'erreur
      document.getElementById('email-error').textContent = '';
      const champEmail = document.getElementById('email');
      let valid = true;
      // Validation email
      if (!champEmail.value.trim()) {
        document.getElementById('email-error').textContent = "Veuillez entrer votre e-mail.";
        valid = false;
      } else if (!validerEmail(champEmail, 'email-error')) {
        valid = false;
      }
      if (!valid) {
        e.preventDefault();
        return;
      }
      // Si tout est bon, on stocke l'email et on redirige
      sessionStorage.setItem('identify_email', champEmail.value.trim());
      window.location.href = 'recover.html';
    });
  }
});

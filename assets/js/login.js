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

// Validation du champ mot de passe
function validerMotDePasse(input, errorId) {
	const value = input.value; // Récupération de la valeur du champ mot de passe
	const error = document.getElementById(errorId); // Sélection de l'élément d'erreur (span sous le champ) 
	
	// Vérifier si le mot de passe a au moins 6 caractères
	// Si le mot de passe est vide ou a moins de 6 caractères, on affiche un message d'erreur
	// Sinon, on supprime le message d'erreur
	if (value && value.length < 6) {
		error.textContent = "Le mot de passe doit contenir au moins 6 caractères.";
		return false;
	} else {
		error.textContent = "";
		return true
	}
}

function validerConnexion() {
  // Réinitialisation des messages d'erreur
  document.getElementById('email-error').textContent = '';
  document.getElementById('password-etape2-error').textContent = '';

  const champEmail = document.getElementById('email');
  const passwordInput = document.getElementById('password-etape2');
  let valid = true;

  // Validation email
  if (!champEmail.value.trim()) {
    document.getElementById('email-error').textContent = "L'adresse email est requise.";
    valid = false;
  } else if (!validerEmail(champEmail, 'email-error')) { // Correction ici
    valid = false;
  }

  // Validation mot de passe
  if (!passwordInput.value.trim()) {
    document.getElementById('password-etape2-error').textContent = 'Le mot de passe est requis.';
    valid = false;
  } else if (!validerMotDePasse(passwordInput, 'password-etape2-error')) {
    valid = false;
  }

  if (!valid) return;
}

function validerNom(input, errorId) {
	const value = input.value.trim();
	const error = document.getElementById(errorId);
	let contientChiffre = false;
  
	// Vérification si le nom ou le prénom contient des chiffres
	for (let i = 0; i < value.length; i++) {
		// Vérification si le caractère est un chiffre
		// Si un chiffre est trouvé, on met la variable à true et on sort de la boucle
		if (value[i] >= '0' && value[i] <= '9') {
			contientChiffre = true;
			break;
		}
	}

	// Si le champ n'est pas vide et contient un chiffre, on affiche un message d'erreur
	if (value && contientChiffre) {
		error.textContent = "Ce champ ne doit pas contenir de chiffres.";
		return false;
	} else {
		error.textContent = "";
		return true;
	}
}

function validerEtape1() {
  // Récupération des messages d'erreur
  document.getElementById('prenom-error').textContent = '';
  document.getElementById('nom-error').textContent = '';
  document.getElementById('date-error').textContent = '';
  document.getElementById('genre-error').textContent = '';

  // Récupération des éléments input
  const prenomInput = document.getElementById('prenom');
  const nomInput = document.getElementById('nom');
  const date = document.getElementById('date').value;
  const genre = document.getElementById('genre').value;
  let valid = true;

  if (!prenomInput.value.trim()) {
    document.getElementById('prenom-error').textContent = 'Le prénom est requis.';
    valid = false;
  } else if (!validerNom(prenomInput, 'prenom-error')) {
    valid = false;
  }
  if (!nomInput.value.trim()) {
    document.getElementById('nom-error').textContent = 'Le nom est requis.';
    valid = false;
  } else if (!validerNom(nomInput, 'nom-error')) {
    valid = false;
  }
  if (!date) {
    document.getElementById('date-error').textContent = 'La date de naissance est requise.';
    valid = false;
  }
  if (!genre || genre === 'Sélectionnez votre genre') {
    document.getElementById('genre-error').textContent = 'Le genre est requis.';
    valid = false;
  }
  if (!valid) return;
  afficherEtape(2);
}

// Validation du champ email (connexion et inscription)
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

// Validation du champ mot de passe (connexion et inscription)
function validerMotDePasse(input, errorId) {
	const value = input.value; // Récupération de la valeur du champ mot de passe
	const error = document.getElementById(errorId); // Sélection de l'élément d'erreur (span sous le champ) 
	
	// Vérifier si le mot de passe a au moins 6 caractères
	// Si le mot de passe est vide ou a moins de 8 caractères, on affiche un message d'erreur
	// Sinon, on supprime le message d'erreur
	if (value && value.length < 6) {
		error.textContent = "Le mot de passe doit contenir au moins 6 caractères.";
		return false;
	} else {
		error.textContent = "";
		return true
	}
}

function validerEtape2() {
  // Réinitialisation des messages d'erreur
  document.getElementById('email-etape2-error').textContent = '';
  document.getElementById('password-etape2-error').textContent = '';

  const champEmail = document.getElementById('email-etape2');
  const passwordInput = document.getElementById('password-etape2');
  let valid = true;

  // Validation email
  if (!champEmail.value.trim()) {
    document.getElementById('email-etape2-error').textContent = "L'adresse email est requise.";
    valid = false;
  } else if (!validerEmail(champEmail, 'email-etape2-error')) {
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
  // Stocker l'email dans sessionStorage pour la confirmation
  sessionStorage.setItem('register_email', champEmail.value.trim());
  afficherEtape(3);
}

function validerEtape3() {
  // Soumission du formulaire et redirection
  document.getElementById('multiEtapeForm').submit();
  window.location.href = 'confirm.html';
}


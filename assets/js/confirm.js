// Validation du code de sécurité à 6 chiffres
function validerCode() {
    const codeInput = document.getElementById('code'); // Champ où l'utilisateur entre le code
    const errorDiv = document.getElementById('code-error');
    const code = codeInput.value.trim();
    // Vérifie si le code fait exactement 6 chiffres
    if (!/^\d{6}$/.test(code)) {
        if (code.length !== 6) {
            errorDiv.textContent = "Le code doit contenir exactement 6 chiffres.";
        } else {
            errorDiv.textContent = "Le code ne doit contenir que des chiffres (pas de lettres ou de caractères spéciaux).";
        }
        return false;
    } else {
        errorDiv.textContent = "";
        // Redirige vers la page login_profil.html si le code est valide
        window.location.href = 'login_profil.html';
        return true;
    }
}

function validerContinuer() {
  // Réinitialisation des messages d'erreur
  document.getElementById('code-error').textContent = '';
  // Récupération des éléments input
  const champCode = document.getElementById('code');
  let valid = true;

  // Validation code
  if (!champCode.value.trim()) {
    document.getElementById('code-error').textContent = "Veuilez entrer un code";
    valid = false;
  } else if (!validerCode(champCode, 'code-error')) { 
    valid = false;
  }
   if (!valid) return;
}


// Script pour afficher l'email stocké dans sessionStorage sur la page de confirmation
window.addEventListener('DOMContentLoaded', function() {
    const email = sessionStorage.getItem('register_email');
    if (email) {
        const emailSpan = document.getElementById('user-email');
        if (emailSpan) {
            emailSpan.textContent = email;
        }
    }
});

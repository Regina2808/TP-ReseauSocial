// Script universel pour afficher/masquer le mot de passe sur tous les champs avec .toggle-password
document.addEventListener('DOMContentLoaded', function() {
  // Pour chaque champ mot de passe avec .toggle-password
  document.querySelectorAll('.toggle-password').forEach(function(span) {
    // On cherche l'icône œil dans ce span
    var eyeIcon = span.querySelector('.bi-eye, .bi-eye-slash');
    // On cherche le champ input dans le même input-group
    var input = span.parentNode.querySelector('input[type="password"], input[type="text"]');
    // Vérifier si les éléments existent avant d'ajouter les événements
    if (input && eyeIcon) {
      span.style.cursor = 'pointer';
      function togglePasswordVisibility() {
        if (input.type === 'password') {
          input.type = 'text';
          eyeIcon.classList.replace('bi-eye', 'bi-eye-slash');
        } else {
          input.type = 'password';
          eyeIcon.classList.replace('bi-eye-slash', 'bi-eye');
        }
      }
      span.addEventListener('click', togglePasswordVisibility);
    }
  });
});

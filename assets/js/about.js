 document.addEventListener('DOMContentLoaded', function () {
    // Menus contextuels
    document.querySelectorAll('.menu-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const menu = this.nextElementSibling;

            // Fermer les autres
            document.querySelectorAll('.menu-popup').forEach(m => {
                if (m !== menu) m.style.display = 'none';
            });

            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Clic extérieur ferme les menus
    document.addEventListener('click', () => {
        document.querySelectorAll('.menu-popup').forEach(menu => {
            menu.style.display = 'none';
        });
    });

    // Édition des champs
    document.querySelectorAll('.edit-option').forEach(edit => {
        edit.addEventListener('click', function () {
            const infoLine = this.closest('.info-line');
            const display = infoLine.querySelector('.display');
            const input = infoLine.querySelector('.edit-input');
            const btn = infoLine.querySelector('.save-btn');

            display.style.display = 'none';
            input.style.display = 'block';
            btn.style.display = 'inline-block';
        });
    });

    // Sauvegarde
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const parent = this.closest('.text');
            const input = parent.querySelector('.edit-input');
            const display = parent.querySelector('.display');

            display.textContent = input.value;
            input.style.display = 'none';
            this.style.display = 'none';
            display.style.display = 'block';
        });
    });

    // Bouton retour
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector('.about-container').classList.add('fade-out');
            localStorage.setItem('activeTab', '#posts');
            setTimeout(() => {
                window.location.href = 'profil.html';
            }, 300);
        });
    }
});
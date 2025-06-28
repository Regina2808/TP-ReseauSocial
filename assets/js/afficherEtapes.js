// Gestion des étapes du formulaire
	function afficherEtape(etape){
		// Récupérer tous les éléments avec la classe "etape"
		const etapes = document.querySelectorAll('.etape');
		// Masquer toutes les étapes
		for (let i = 0; i < etapes.length; i++) {
			etapes[i].classList.add('d-none');
		}
		// Afficher l'étape demandée
			// Calcul de l'ID de l'étape à afficher
			const etapeID = 'etape-' + etape;
			// Récupérer l'élément correspondant à l'étape
			const etapeElement = document.getElementById(etapeID);
			// On le rends visible
			if (etapeElement) {
				etapeElement.classList.remove('d-none');
			}
		// Mettre à jour le récapitulatif si on est à l'étape 3
		if (etape === 3) {
			remplirRecapitulatif();
		}
	}

// Récupérer les infos et remplir le récapitulatif à l'étape 3
	function remplirRecapitulatif() {
		const champPrenom = document.getElementById('prenom');
		const champNom = document.getElementById('nom');
		const recapNom = document.getElementById('recap-nom');
		console.log('remplirRecapitulatif - prenom:', champPrenom ? champPrenom.value : 'null', 'nom:', champNom ? champNom.value : 'null');
		// Vérifier si les champs existent et on combine les valeurs 
		if (champPrenom && champNom) {
			recapNom.textContent = champPrenom.value + ' ' + champNom.value;
		} else {
			recapNom.textContent = '';
		}

		// Récupérer l'email depuis l'étape 2 (id="email-etape2")
		const champEmail = document.getElementById('email-etape2');
		const recapEmail = document.getElementById('recap-email');
		console.log('remplirRecapitulatif - email:', champEmail ? champEmail.value : 'null');
		// Vérifier si le champ email existe et on l'affiche
		if (champEmail && recapEmail) {
			recapEmail.textContent = champEmail.value;
		} else if (recapEmail) {
			recapEmail.textContent = '';
		}

		// Récupérer la date de naissance depuis l'étape 1 (id="date")
		const champDate = document.getElementById('date');
		const recapDate = document.getElementById('recap-date');
		console.log('remplirRecapitulatif - date:', champDate ? champDate.value : 'null');
		// Vérifier si le champ date existe et on l'affiche
		if (champDate && recapDate) {
			recapDate.textContent = champDate.value;
		} else if (recapDate) {
			recapDate.textContent = '';
		}
	}


// récupération des id

  const btnlike = document.getElementById('btnlike');
  const btndislike = document.getElementById('btndislike');

  // récupération de la réaction enregistrée
  const saved = localStorage.getItem('reaction');
  if (saved === 'like') activerLike();
  if (saved === 'dislike') activerDislike();

  btnlike.onclick = () => {
    localStorage.setItem('reaction', 'like');
    activerLike();
  };

  btndislike.onclick = () => {
    localStorage.setItem('reaction', 'dislike');
    activerDislike();
  };

  function activerLike() {
    btnlike.classList.replace('btn-outline-primary', 'btn-primary');
    btndislike.classList.replace('btn-secondary', 'btn-outline-secondary');
    btnlike.innerHTML = '<i class="bi bi-hand-thumbs-up-fill"></i> J’aime';
    btndislike.innerHTML = '<i class="bi bi-hand-thumbs-down"></i> Je n’aime pas';
  }

  function activerDislike() {
    btndislike.classList.replace('btn-outline-secondary', 'btn-secondary');
    btnlike.classList.replace('btn-primary', 'btn-outline-primary');
    btndislike.innerHTML = '<i class="bi bi-hand-thumbs-down-fill"></i> Je n’aime pas';
    btnlike.innerHTML = '<i class="bi bi-hand-thumbs-up"></i> J’aime';
  }


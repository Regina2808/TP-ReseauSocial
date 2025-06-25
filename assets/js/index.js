
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

    //   foncton  d'activation de like 

  function activerLike() {
    btnlike.classList.replace('btn-outline-primary', 'btn-primary');
    btndislike.classList.replace('btn-primary', 'btn-outline-primary');
    btnlike.innerHTML = '<i class="bi bi-hand-thumbs-up-fill"></i> J’aime';
    btndislike.innerHTML = '<i class="bi bi-hand-thumbs-down"></i> Je n’aime pas';
  }

     //   foncton  d'activation de dislike 

  function activerDislike() {
    btndislike.classList.replace('btn-outline-primary', 'btn-primary');
    btnlike.classList.replace('btn-primary', 'btn-outline-primary');
    btndislike.innerHTML = '<i class="bi bi-hand-thumbs-down-fill"></i> Je n’aime pas';
    btnlike.innerHTML = '<i class="bi bi-hand-thumbs-up"></i> J’aime';
  }



  const togglecontentbtn = document.getElementById("togglecommentbtn");
  const commentSection = document.getElementById("commentSection");
  const commentList = document.getElementById("commentList");
  const comment = document.getElementById("comment");
  const commentsubmit = document.getElementById("commentsubmit");

  togglecontentbtn.addEventListener("click", () => {
    commentSection.classList.toggle("d-none");
  });

    Commentsubmit.addEventListener("click", () => {
    const comment = comment.value.trim();
    console.log(comment)
    if (comment === "") {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerText = comment;
      commentList.appendChild(li);
      comment.value = "";
    }
  });


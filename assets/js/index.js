
// // récupération des id

//   const btnlike = document.getElementById('btnlike');
//   const btndislike = document.getElementById('btndislike');

//   // récupération de la réaction enregistrée
//   const saved = localStorage.getItem('reaction');
//   if (saved === 'like') activerLike();
//   if (saved === 'dislike') activerDislike();

//   btnlike.onclick = () => {
//     localStorage.setItem('reaction', 'like');
//     activerLike();
//   };

//   btndislike.onclick = () => {
//     localStorage.setItem('reaction', 'dislike');
//     activerDislike();
//   };

//     //   foncton  d'activation de like 

//   function activerLike() {
//     btnlike.classList.replace('btn-outline-primary', 'btn-primary');
//     btndislike.classList.replace('btn-primary', 'btn-outline-primary');
//     btnlike.innerHTML = '<i class="bi bi-hand-thumbs-up-fill"></i> J’aime';
//     btndislike.innerHTML = '<i class="bi bi-hand-thumbs-down"></i> Je n’aime pas';
//   }

//      //   fonction  d'activation de dislike 

//   function activerDislike() {
//     btndislike.classList.replace('btn-outline-primary', 'btn-primary');
//     btnlike.classList.replace('btn-primary', 'btn-outline-primary');
//     btndislike.innerHTML = '<i class="bi bi-hand-thumbs-down-fill"></i> Je n’aime pas';
//     btnlike.innerHTML = '<i class="bi bi-hand-thumbs-up"></i> J’aime';
//   }


//    //récupération des champs avec leurs id  
//   const togglecontentbtn = document.getElementById("togglecommentbtn");
//   const commentList = document.getElementById("commentList");
//   const comment = document.getElementById("comment");
//   const commentsubmit = document.getElementById("commentsubmit");


//   //  pour faire coulisser le champs du commentaire en bas de la publication 
  
//   const commentSection = document.getElementById('commentSection');
//   const togglecommentBtn = document.getElementById('togglecommentbtn');
//   const collapseInstance = new bootstrap.Collapse(commentSection, { toggle: false });

//   togglecommentBtn.addEventListener('click', () => {
//     collapseInstance.toggle();
//   });


document.addEventListener("DOMContentLoaded", () => {
  const likeBtn = document.getElementById("btnlike");
  const dislikeBtn = document.getElementById("btndislike");

  // Initialiser les compteurs depuis localStorage
  let liked = localStorage.getItem("like") === "true";
  let disliked = localStorage.getItem("dislike") === "true";

  updateLikeState();

  likeBtn.addEventListener("click", () => {
    liked = !liked;
    disliked = false;
    localStorage.setItem("like", liked);
    localStorage.setItem("dislike", disliked);
    updateLikeState();
  });

  dislikeBtn.addEventListener("click", () => {
    disliked = !disliked;
    liked = false;
    localStorage.setItem("dislike", disliked);
    localStorage.setItem("like", liked);
    updateLikeState();
  });

  function updateLikeState() {
    likeBtn.classList.toggle("btn-primary", liked);
    dislikeBtn.classList.toggle("btn-primary", disliked);
    likeBtn.classList.toggle("btn-outline-primary", !liked);
    dislikeBtn.classList.toggle("btn-outline-primary", !disliked);
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const commentInput = document.querySelector("#commentSection input");
  const submitBtn = document.getElementById("commentsubmit");
  const commentList = document.getElementById("Listcomment");
  const toggleBtn = document.getElementById("togglebtn");
  const commentSection = document.getElementById("commentSection");

  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  renderComments();

  toggleBtn.addEventListener("click", () => {
    commentSection.classList.toggle("show");
  });

  submitBtn.addEventListener("click", () => {
    const text = commentInput.value.trim();
    if (text !== "") {
      comments.push(text);
      localStorage.setItem("comments", JSON.stringify(comments));
      commentInput.value = "";
      renderComments();
    }
  });

 function renderComments() {
  commentList.innerHTML = "";

  comments.forEach((comment, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    const textSpan = document.createElement("span");
    textSpan.textContent = comment;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-outline-danger";
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';

    deleteBtn.addEventListener("click", () => {
      comments.splice(index, 1);
      localStorage.setItem("comments", JSON.stringify(comments));
      renderComments();
    });

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    commentList.appendChild(li);
  });
}

});

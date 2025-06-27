

// document.addEventListener("DOMContentLoaded", () => {
//   const likeBtn = document.getElementById("btnlike");
//   const dislikeBtn = document.getElementById("btndislike");

//   // Initialiser les compteurs depuis localStorage
//   let liked = localStorage.getItem("like") === "true";
//   let disliked = localStorage.getItem("dislike") === "true";

//   updateLikeState();

//   likeBtn.addEventListener("click", () => {
//     liked = !liked;
//     disliked = false;
//     localStorage.setItem("like", liked);
//     localStorage.setItem("dislike", disliked);
//     updateLikeState();
//   });

//   dislikeBtn.addEventListener("click", () => {
//     disliked = !disliked;
//     liked = false;
//     localStorage.setItem("dislike", disliked);
//     localStorage.setItem("like", liked);
//     updateLikeState();
//   });

//   function updateLikeState() {
//     likeBtn.classList.toggle("btn-primary", liked);
//     dislikeBtn.classList.toggle("btn-primary", disliked);
//     likeBtn.classList.toggle("btn-outline-primary", !liked);
//     dislikeBtn.classList.toggle("btn-outline-primary", !disliked);
//   }
// });



// document.addEventListener("DOMContentLoaded", () => {
//   const commentSections = document.querySelectorAll("[data-post-id]");

//   commentSections.forEach(section => {
//     const postId = section.getAttribute("data-post-id");
//     const input = section.querySelector("#commentinput");
//     const submit = section.querySelector("#commentsubmit");
//     const commentList = section.querySelector("#Listcomment");

//     // Charger les commentaires existants pour ce post
//     let comments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];

//     function renderComments() {
//       commentList.innerHTML = "";
//       comments.forEach((comment, index) => {
//         const li = document.createElement("li");
//         li.className = "list-group-item d-flex justify-content-between align-items-center";

//         const text = document.createElement("span");
//         text.textContent = comment;

//         const delBtn = document.createElement("button");
//         delBtn.className = "btn btn-sm btn-outline-danger";
//         delBtn.innerHTML = '<i class="bi bi-trash"></i>';

//         delBtn.addEventListener("click", () => {
//           comments.splice(index, 1);
//           localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
//           renderComments();
//         });

//         li.appendChild(text);
//         li.appendChild(delBtn);
//         commentList.appendChild(li);
//       });
//     }

//     submit.addEventListener("click", () => {
//       const text = input.value.trim();
//       if (text !== "") {
//         comments.push(text);
//         localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
//         input.value = "";
//         renderComments();
//       }
//     });

//     renderComments();
//   });
// });

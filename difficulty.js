const difficulties = document.querySelectorAll('.btn');

let currentActive;

function chooseDifficulty() {
   if (currentActive) {
      removeActive();
      currentActive = this;
      currentActive.classList.toggle('active');

   } else {
      currentActive = this;
      currentActive.classList.toggle('active');
   }
}

const removeActive = () => {
   currentActive.classList.remove('active');
   currentActive = null;
}

difficulties.forEach(btn => {
   btn.addEventListener('click', chooseDifficulty);
})



const submit = () => {
   if (currentActive) {
      let game = currentActive.innerHTML.replace(' ', '').toLowerCase();

      window.location.href = `/index.html?name=${game}`;
      return;

   } else {
      setTimeout(() => {
         document.getElementById('error').innerHTML = "";
         return;
      }, 2000);

      document.getElementById('error').innerHTML = "Morate izabrati tezinu igre.";
   }
}
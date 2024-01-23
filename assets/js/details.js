let id = new URLSearchParams(window.location.search).get("id");
let cards = document.querySelector(".cards");

async function getAllCards() {
  let res = await axios(`http://localhost:3000/users/${id}`);
  let data = await res.data;
  cards.innerHTML = `
        <div class="col col-12 mt-4">
        <div class="card">
          <img width="60px" src="${data.photo}" alt="" />
          <div class="card-body">
            <h5>${data.title}</h5>
            <p>
              ${data.about}
            </p>
            <span>${data.price}$</span>
           
          </div>
        </div>
      </div>
        `;
}
getAllCards()
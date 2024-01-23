let BASE_URL = `http://localhost:3000/basket`;
let cards = document.querySelector(".cards");
let sortBtn = document.querySelector(".sort");
let sorted = "asc";
let filteredArr = [];

async function getAllCards() {
  let res = await axios(BASE_URL);
  let data = await res.data;
  cards.innerHTML = "";
  filteredArr = filteredArr.length ? filteredArr : data;
  filteredArr.forEach((el) => {
    cards.innerHTML += `
        <div class="col col-md-4 col-12 mt-4">
        <div class="card">
          <img width="60px" src="${el.photo}" alt="" />
          <div class="card-body">
            <h5>${el.title}</h5>
            <p>
              ${el.about}
            </p>
            <span>${el.price}$</span>
            <span>count: ${el.count}</span>
            <button class="btn btn-primary m-3">LEARN MORE</button>
            <div>
              <a onclick=deleteBtn(${el.id}) class="btn btn-danger" >DELETE</a>
              <a onclick="editBtn(${el.id})" class="btn btn-secondary" href="">EDİT</a>
              <a onclick="addFav(${el.id})" class="btn btn-dark" >ADD FAV</a>
            </div>
          </div>
        </div>
      </div>
        `;
  });
}
getAllCards();

sortBtn.addEventListener("click", function () {
  if (sorted === "asc") {
    filteredArr.sort((a, b) => a.price - b.price);
    sorted = "dsc";
    sortBtn.innerHTML = "SORT ASC";
  } else if (sorted === "dsc") {
    filteredArr.sort((a, b) => b.price - a.price);
    sorted = "def";
    sortBtn.innerHTML = "SORT DSC";
  } else {
    filteredArr = [];
    sorted = "asc";
    sortBtn.innerHTML = "SORT";
  }
  getAllCards();
});

function deleteBtn(id) {
  axios.delete(`${BASE_URL}/${id}`);
}
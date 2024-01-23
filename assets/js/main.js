let cards = document.querySelector(".cards");
let sortBtn = document.querySelector(".sort");
let search=document.querySelector(".input");

let sorted = "ascending";
let filteredArr = [];
let copyArr=[];
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("nav").style.top = "0";
    
  } else {
    document.getElementById("nav").style.top = "-50px";
  }
}

async function getAllCards() {
  let res = await axios("http://localhost:3000/users");
  let data = await res.data;
  cards.innerHTML = ""
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
            <a class="btn btn-primary m-3" href="./details.html?id=${el.id}" >LEARN MORE</a>
            <div>
              <a onclick=deleteBtn(${el.id}) class="btn btn-danger" >DELETE</a>
              <a onclick="editBtn(${el.id})" class="btn btn-secondary" href="./add.html?id=${el.id}">EDİT</a>
              <a onclick="addFav(${el.id})" class="btn btn-dark" >Add Basket</a>
            </div>
          </div>
        </div>
      </div>
      `;
  });
}
getAllCards();

sortBtn.addEventListener("click", function () {
  if (sorted === "ascending") {
    filteredArr.sort((a, b) => a.price - b.price);
    sorted = "descending";
    sortBtn.innerText = "DRINKS";
  } else if (sorted === "descending") {
    filteredArr.sort((a, b) => b.price - a.price);
    sorted = "def";
    sortBtn.innerText = "DESERT";
  } else {
    filteredArr = []
    sorted = "ascending";
    sortBtn.innerHTML = "MAIN";
  }
  getAllCards();
});

function deleteBtn(id) {
  axios.delete(`http://localhost:3000/users/${id}`);
  window.location.reload()
}

let count = 1

async function addFav(cardId) {
  let res = await axios(`http://localhost:3000/users/${cardId}`);
  let obj = await res.data;


  if (objBasket.every(item => item.id !== obj.id)) {
    axios.post(`http://localhost:3000`, { count: 1, ...obj })
  } else {
    axios.patch(`http://localhost:3000/basket/${item.id}`, { count: count++ })
  }
}
search.addEventListener("input", function (e) {
    filteredArr = copyArr;
    filteredArr = filteredArr.filter((el) =>
      el.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    getAllCards();
  });
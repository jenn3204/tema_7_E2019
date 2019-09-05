document.addEventListener("DOMContentLoaded", start);

let menu = [];
let filter = "alle";
let filterKnapper = document.querySelectorAll("nav button");
const skabelon = document.querySelector("template").content;
const liste = document.querySelector("#liste");

function start() {
    hentData();
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrer));

}

function filtrer() {
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    filter = this.dataset.kategori;
    visData();

}

async function hentData() {
    let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");
    menu = await jsonData.json();
    visData();

}

function visData() {
    liste.textContent = "";

    menu.feed.entry.forEach(ret => {
        if (ret.gsx$kategori.$t == filter || filter == "alle") {
            const klon = skabelon.cloneNode(true);

            klon.querySelector("img").src = `imgs/small/${ret.gsx$billede.$t}-sm.jpg`;
            klon.querySelector("img").alt = ret.gsx$navn.$t;

            klon.querySelector("h2").textContent = ret.gsx$navn.$t;

            liste.appendChild(klon);

            liste.lastElementChild.addEventListener("click", () => {
                location.href = `detalje.html?id=${ret.gsx$id.$t}`;
            });

        }

    })

}

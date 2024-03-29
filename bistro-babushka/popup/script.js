document.addEventListener("DOMContentLoaded", start);

let menu = [];
let filter = "alle";
let filterKnapper = document.querySelectorAll("nav button");
const skabelon = document.querySelector("template").content;
const liste = document.querySelector("#liste");

function start() {
    hentData();
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrer));
    skjulInfo();

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

            klon.querySelector(".ret").addEventListener("click", () => {
                visInfo(ret);
            })

            liste.appendChild(klon);

        }

    })

}

function skjulInfo() {
    document.querySelector("#info").style.display = "none";

}

function visInfo(ret) {
    document.querySelector("#info").style.display = "block";
    document.querySelector("#info .luk").addEventListener("click", skjulInfo);

    document.querySelector("#info h1").textContent = ret.gsx$navn.$t;
    document.querySelector("#info img").src = `imgs/large/${ret.gsx$billede.$t}.jpg`;
    document.querySelector("#info img").alt = ret.gsx$navn.$t;
    document.querySelector("#info h3").textContent = "Oprindelse: " + ret.gsx$oprindelse.$t;
    document.querySelector("#beskrivelse").textContent = ret.gsx$lang.$t;
    document.querySelector("#pris").textContent = `Pris: ${ret.gsx$pris.$t} kr.`;

}

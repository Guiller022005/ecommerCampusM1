import { menulistCategoryIndex } from "./components/menu.js";
import { galleryIndex } from "./components/gallery.js";
import { getAllProductName, getAllCategory } from "./module/app.js";

/*let header__information = document.querySelector(".header__information")
let [p, span]= header__information.children;

span.innerHTML = "Guillermo Paúl";*/

let input__search = document.querySelector("#input_search");
let main__article = document.querySelector(".main__article");
let nav__ul = document.querySelector(".nav__ul");

addEventListener("DOMContentLoaded", async e=>{
    if(!localStorage.getItem("getAllCategory")) localStorage.setItem("getAllCategory", JSON.stringify(await getAllCategory()));
    nav__ul.innerHTML = await menulistCategoryIndex(JSON.parse(localStorage.getItem("getAllCategory")));
})

input__search.addEventListener("change", async e => {
    let params = new URLSearchParams(location.search);
    let data = { search : e.target.value, id: params.get('id')}
    input__search.value = null;
    let res = await getAllProductName(data)
    main__article.innerHTML = galleryIndex(res, params.get('id'));

    //let data = {search : e.target.value};
    //let res = await getAllProductName(data);
    //console.log(res);
});
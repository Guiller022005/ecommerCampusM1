import { menulistCategoryIndex } from "./components/menu.js";
import { galleryIndex } from "./components/gallery.js";
import { getAllProductName, getAllCategory} from "./module/app.js";

/*let header__information = document.querySelector(".header__information")
let [p, span]= header__information.children;

span.innerHTML = "Guillermo Paúl";*/

let input__Search = document.querySelector("#input_Search");
let main__article = document.querySelector(".main__article");
let nav__ul = document.querySelector(".nav__ul");

addEventListener("DOMContentLoaded", async e=>{
    let data = await getAllCategory();
    nav__ul.innerHTML = await menulistCategoryIndex(data);
})

input__Search.addEventListener("change", async (e) => {
    let data = { search : e.target.value}
    input__Search.value = null;

    let res = await getAllProductName(data)
    main__article.innerHTML = galleryIndex(res);

    //let data = {search : e.target.value};
    //let res = await getAllProductName(data);
    //console.log(res);
});
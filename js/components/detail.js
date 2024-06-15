import { getProductId } from "../module/detail.js";
import { titleProductDetail, infoProductDetail } from "./section.js";
import { galleryCategory } from "./gallery.js";


let main__section_gallery = document.querySelector("#main__section_gallery");
let main__section__title = document.querySelector("#main__section__title");
let main__section__information = document.querySelector("#main__section__information");

addEventListener("DOMContentLoaded", async(e)=>{
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    if(!localStorage.getItem(id)) localStorage.setItem(id, JSON.stringify(await getProductId({id})));
    let info = JSON.parse(localStorage.getItem(id));
    main__section_gallery.innerHTML = await galleryCategory(info);
    main__section__title.innerHTML = await titleProductDetail(info);
    main__section__information.innerHTML = await infoProductDetail(info);
    // let {data} = res;
    // let {
    //     category_path,
    //     about_product,
    //     product_details,
    //     product_information,
    //     product_photos,
    //     product_variations,
    //     rating_distribution,
    //     review_aspects,
    //     ...dataUpdate
    // } = data;
    // console.log(dataUpdate);

    let parrafo = document.querySelector("#parrafo");
    
    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "readMoreButton") {
            let info_completed = info.data.product_description;
            parrafo.innerHTML = info_completed;
        }
    });
})

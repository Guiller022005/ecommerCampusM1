export const buttonCartDetails = async(res)=>{
    let {data} = res;
    let {
        category_path,
        about_product,
        product_details,
        product_information,
        product_photos,
        product_variations,
        rating_distribution,
        review_aspects,
        ...dataUpdate
    } = data;
    console.log(dataUpdate);
    let product_original_price = dataUpdate.product_original_price;
    let product_price = dataUpdate.product_price;
    if(product_original_price != null && product_original_price.indexOf("$")) product_original_price = `$${product_original_price}` 
    if(product_price.indexOf("$")) product_price = `$${product_price}` 

    return /*html*/`
    <li>
        <a href="./checkout.html">
            <img src="../storage/img/shoppingcar.svg">
            <span>Add to Cart | ${(product_original_price) ? "<span id='price_discount'>"+product_price+"</span><del><sub id='price_original'>"+product_original_price+"</sub></del>" : "<span id='price_discount'>"+product_price+"</span> <del><sub id='price_original'></sub></del>"} </span>
        </a>
    </li>`;
}

export const footerIndex = async (res) =>{
    let plantilla =""
    let valTotalItems = "";
    if (res.totalItems > 0) {
        valTotalItems = res.totalItems;
    } 
    

    plantilla += /*html*/`
    <li>
    <a href="#">
        <img src="storage/img/homeSelect.svg" alt="">
    </a>
    </li>
    <li>
        <a href="views/checkout.html">
            <span style ="color: white" >${valTotalItems} </span>
            <img src="storage/img/bag.svg" alt="">
        </a>
    </li>
    <li>
        <a href="#">
            <img src="storage/img/heart.svg" alt="">
        </a>
    </li>
    <li>
        <a href="#">
            <img src="storage/img/profile.svg" alt="">
        </a>
    </li>`
    return plantilla;
}
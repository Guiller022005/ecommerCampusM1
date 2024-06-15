export const titleProductDetail = async({ data:dataUpdate } = res)=>{
    return /*html*/`
        <article class="article__detail">
            <div class="detail__head">
                <h1>${dataUpdate.product_title}</h1>
                <div class="product__select">
                    <img src="../storage/img/minus.svg">
                    <span>1</span>
                    <img src="../storage/img/plus.svg" alt="">
                </div>
            </div>
            <div class="detail__score">
                ${new Array(parseInt(dataUpdate.product_star_rating)).fill(`<img src="../storage/img/star.svg">`).join('')}
                <span>${dataUpdate.product_star_rating}</span>
                <a href="${dataUpdate.product_url}">(${dataUpdate.product_num_ratings} reviews)</a>
            </div>
        </article>`;
}

export const infoProductDetail = async({ data:dataUpdate } = res) => {
    let description = async()=>{
        let text = dataUpdate.product_description;
        let description = text.toString();
        
        if (description.length > 150) {
            description = description.slice(0,150)+'<strong id="readMoreButton" >Read More. . .</strong>';
        }
        return description;
    }
    
    return /*html*/`
    <article class="product__information">
        <p id="parrafo" >${await description()}</p>
    </article>
    `;
}       
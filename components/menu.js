export const menulistCategoryIndex = (res)=>{
    let {data} = res;
    let plantilla = "";
    data.forEach((value, index) => {
        plantilla += /*html*/`
        <li title="${value.name}">
            <a href="#">
                <img src="storage/img/categoryHover.svg">
    let {data} = res;
    let {data} = res;
                <span> ${value.name}</span>
            </a>
        </li>
        `;
    });
    return plantilla;
} 
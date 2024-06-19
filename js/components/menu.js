export const menulistCategoryIndex = async (res)=>{
    let {data} = res;
    let plantilla = "";
    data.forEach(value => {
        plantilla += /*html*/ `
        <li title="${value.name}">
            <a href="?id=${value.id}" >
                <img src="storage/img/categoryHover.svg" >
                <span>${value.name}</span>
            </a>
        </li>
        `;
    });
    return plantilla;
}



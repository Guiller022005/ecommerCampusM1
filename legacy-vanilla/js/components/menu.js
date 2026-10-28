/**
 * Menu Category Component with clean, high-contrast SVG icons
 */

const getCategoryIconSvg = (id) => {
    switch (id) {
        case "fashion":
            return `<svg class="category-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>`;
        case "shoes":
            return `<svg class="category-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4l-5-2-4 2H3v4z"></path><path d="M12 11l-3 4"></path></svg>`;
        case "watches":
            return `<svg class="category-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.34a2 2 0 0 1 2 1.82l.35 3.83"></path></svg>`;
        case "hats":
            return `<svg class="category-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h20"></path><path d="M5 18a7 7 0 0 1 14 0"></path><path d="M8 12h8"></path></svg>`;
        case "bags":
            return `<svg class="category-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"></path><path d="M10 12h4"></path></svg>`;
        case "aps":
        default:
            return `<svg class="category-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`;
    }
};

export const menulistCategoryIndex = async (res, activeId = "aps") => {
    if (!res || !res.data) return "";
    let { data } = res;
    let plantilla = "";
    
    data.forEach(value => {
        const isActive = (value.id === activeId || (activeId === "aps" && value.id === "aps"));
        const iconSvg = getCategoryIconSvg(value.id);
        
        plantilla += /*html*/ `
        <li title="${value.name}" class="category-item">
            <a href="?id=${value.id}" data-id="${value.id}" class="category-link ${isActive ? 'active' : ''}">
                ${iconSvg}
                <span>${value.name}</span>
            </a>
        </li>
        `;
    });
    return plantilla;
};

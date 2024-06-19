import { getProductId } from "./app.js";

let params = new URLSearchParams(location.search);
let { data } = await getProductId(params.get("id"));
let {about_product} = data;

export const openRequest = indexedDB.open("storage", 1);
openRequest.onupgradeneeded = async () => {
 
    if (!db.objectStoreNames.contains('books')) { // si no hay un almacén de libros ("books"),
      db.createObjectStore('books', {keyPath: 'id'}); // crearlo
    }
}

let db = openRequest.result;
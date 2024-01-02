import { Store } from "../hooks";

export const contentInfoWindow = (store: Store) => `
<div class="custom-info-window">
<h1 class="title">${store.name}</h1>
<div class="wrapper-info">
<p class="subtitle">Endereço</p>
<label>${store.city}</label>
</div>
<div class="wrapper-info">
<p class="subtitle">Montante</p>
<label>${store.totalMount}</label>
</div>
</div>
`;

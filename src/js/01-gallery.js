import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainerRef = document.querySelector(".gallery");
const galleryAllMarkup = createGalleryAllMarkup(galleryItems);
const modal = basicLightbox.create(
  `
    <img src="" width="800" height="600">
`,
  {
    onShow: (modal) => {
      window.addEventListener("keydown", onEscPress);
    },
    onClose: (modal) => {
      window.removeEventListener("keydown", onEscPress);
    },
  }
);

galleryContainerRef.insertAdjacentHTML("beforeend", galleryAllMarkup);

galleryContainerRef.addEventListener("click", onGaleryElClick);

function createGalleryAllMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
    )
    .join("");
}

function onGaleryElClick(e) {
  e.preventDefault();
  if (e.target.classList.contains("gallery__image")) {
    const modalImgUrl = e.target.dataset.source;
    modal.element().querySelector("img").src = modalImgUrl;
    modal.show();
  }
}

function onEscPress(e) {
  if (e.code === "Escape") {
    modal.close();
  }
}

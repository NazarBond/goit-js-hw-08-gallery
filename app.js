const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg",
    description: "Tulips",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2012/03/01/00/55/flowers-19830__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2012/03/01/00/55/flowers-19830_1280.jpg",
    description: "Flowers",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729509__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729509_1280.jpg",
    description: "Rose",
  },
];

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  image: document.querySelector(".lightbox__image"),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  overlay: document.querySelector(".lightbox__overlay"),
};

let currentIndex = 0;

// ✅ Рендер галереї
const markup = galleryItems
  .map(
    ({ preview, original, description }) => `
<li>
  <a href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  )
  .join("");

refs.gallery.insertAdjacentHTML("beforeend", markup);

// ✅ Клік по галереї
refs.gallery.addEventListener("click", (e) => {
  e.preventDefault();

  if (!e.target.classList.contains("gallery__image")) return;

  const src = e.target.dataset.source;

  currentIndex = galleryItems.findIndex((item) => item.original === src);

  openModal(src, e.target.alt);
});

// ✅ Відкрити модалку
function openModal(src, alt) {
  refs.lightbox.classList.add("is-open");
  refs.image.src = src;
  refs.image.alt = alt;

  window.addEventListener("keydown", handleKeys);
}

// ✅ Закрити
function closeModal() {
  refs.lightbox.classList.remove("is-open");
  refs.image.src = "";
  refs.image.alt = "";

  window.removeEventListener("keydown", handleKeys);
}

refs.closeBtn.addEventListener("click", closeModal);
refs.overlay.addEventListener("click", closeModal);

// ✅ Клавіші
function handleKeys(e) {
  if (e.code === "Escape") closeModal();

  if (e.code === "ArrowRight") {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateImage();
  }

  if (e.code === "ArrowLeft") {
    currentIndex =
      (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateImage();
  }
}

function updateImage() {
  refs.image.src = galleryItems[currentIndex].original;
  refs.image.alt = galleryItems[currentIndex].description;
}

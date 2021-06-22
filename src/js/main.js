import mydefault from "./gallery-items.js";


// Галерея //
const galleryEl = document.querySelector(".js-gallery");
const cardsMarkup = createImgCards(mydefault);

function createImgCards(mydefault) {
  return mydefault
    .map(({ preview, original, description } = {}, index) => {
      return `<li class="gallery__item">
      <a
        class="gallery__link"
        href=${original}
      >
      <img
        class="gallery__image"
        src=${preview}
        data-source=${original}
        data-index = ${index}
        alt=${description}
      />
    </a>
  </li>`;
    })
    .join("");
}

galleryEl.innerHTML = cardsMarkup;

// переменные, модальное окно, кнопки переключения карточек //
const lightboxEl = document.querySelector(".js-lightbox");
const lightboxImgEl = document.querySelector(".lightbox__image");
const closeButtonEl = document.querySelector('[data-action="close-lightbox"]');
const lightboxOverlayEl = document.querySelector(".lightbox__overlay");

galleryEl.addEventListener("click", onCardClick);
lightboxEl.addEventListener("click", onlightboxElClick);
window.addEventListener("keyup", onKeyboardEvent);

function onCardClick(evt) {
  evt.preventDefault();

  const isGalleryImgEl = evt.target.classList.contains("gallery__image");
  if (!isGalleryImgEl) {
    return;
  }
  openModal(evt.target.dataset.source, evt.target.dataset.index);
}

function onlightboxElClick(evt) {
  const iscloseButtonEl = evt.target === closeButtonEl;
  const islightboxOverlayEl = evt.target === lightboxOverlayEl;

  if (!iscloseButtonEl && !islightboxOverlayEl) {
    return;
  }

  closeModal();
}

function onKeyboardEvent(evt) {
  const isEscape = evt.code === "Escape";
  const isArrowRight = evt.code === "ArrowRight";
  const isArrowLeft = evt.code === "ArrowLeft";

  if (isEscape) {
    closeModal(evt);
  }

  if (isArrowRight || isArrowLeft) {
    showNextImg(isArrowRight);
  }
}

function openModal(src, index) {
  lightboxEl.classList.add("is-open");
  lightboxImgEl.setAttribute("data-index", index);
  lightboxImgEl.src = src;
}

function closeModal() {
  lightboxEl.classList.remove("is-open");
  lightboxImgEl.src = "";
}

function showNextImg(toRight) {
  let index;

  index = toRight
    ? Number(lightboxImgEl.dataset.index) + 1
    : Number(lightboxImgEl.dataset.index) - 1;

  if (index < 0) {
    index = mydefault.length + index;
  }

  if (index === mydefault.length) {
    index = 0;
  }

  lightboxImgEl.src = mydefault[index].original;
  lightboxImgEl.dataset.index = index;
}
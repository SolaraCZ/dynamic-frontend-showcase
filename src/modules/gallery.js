import { getAssetUrl, shuffleInPlace } from '../utils.js';
import { getCurrentLang, t } from '../i18n.js';

const galleryPhotos = [
  { title: "img1", src: getAssetUrl("images/img1.jpg") },
  { title: "img2", src: getAssetUrl("images/img2.jpg") },
  { title: "img3", src: getAssetUrl("images/img3.jpg") },
  { title: "img4", src: getAssetUrl("images/img4.jpg") },
  { title: "img5", src: getAssetUrl("images/img5.jpg") },
  { title: "img6", src: getAssetUrl("images/img6.jpg") },
];

const galleryGrid = document.getElementById("galleryGrid");
const galleryShuffleBtn = document.getElementById("galleryShuffleBtn");

function buildGalleryWindowHtml(payload, startIndex, lang) {
  const scriptClose = "</scr" + "ipt>";
  const htmlLang = (lang === 'cs') ? 'cs' : 'en';
  const title = t('gallery.title');
  return `<!DOCTYPE html>
<html lang="${htmlLang}"><head><meta charset="UTF-8"><title>${title}</title><style>
body { margin: 0; background: #2a2a2a; color: #fff; font-family: sans-serif; display: grid; place-items: center; min-height: 100vh; }
.frame { padding: 24px; border: 1px solid rgba(255,255,255,0.12); border-radius: 28px; background: #4f4f4f; text-align: center; }
img { max-width: 80vw; max-height: 68vh; border-radius: 24px; }
</style></head><body><div class="frame">
<p id="counter"></p><img id="img"><h1 id="title"></h1></div>
<script>
const p = ${JSON.stringify(payload)}; let i = ${startIndex};
const img = document.getElementById('img'); const t = document.getElementById('title'); const c = document.getElementById('counter');
const render = () => { const item = p[i]; img.src = item.src; t.textContent = item.title; c.textContent = (i + 1) + ' / ' + p.length; i = (i + 1) % p.length; };
render(); setInterval(render, 1000);
${scriptClose}</body></html>`;
}

function openGalleryWindow(index) {
  const win = window.open("", "galleryWindow", "width=1100,height=820");
  if (!win) return;
  const lang = getCurrentLang();
  win.document.write(buildGalleryWindowHtml(galleryPhotos, index, lang));
  win.document.close();
}

export function renderGallery() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = "";
  galleryPhotos.forEach((photo, index) => {
    const card = document.createElement("button");
    card.className = "gallery-card";
    card.innerHTML = `<img src="${photo.src}" alt="${photo.title}">`;
    card.onclick = () => openGalleryWindow(index);
    galleryGrid.appendChild(card);
  });
}

export function initGallery() {
  renderGallery();
  galleryShuffleBtn?.addEventListener("click", () => {
    shuffleInPlace(galleryPhotos);
    renderGallery();
  });
}
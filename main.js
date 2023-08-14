import { API } from './scripts/api.js';
import {
  elements,
  renderPlayingIfo,
  updateTitle,
} from './scripts/ui.js';

// api class'ından bir örenk oluşturma
const api = new API();

// Sayfa yüklendiği anda api'a istek atıp
// popüler müzikleri listeler
document.addEventListener(
  'DOMContentLoaded',
  async () => await api.getPopular()
);

// parametre olarak aldığı müziği çalar
const playMusic = (url) => {
// müzğin url'ini html'e aktarma
 elements.audioSource.src = url;

// audio elementinin müziği yüklemesini sağladık
  elements.audio.load();
// müziği oynatır
  elements.audio.play();
};

// listede tıklamalarda çalışır
const handleClick = (e) => {
  if (e.target.id === 'play-btn') {
// kapsayıcı kart elemanına erişme
    const parent = e.target.closest('.card');

    // çalınacak müziğin bilgilerini ekrana basar
    renderPlayingIfo(parent.dataset);

    // müziği çalar
    playMusic(parent.dataset.url);
  }
};

// liste alanındaki tıklamalı izler
document.addEventListener('click', handleClick);

// fotoğrafı döndürür
const animatePhoto = (e) => {
  const img = document.querySelector('.info img');
  img.className = 'animate';
};

const stopAnimation = (e) => {
  const img = document.querySelector('.info img');
  img.classList.remove('animate');
};

// müziğin çalma olayını izleme
elements.audio.addEventListener('play', animatePhoto);
elements.audio.addEventListener('pause', stopAnimation);

// form olaylarını izleme
elements.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  if (!query) return;

  // başlığı güncelle
  updateTitle(`${query} İçin Sonuçlar`);
  // aratılan kelimyle eşelşen müzekleri çeker
  api.searchMusic(query);
});
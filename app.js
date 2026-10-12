'use strict';
const menuDialog = document.getElementById('menu-dialog');
const menuToggle = document.querySelector('.menu-toggle');
const form = document.getElementById('lead-form');
const carInput = document.getElementById('car');
const serviceSelect = document.getElementById('service');
const status = document.getElementById('form-status');

menuToggle.addEventListener('click', () => {
  menuDialog.showModal();
  document.body.classList.add('modal-open');
  menuToggle.setAttribute('aria-expanded', 'true');
});
menuDialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  menuToggle.setAttribute('aria-expanded', 'false');
});
menuDialog.addEventListener('click', event => {
  if (event.target === menuDialog) menuDialog.close();
});
menuDialog.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menuDialog.close()));
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => menuDialog.close()));
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  serviceSelect.value = link.dataset.service;
}));

function composeWhatsAppUrl(car, service, details) {
  const lines = ['Здравствуйте, Elit Auto!', 'Автомобиль: ' + car + '.', 'Задача: ' + service + '.'];
  if (details) lines.push('Детали: ' + details);
  lines.push('Хочу обсудить стоимость после оценки повреждений. Фотографии приложу в чате.');
  return 'https://wa.me/79184254720?text=' + encodeURIComponent(lines.join('\n'));
}
form.addEventListener('submit', event => {
  event.preventDefault();
  carInput.setCustomValidity(carInput.value.trim().length < 2 ? 'Укажите марку и модель автомобиля.' : '');
  if (!form.reportValidity()) return;
  const url = composeWhatsAppUrl(carInput.value.trim(), serviceSelect.value, document.getElementById('message').value.trim());
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.append(link);
  link.click();
  link.remove();
  status.textContent = 'Сообщение подготовлено. Прикрепите фотографии и нажмите «Отправить» в открывшемся чате WhatsApp.';
});
carInput.addEventListener('input', () => carInput.setCustomValidity(''));
form.addEventListener('input', () => { status.textContent = ''; });
const backtop = document.querySelector('.backtop');
window.addEventListener('scroll', () => { backtop.hidden = window.scrollY < 800; }, { passive: true });
backtop.addEventListener('click', () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  document.querySelector('.brand').focus({ preventScroll: true });
});
document.getElementById('year').textContent = new Date().getFullYear();

import './styles.css';
import ApiService from './js/apiService';
import imgTpl from './templates/imageList.hbs';
import getRefs from './js/refs';
import { onOpenModal } from './js/modal';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { info, success, error } from '@pnotify/core';


const refs = getRefs();
const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onOpenModal);

function onSearch(event) {
    event.preventDefault();

    apiService.query = event.currentTarget.elements.query.value;

    if (apiService.query === '' || apiService.query === ' ') {
  return error({
         text: "The search is empty",
         delay: 2000,
         maxTextHeight: 0,
       }); 
  }

    apiService.resetPage();
    clearImg();
    apiService.fetchImg().then(hits => {
        appendImgMarkup(hits);
        apiService.incrementPage();
    });
}

function appendImgMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', imgTpl(hits));
}

function clearImg(){
    refs.gallery.innerHTML = '';
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && apiService.query !== '') {
            apiService.fetchImg().then(img => {
                appendImgMarkup(img);
                apiService.incrementPage();
            });
        }
    });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.scroll);
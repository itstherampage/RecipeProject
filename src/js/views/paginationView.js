import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  AddHandlerClick = handler => {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) {
        return;
      }

      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  };

  _generateMarkup() {
    const currentPage = this._data.currentPage;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //buttons below can be refactored because they're repeating the same code

    //Page 1 and there are other pages

    //data properties are created by using data-"name"
    //can be accessed in the event handler with dataset."name"

    if (currentPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    // last page
    if (currentPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      `;
    }
    //other page
    if (currentPage < numPages) {
      return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }
    //page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();

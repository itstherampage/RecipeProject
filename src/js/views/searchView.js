class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  AddHandlerSearch = handler => {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
    // ['submit'].forEach(ev => window.addEventListener(ev, handler));
  };
}

export default new SearchView();

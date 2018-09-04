'use strict';

import routes from './book.routes';

class BookComponent {
  constructor($state) {
    'ngInject';
    this.fields = [
      {field: 'image', heading: 'Image', dataType: 'image'},
      {field: 'name', title: 'Title', dataType: 'text'},
      {field: 'author', dataType: 'text'},
      {field: 'category', dataType: 'select', options: ['Fiction', 'Non fiction', 'Inspirational', 'Novel', 'Science', 'Story']},
      {field: 'price', dataType: 'currency'},
      {field: 'releaseDate', dataType: 'date'},
      {field: 'isbn', heading: 'ISBN', dataType: 'text', noEdit: true},
      {field: 'active', heading: 'Availability', dataType: 'boolean'}
    ];
  }
}

export default angular.module('materialCrudSqlApp.book', [])
  .config(routes)
  .component('book', {
    template: require('./book.html'),
    controller: BookComponent,
    bindings: { }
  })
  .name
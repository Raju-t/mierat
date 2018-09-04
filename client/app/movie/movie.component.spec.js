'use strict';

describe('Component: MovieComponent', function() {
  // load the controller's module
  beforeEach(module('materialCrudSqlApp.movie'));

  var MovieComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MovieComponent = $componentController('movie', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

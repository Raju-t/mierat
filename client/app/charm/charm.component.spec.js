'use strict';

describe('Component: CharmComponent', function() {
  // load the controller's module
  beforeEach(module('materialCrudSqlApp.charm'));

  var BookComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    BookComponent = $componentController('charm', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

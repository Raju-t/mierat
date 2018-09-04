'use strict';

describe('Component: DocComponent', function() {
  // load the controller's module
  beforeEach(module('materialCrudSqlApp.doc'));

  var DocComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    DocComponent = $componentController('doc', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

'use strict';

describe('Component: CenterComponent', function() {
  // load the controller's module
  beforeEach(module('materialCrudSqlApp.center'));

  var CenterComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CenterComponent = $componentController('center', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

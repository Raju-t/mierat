'use strict';

describe('Component: LargeinitialComponent', function() {
  // load the controller's module
  beforeEach(module('materialCrudSqlApp.largeinitial'));

  var LargeinitialComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LargeinitialComponent = $componentController('largeinitial', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

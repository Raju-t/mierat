'use strict';

describe('Component: SmallinitialComponent', function() {
  // load the controller's module
  beforeEach(module('materialCrudSqlApp.smallinitial'));

  var SmallinitialComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    SmallinitialComponent = $componentController('smallinitial', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

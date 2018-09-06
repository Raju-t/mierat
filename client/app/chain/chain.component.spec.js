'use strict';

describe('Component: ChainComponent', function() {
  // load the controller's module
  beforeEach(module('materialCrudSqlApp.chain'));

  var ChainComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ChainComponent = $componentController('chain', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

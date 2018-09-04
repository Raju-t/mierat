'use strict';

describe('Component: TaskComponent', function() {
  // load the controller's module
  beforeEach(module('materialCrudSqlApp.task'));

  var TaskComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TaskComponent = $componentController('task', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

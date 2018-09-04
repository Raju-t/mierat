'use strict';

describe('Component: MediaComponent', function() {
  // load the controller's module
  beforeEach(module('materialCrudSqlApp.media'));

  var MediaComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MediaComponent = $componentController('media', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});

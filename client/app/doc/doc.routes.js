'use strict';

export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('doc', { url: '/doc', template: '<doc></doc>', title: 'Documentation' })
    .state('doc.use', { url: '/use', template: require('./use.html'), title: 'Usage' })
    .state('doc.pre', { url: '/pre', template: require('./installation/pre.html'), title: 'Installation Setup' })
    .state('doc.npm', { url: '/npm', template: require('./installation/npm.html'), title: 'npm' })
    .state('doc.env', { url: '/env', template: require('./settings/env.html'), title: 'Envirnoment Setup' })
    .state('doc.database', { url: '/database', template: require('./settings/database.html'), title: 'Database Settings' })
    .state('doc.shared', { url: '/shared', template: require('./settings/shared.html'), title: 'Shared Settings' })
    .state('doc.root', { url: '/root', template: require('./overview/root.html'), title: 'Project Walkthrough' })
    .state('doc.client', { url: '/client', template: require('./overview/client.html'), title: 'Project Walkthrough' })
    .state('doc.server', { url: '/server', template: require('./overview/server.html'), title: 'Project Walkthrough' });
}

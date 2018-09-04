'use strict';

import routes from './doc.routes';
import directives from '../../components/directives/directive.directive';

export class DocComponent {
  /*@ngInject*/
  constructor($state, ToggleComponent) {
    this.page = $state.current.name;
    this.ToggleComponent = ToggleComponent;
    
    this.features = [
      {h: 'MEAN Stack', p: 'Developed using the most popular MEAN(MySQL + Express + Angular + Node) which has a RestAPI based architecture with high scallability.', i: 'assets/images/mean.png'},
      {h: 'Authentication', p: 'Inbuilt authentication mechanism with role based user access and user management', i: 'assets/images/user-roles.png'},
      {h: 'Material Design', p: 'Based on Google Material designe guidelines which gives you a responsive, bold and accessible design with great amount of user interactivity', i: 'assets/images/material-design.png'},
      {h: 'Emails', p: 'Integration of emails at diffent levels like Order Placement, Forgot/Reset password gives a secure as well as informative feeling', i: 'assets/images/email.png'},
      {h: 'Modular Code', p: 'The modular application structure gives you enormous ability to modify, test and deploy easily', i: 'assets/images/code.png'},
      {h: 'ReST API based backend', i: 'http', c: 'fill: #26a69a'},
      {h: 'Local + OAUTH login', i: 'lock_outline', c: 'fill: #2196F3'},
     ,{h2: 'Media Management',p:'With integrated drag and drop image upload its easy to manage the images for the whole shop'}
     ,{h2: 'NodeJS Module',p:'ES6 module structure for serve side programming.'}
     ,{h2: 'User Roles',p:'Role based user management for both client and server side e.g. User, Manager, Administrator'}
     ,{h2: 'Email Integration',p:'Now an email is sent as soon as a order is placed or payment failed'}
     ,{h2: 'New Design Principle',p:'Flex based page design principle'}
     ,{h2: 'CRUD Table',p:'Free Material CRUD Table module comes with this Material Shop'}
     ,{h2: 'Image Selector',p:'Directly select image for a product from the media gallery'}
     ,{h2: 'Cloning',p:'Now Clone any brand, country, shipping, coupon to save time'}
     ,{h2: 'Forgot Password',p:'Forgotten password of a user or shop manager can be retrieved with a encryption based email service'}
     ,{h2: 'Contact Page',p:'A tiny little popup window for anybody to reach the store owner with any grievance or suggestions'}
    ]
    if($state.current.name === 'doc')
      $state.go('doc.pre');
  }
  close(){
    this.ToggleComponent('doc-sidenav').close(); 
  }
  open(){
    this.ToggleComponent('doc-sidenav').open();
  }
}

export default angular.module('materialCrudSqlApp.doc', [directives])
  .config(routes)
  .component('doc', {
    template: require('./index.html'),
    controller: DocComponent,
    controllerAs: 'doc'
  })
  .component('docMenu', {
    template: `
    <md-toolbar class="md-whiteframe-2dp">
      <div class="md-toolbar-tools navbar" layout="row" layout-align="space-around center">
        <h3><a ui-sref="/">Material Shop</a></h3>
        <md-button ui-sref="docInstall" class="md-raised md-default md-button md-ink-ripple" flex="20" ng-hide="$ctrl.page=='docInstall'"><ng-md-icon icon="now_widgets"></ng-md-icon>Installation</md-button>
        <md-button ui-sref="doc" class="md-raised md-default md-button md-ink-ripple" flex="20" ng-hide="$ctrl.page=='doc'"><ng-md-icon icon="star"></ng-md-icon>Highlights</md-button>
        <md-button ui-sref="docFeatures" class="md-raised md-default md-button md-ink-ripple" flex="20" ng-hide="$ctrl.page=='docFeatures'"><ng-md-icon icon="spellcheck"></ng-md-icon>Features</md-button>
        <md-button ui-sref="docUse" class="md-raised md-default md-button md-ink-ripple" flex="20" ng-hide="$ctrl.page=='docUse'"><ng-md-icon icon="spellcheck"></ng-md-icon>Store Use</md-button>
        <md-button ui-sref="/" class="md-raised md-default md-button md-ink-ripple" flex="20" ng-hide="$ctrl.page=='docBack'"><ng-md-icon icon="spellcheck"></ng-md-icon>Store Demo</md-button>
      </div>
    </md-toolbar>
    `,
    controller: DocComponent
  })
  .component('docNav', {
    template: `
    <md-button ui-sref="docInstall" class="md-raised md-primary md-button md-ink-ripple" ng-hide="$ctrl.page=='docInstall'"><ng-md-icon icon="now_widgets"></ng-md-icon>Installation</md-button>
      <md-button ui-sref="doc" class="md-raised md-primary md-button md-ink-ripple"   ng-hide="$ctrl.page=='doc'"><ng-md-icon icon="star"></ng-md-icon>Highlights</md-button>
      <md-button ui-sref="docFeatures" class="md-raised md-primary md-button md-ink-ripple" ng-hide="$ctrl.page=='docFeatures'"><ng-md-icon icon="spellcheck"></ng-md-icon>Features</md-button>
    `,
    controller: DocComponent
  })
  .name;

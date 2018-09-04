import contactForm from './contact-form.component';
import submitButton from '../submit-button/submit-button.component';

export class FooterComponent {
  /*@ngInject*/
  constructor($mdDialog, $http, $mdMedia) {
    this.$mdDialog = $mdDialog
    this.$mdMedia = $mdMedia
    this.screenIsBig = $mdMedia('gt-sm'); // Erase the parent reference from md-toast the (md-toast bug)
  }
  commentDialog() {
    var vm = this;
    this.$mdDialog.show({
      template: '<contact-form></contact-form>'
    }).then(function(answer) {
        
    }, function() {
        
    });
  }
}

export default angular.module('components.footer', [contactForm, submitButton])
  .component('footer', {
    template: `
    <div class="footer">
      <div class="footer-content" layout="row" layout-align="center center">
        <div layout-align="start center">Material CRUD v-2.0.1 | Crafted by <a href="http://codenx.com" target="_blank">CodeNx</a> 
        | <a ng-click="$ctrl.commentDialog()" href="#">Quick Contact</a>
        | <a ui-sref="doc.pre" href="#">Documentation</a>
        </div>
      </div>
    </div>
    <!--Container for md-toast-->
    <div class="fixed-bottom"> <div class="toast-container" ng-if="screenIsBig">&nbsp;</div></div>
    `,
    controller: FooterComponent
  })
  .name;

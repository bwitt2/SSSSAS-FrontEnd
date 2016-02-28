import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('new-student', {path: '/new-student'});
  this.route('view-students', {path: '/view-students'});
});

export default Router;

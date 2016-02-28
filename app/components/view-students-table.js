import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),

    studentModel: Ember.computed(function(){
      var self = this;
      return this.get('store').findAll('student');
    })
});

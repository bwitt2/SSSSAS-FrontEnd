import Ember from 'ember';

export default Ember.Component.extend({
    isStudentFormEditing: false,
    store: Ember.inject.service(),
    selectedResidency: null,
    selectedGender: null,
    selectedAcademicLoad: null, 
    selectedDate: null,
    routing: Ember.inject.service('-routing'),

    residencyModel: Ember.computed(function(){
      var self = this;
      this.get('store').findAll('residency').then(function(records){
        self.set('selectedResidency', records.get('firstObject').get('id'));
      });
      return this.get('store').findAll('residency');
    }),

    genderModel: Ember.computed(function(){
      var self = this;
        this.get('store').findAll('gender').then(function(records){
        self.set('selectedGender', records.get('firstObject').get('id'));
      });
      return this.get('store').findAll('gender');
    }),
    
    academicLoadModel: Ember.computed(function(){
      var self = this;
      this.get('store').findAll('academicLoad').then(function(records){
        self.set('selectedAcademicLoad', records.get('firstObject').get('id'));
      });
      return this.get('store').findAll('academicLoad');
    }),

    actions: {
      saveStudent () {
         var myStore = this.get('store');
         var chosenResidency = myStore.peekRecord('residency', this.get('selectedResidency'));
         var chosenGender = myStore.peekRecord('gender', this.get('selectedGender'));
         var chosenAcademicLoad = myStore.peekRecord('academicLoad', this.get('selectedAcademicLoad'));
         var newStudent = myStore.createRecord('student', {
          number: this.get('number'),
          firstName: this.get('firstName'),
          lastName: this.get('lastName'),
          DOB: new Date(this.get('selectedDate')),
          residency: chosenResidency,  //***
          gender: chosenGender,
          academicLoad: chosenAcademicLoad
        });
        //  we can use this line instead of the one with the *** above
        //chosenResidency.get('students').pushObject(newStudent);
        var self = this;
        newStudent.save().then(() => {
            self.set('isStudentFormEditing', false);
        });

        this.get('routing').transitionTo('view-students' );
      },

      assignDate (date){
        this.set('selectedDate', date);
      },

      selectResidency (residency){
        this.set('selectedResidency', residency);
      },

      selectGender (gender){
        this.set('selectedGender', gender);
      },

      selectAcademicLoad (academicLoad){
        this.set('selectedAcademicLoad', academicLoad);
      },

      addNewStudent () {
        var datestring = (new Date()).toISOString().substring(0, 10);
        this.set('selectedDate', datestring);

        this.set('isStudentFormEditing', true);
      },

      cancel () {
        this.set('isStudentFormEditing', false);
      }
    }
});

import DS from 'ember-data';

export default DS.Model.extend({
  number: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  DOB: DS.attr('date'),
  residency: DS.belongsTo('residency',{ async: true }),
  gender: DS.belongsTo('gender',{ async: true }),
  academicLoad: DS.belongsTo('academic-load',{ async: true }),
});

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import './eit.html';
 
Template.eit.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('eits.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('eits.remove', this._id);
  },

});
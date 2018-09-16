import { Template } from 'meteor/templating';
 
import { Eits } from '../api/eits.js';
 
import './eit.html';
 
Template.eit.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Eits.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Eits.remove(this._id);
  },
});
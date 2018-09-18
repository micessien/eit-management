import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Eits } from '../api/eits.js';

import './eit.js';
import './body.html';

var eits_selected = [];

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});
 
Template.body.helpers({
    eits() {
        // Otherwise, return all of the eits
        return Eits.find({}, { sort: { createdAt: -1 } });
    },
    incompleteCount() {
        return Eits.find({ checked: { $ne: true } }).count();
    },

});

Template.body.events({
    'submit .new-eit'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const firstname = target.firstname.value;
        const lastname = target.lastname.value;
        const gender = target.gender.value;
        const dateofbirth = target.dateofbirth.value;

        // Insert a Eit into the collection
        Meteor.call('eits.insert', firstname,lastname,gender,dateofbirth);
        
        // Clear form
        target.firstname.value = '';
        target.lastname.value = '';
        target.gender.value = '';
        target.dateofbirth.value = '';
    },
    'submit .edit-eit'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const firstname = target.firstname.value;
        const lastname = target.lastname.value;
        const gender = target.gender.value;
        const dateofbirth = target.dateofbirth.value;
        const eitId = target.eitid.value;

        // Update a Eit into the collection
        Meteor.call('eits.edit', eitId,firstname,lastname,gender,dateofbirth);

        // Clear form
        target.firstname.value = '';
        target.lastname.value = '';
        target.gender.value = '';
        target.dateofbirth.value = '';
        target.eitid.value = '';
        target.className = 'new-eit';
    },
    'change .toggle-selected'(event) {
        const target = event.target;
        if (target.checked) {
            eits_selected.push(this._id);
        }else{
            eits_selected.splice(eits_selected.indexOf(this._id), 1);
        }
    },
    'click .edit'() {
        dataEit = Eits.findOne({_id:this._id});
        form = document.querySelector('form');

        form.eitid.value = dataEit._id;
        form.firstname.value = dataEit.firstname;
        form.lastname.value = dataEit.lastname;
        form.gender.value = dataEit.gender;
        form.dateofbirth.value = dataEit.dateofbirth;

        form.className = 'edit-eit';
        // form.boutton.value = 'Update';
    },
    'click button.deleteBtn'(event) {
        Meteor.call('eits.deleteselected', eits_selected);
    },

});
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Eits } from '../api/eits.js';

import './eit.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});
 
Template.body.helpers({
    eits() {
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            // If hide completed is checked, filter eits
            return Eits.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
        }
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

        // Insert a task into the collection
        Eits.insert({
            firstname,
            lastname,
            gender,
            dateofbirth,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });

        // Clear form
        target.firstname.value = '';
        target.lastname.value = '';
        target.gender.value = '';
        target.dateofbirth.value = '';
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },

});
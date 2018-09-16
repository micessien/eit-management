import { Template } from 'meteor/templating';

import { Eits } from '../api/eits.js';

import './eit.js';
import './body.html';
 
Template.body.helpers({
    eits() {
        // Show newest eits at the top
        return Eits.find({}, { sort: { createdAt: -1 } });
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
        });

        // Clear form
        target.firstname.value = '';
        target.lastname.value = '';
        target.gender.value = '';
        target.dateofbirth.value = '';
    },
});
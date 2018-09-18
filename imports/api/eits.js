import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Eits = new Mongo.Collection('eits');

Meteor.methods({
    'eits.insert'(firstname,lastname,gender,dateofbirth) {
        check(firstname, String);
        check(lastname, String);
        check(gender, String);
        // check(dateofbirth, Date);

        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Eits.insert({
            firstname,
            lastname,
            gender,
            dateofbirth,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'eits.remove'(eitId) {
        check(eitId, String);

        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        // if(eitId.owner !== Meteor.userId()) {
        //     throw new Meteor.Error('not-authorized');
        // }

        Eits.remove(eitId);
    },
    'eits.edit'(eitId, firstname, lastname, gender, dateofbirth) {
        check(eitId, String);
        check(firstname, String);
        check(lastname, String);
        check(gender, String);

        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Eits.update(eitId, {
            $set: { firstname: firstname, lastname: lastname, gender: gender, dateofbirth: dateofbirth }
        });
    },
    'eits.deleteselected'(eits_selected) {
        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        for (var i = 0; i < eits_selected.length; i++) {
            Eits.remove(eits_selected[i]);
        }
    },

});
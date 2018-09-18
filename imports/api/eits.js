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

        // if(eitId.owner !== Meteor.userId()) {
        //     throw new Meteor.Error('not-authorized');
        // }

        Eits.remove(eitId);
    },
    'eits.setChecked'(eitId, setChecked) {
        check(eitId, String);
        check(setChecked, Boolean);

        Eits.update(eitId, {
            $set: { checked: setChecked }
        });
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

});
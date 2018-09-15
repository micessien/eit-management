import { Template } from 'meteor/templating';

import { Eits } from '../api/eits';

import './body.html';
 
Template.body.helpers({
    eits() {
        return Eits.find({});
    },

//   eits: [
//     { firstname: 'Name 1', lastname: 'alexis', gender: 'Masculin', dateofbirth: '12/05/98' },
//     { firstname: 'Name 2', lastname: 'alexis', gender: 'Masculin', dateofbirth: '12/05/98' },
//     { firstname: 'Name 3', lastname: 'alexis', gender: 'Masculin', dateofbirth: '12/05/98' },
//   ],
});
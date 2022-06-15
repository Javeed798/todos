
// @ts-ignore
Todos = new Mongo.Collection('todos');


// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

if (Meteor.isClient) 
{

  //subscribe the todos using server

  // Meteor.subscribe('todos');

  //template helpers.

  Template.main.helpers({

    //calling the created DB 
    todos : function()
    {

      // we need the recently created one at the top soo we use the code as below in the paranthesis

      // ({},{sort : {createdAt : -1}})
      // @ts-ignore
      return Todos.find({}, {sort : {createdAt : -1}});
    }
  });

  Template.main.events({
    "submit .new-todo" : function(event)
    {
      var text = event.target.text.value;

      //if we need to insert other data in place holder then they needed to be displayed on the screen
      // @ts-ignore
      // Todos.insert({
      //   text : text,
      //   createdAt : new Date(),
      //   // I want to also add username to todos
      //   userId : Meteor.userId,
      //   username : Meteor.user().username
      
      // });    //we r replacing it with method as below


      Meteor.call('addTodo', text);

      // clear form

      event.target.text.value = "";


      //prevent submit
      return false;
    },


    "click .toggle-checked" : function()
    {
      // @ts-ignore
      // Todos.update(this._id, {$set : {checked : ! this.checked}});   // REPLACING METHOD

      Meteor.call('setChecked',this._id, !this.checked);

    },

    //click on deleting

    "click .delete-todo" : function()
    {

      if(confirm('Are you sure?'))
      {
        // @ts-ignore
        //  Todos.remove(this._id); //remove and add method as below

        Meteor.call('deleteTodo',this._id);
      }
      
    }

  });
 /*
  // first we need to add houston:admin package to the terminal by using the following commands
  // meteor add accounts-ui accounts-password
  // meteor add houston:admin
  // Now write code to have username and password/

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"

  });
*/

}

// here we added bcoz we cannot able to remove or check the todos in it.
// we use methods here as below.
// im gonna make this commented bcoz im am unable to add accounts 

Meteor.methods({
  addTodo : function(text){
    /*

    if(!Meteor.userId()){
      throw new Meteor Error('Not - authorized');
    }

    */

    // @ts-ignore
    Todos.insert({
      text : text,
      createdAt : new Date(),
      // I want to also add username to todos only when I created

      /*
      userId : Meteor.userId(),
      username : Meteor.user().username
      */
    });
  },

  deleteTodo : function(todoId)
  {
    // @ts-ignore
    Todos.remove(todoId);
  },

  setChecked : function(todoId, setChecked){
    // @ts-ignore
    var todo = Todos.findOne(todoId)

    if(todo.userId !== Meteor.userId())
    {
      throw new Meteor.Error('not-authorized');
    }

    // @ts-ignore
    Todos.update(todoId, {$set : {checked : setChecked}});
  }




});

// if(Meteor.isServer)
// {
//   Meteor.publish('todos',function(){
//     // @ts-ignore
//     return Todos.find();
//   });
// }


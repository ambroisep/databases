var Messages = Backbone.Collection.extend({

  model: Message,

  url:"http://localhost:3000/classes/messages",

  initialize: function() {
    // body...
  }


  
});
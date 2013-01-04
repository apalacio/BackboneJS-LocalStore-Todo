define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/todos.html'
        ],
        function($, _, Backbone, todosTemplate){

			  // The DOM element for a todo item...
			  var TodoView = Backbone.View.extend({
		
				    //... is a list tag.
				    tagName:  "li",
			
				    // Cache the template function for a single item.
				    template: _.template(todosTemplate),
			
				    // The DOM events specific to an item.
				    events: {
				      "click .check"              : "toggleDone",
				      "dblclick div.todo-text"    : "edit",
				      "click span.todo-destroy"   : "clear",
				      "keypress .todo-input"      : "updateOnEnter"
				    },
			
					 // The TodoView listens for changes to its model, re-rendering. Since there's
					 // a one-to-one correspondence between a **Todo** and a **TodoView** in this
					 // app, we set a direct reference on the model for convenience.
				    initialize: function() {
				      this.model.bind('change', this.render, this);
				      this.model.bind('destroy', this.remove, this);
				    },
			
				    // Re-render the contents of the todo item.
				    render: function() {
				      $(this.el).html(this.template(this.model.toJSON()));
				      this.setText();
				      return this;
				    },
			
				    // To avoid XSS (not that it would be harmful in this particular app),
				    // we use `jQuery.text` to set the contents of the todo item.
				    setText: function() {
				      var text = this.model.get('text');
				      this.$('.todo-text').text(text);
				      this.input = this.$('.todo-input');
				      this.input.bind('blur', _.bind(this.close, this)).val(text);
				    },
			
				    // Toggle the `"done"` state of the model.
				    toggleDone: function() {
				      this.model.toggle();
				    },
			
				    // Switch this view into `"editing"` mode, displaying the input field.
				    edit: function() {
				      $(this.el).addClass("editing");
				      this.input.focus();
				    },
			
				    // Close the `"editing"` mode, saving changes to the todo.
				    close: function() {
				      this.model.save({text: this.input.val()});
				      $(this.el).removeClass("editing");
				    },
			
				    // If you hit `enter`, we're through editing the item.
				    updateOnEnter: function(e) {
				      if (e.keyCode == 13) this.close();
				    },
			
				    // Remove this view from the DOM.
				    remove: function() {
				      $(this.el).remove();
				    },
			
				    // Remove the item, destroy the model.
				    clear: function() {
				      this.model.destroy();
				    }

			  });
			  
			  return TodoView
	}
);
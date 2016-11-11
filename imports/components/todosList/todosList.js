import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../api/tasks.js';

import template from './todosList.html';
 
class TodosListCtrl {
	constructor($scope) {
		$scope.viewModel(this);
		
		/**  
		 * Calling Meteor.publish on the server (code found in imports/api/tasks.js) registers a publication named "tasks"
		 * When $scope.subscribe is called on the client (here) with the publication name, the client subscribes to all the data 
		 * from that publication, which in this case is all of the tasks in the database.
		 */
		this.subscribe('tasks');
		
		this.hideCompleted = false;
		
		this.helpers({
			tasks() {
				const selector = {};

				// If hide completed is checked, filter tasks
				if (this.getReactively('hideCompleted')) {
					selector.checked = {
						$ne: true
					};
				}
				
				// Show newest tasks at the top
				return Tasks.find(selector, {
					sort: {
						createdAt: -1
					}
				});
			},
			incompleteCount() {
				return Tasks.find({
					checked: {
						$ne: true
					}
				}).count();
			},
			currentUser() {
				return Meteor.user();
			}
		})
	}
	
	addTask(newTask) {
		// Insert a task into the collection
		Meteor.call('tasks.insert', newTask); // Calls the method "tasks.insert" found in imports/api/tasks.js

		// Clear form
		this.newTask = '';
	}
	
	setChecked(task) {
		// Set the checked property to the opposite of its current value
		Meteor.call('tasks.setChecked', task._id, !task.checked); // Calls the method "tasks.setChecked" found in imports/api/tasks.js
	}

	removeTask(task) {
		Meteor.call('tasks.remove', task._id); // Calls the method "tasks.remove" found in imports/api/tasks.js
	}
	
	setPrivate(task) {
		Meteor.call('tasks.setPrivate', task._id, !task.private); // Calls the method "tasks.setPrivate" found in imports/api/tasks.js
	}
}
 
export default angular.module('todosList', [
	angularMeteor,
	ngMaterial
])
	.component('todosList', {
		templateUrl: 'imports/components/todosList/todosList.html',
		controller: ['$scope', TodosListCtrl]
	});
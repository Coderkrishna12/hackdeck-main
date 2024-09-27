from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
from flask_cors import CORS
from datetime import datetime

# Initialize Flask app and Firestore DB
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes to allow requests from React

# Use your Firebase project's service account JSON file
cred = credentials.Certificate("D:/Hackathon/hackdeck-main/backend/firebase-adminsdk.json")
initialize_app(cred)

db = firestore.client()

# Collections
EVENTS_COLLECTION = "events"
TASKS_SUBCOLLECTION = "tasks"
USERS_SUBCOLLECTION = "users"

# Helper to check if an event exists
def event_exists(event_id):
    event_ref = db.collection(EVENTS_COLLECTION).document(event_id)
    return event_ref.get().exists

# API Routes

# 1. Add Task to an Event
@app.route('/events/<event_id>/tasks', methods=['POST'])
def add_task(event_id):
    if not event_exists(event_id):
        return jsonify({"error": "Event not found"}), 404
    
    data = request.json
    task_data = {
        "title": data.get("title"),
        "description": data.get("description"),
        "status": data.get("status", "pending"),
        "dueDate": data.get("dueDate"),
        "assignedTo": data.get("assignedTo"),
        "createdAt": datetime.utcnow()
    }
    
    try:
        tasks_ref = db.collection(EVENTS_COLLECTION).document(event_id).collection(TASKS_SUBCOLLECTION)
        new_task_ref = tasks_ref.add(task_data)
        return jsonify({"message": "Task added successfully", "taskId": new_task_ref[1].id}), 201
    except Exception as e:
        print(f"Error adding task: {str(e)}")  # Debugging
        return jsonify({"error": str(e)}), 500

# 2. Remove Task from an Event
@app.route('/events/<event_id>/tasks/<task_id>', methods=['DELETE'])
def remove_task(event_id, task_id):
    if not event_exists(event_id):
        return jsonify({"error": "Event not found"}), 404
    
    task_ref = db.collection(EVENTS_COLLECTION).document(event_id).collection(TASKS_SUBCOLLECTION).document(task_id)
    
    if not task_ref.get().exists:
        return jsonify({"error": "Task not found"}), 404
    
    try:
        task_ref.delete()
        return jsonify({"message": "Task removed successfully"}), 200
    except Exception as e:
        print(f"Error removing task: {str(e)}")  # Debugging
        return jsonify({"error": str(e)}), 500

# 3. Update Task of an Event
@app.route('/events/<event_id>/tasks/<task_id>', methods=['PUT'])
def update_task(event_id, task_id):
    if not event_exists(event_id):
        return jsonify({"error": "Event not found"}), 404
    
    task_ref = db.collection(EVENTS_COLLECTION).document(event_id).collection(TASKS_SUBCOLLECTION).document(task_id)
    
    if not task_ref.get().exists:
        return jsonify({"error": "Task not found"}), 404
    
    data = request.json
    task_update = {
        "title": data.get("title"),
        "description": data.get("description"),
        "status": data.get("status"),
        "dueDate": data.get("dueDate"),
        "assignedTo": data.get("assignedTo"),
        "updatedAt": datetime.utcnow()
    }
    
    try:
        task_ref.update(task_update)
        return jsonify({"message": "Task updated successfully"}), 200
    except Exception as e:
        print(f"Error updating task: {str(e)}")  # Debugging
        return jsonify({"error": str(e)}), 500

# 4. Get All Tasks for an Event
@app.route('/events/<event_id>/tasks', methods=['GET'])
def get_tasks(event_id):
    if not event_exists(event_id):
        return jsonify({"error": "Event not found"}), 404
    
    try:
        tasks_ref = db.collection(EVENTS_COLLECTION).document(event_id).collection(TASKS_SUBCOLLECTION)
        tasks = tasks_ref.stream()
        task_list = []
        for task in tasks:
            task_data = task.to_dict()
            task_data["taskId"] = task.id
            task_list.append(task_data)
        
        return jsonify({"tasks": task_list}), 200
    except Exception as e:
        print(f"Error fetching tasks: {str(e)}")  # Debugging
        return jsonify({"error": str(e)}), 500

# 5. Add User to an Event
@app.route('/events/<event_id>/users', methods=['POST'])
def add_user(event_id):
    if not event_exists(event_id):
        return jsonify({"error": "Event not found"}), 404
    
    data = request.json
    user_data = {
        "name": data.get("name"),
        "role": data.get("role", "contributor"),
        "joinedAt": datetime.utcnow()
    }
    
    try:
        users_ref = db.collection(EVENTS_COLLECTION).document(event_id).collection(USERS_SUBCOLLECTION)
        new_user_ref = users_ref.add(user_data)
        return jsonify({"message": "User added successfully", "userId": new_user_ref[1].id}), 201
    except Exception as e:
        print(f"Error adding user: {str(e)}")  # Debugging
        return jsonify({"error": str(e)}), 500

# 6. Remove User from an Event
@app.route('/events/<event_id>/users/<user_id>', methods=['DELETE'])
def remove_user(event_id, user_id):
    if not event_exists(event_id):
        return jsonify({"error": "Event not found"}), 404
    
    user_ref = db.collection(EVENTS_COLLECTION).document(event_id).collection(USERS_SUBCOLLECTION).document(user_id)
    
    if not user_ref.get().exists:
        return jsonify({"error": "User not found"}), 404
    
    try:
        user_ref.delete()
        return jsonify({"message": "User removed from the event"}), 200
    except Exception as e:
        print(f"Error removing user: {str(e)}")  # Debugging
        return jsonify({"error": str(e)}), 500

# 7. Update User Role in an Event
@app.route('/events/<event_id>/users/<user_id>', methods=['PUT'])
def update_user_role(event_id, user_id):
    if not event_exists(event_id):
        return jsonify({"error": "Event not found"}), 404
    
    user_ref = db.collection(EVENTS_COLLECTION).document(event_id).collection(USERS_SUBCOLLECTION).document(user_id)
    
    if not user_ref.get().exists:
        return jsonify({"error": "User not found"}), 404
    
    data = request.json
    role_update = {"role": data.get("role")}
    
    try:
        user_ref.update(role_update)
        return jsonify({"message": "User role updated successfully"}), 200
    except Exception as e:
        print(f"Error updating user role: {str(e)}")  # Debugging
        return jsonify({"error": str(e)}), 500

# 8. Get All Events
@app.route('/events', methods=['GET'])
def get_all_events():
    try:
        events_ref = db.collection(EVENTS_COLLECTION)
        events = events_ref.stream()
        event_list = []
        for event in events:
            event_data = event.to_dict()
            event_data["eventId"] = event.id
            event_list.append(event_data)
        
        return jsonify({"events": event_list}), 200
    except Exception as e:
        print(f"Error fetching events: {str(e)}")  # Debugging
        return jsonify({"error": str(e)}), 500

# 9. Create a New Event
@app.route('/events', methods=['POST'])
def create_event():
    data = request.json
    event_data = {
        "title": data.get("title"),
        "description": data.get("description"),
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    try:
        event_ref = db.collection(EVENTS_COLLECTION).add(event_data)
        return jsonify({"message": "Event created successfully", "eventId": event_ref[1].id}), 201
    except Exception as e:
        print(f"Error creating event: {str(e)}")  # Debugging
        return jsonify({"error": str(e)}), 500

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True)

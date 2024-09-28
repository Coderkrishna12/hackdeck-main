from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
from flask_cors import CORS
from datetime import datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Initialize Flask app and Firestore DB
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes to allow requests from React

# Firebase service account for your project
cred = credentials.Certificate("D:/Hackathon/hackdeck-main/backend/hackdeck24-firebase-adminsdk-v193a-7061da122f.json")
initialize_app(cred)

db = firestore.client()

# Collections
EVENTS_COLLECTION = "events"
TASKS_SUBCOLLECTION = "tasks"

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "srushabh001@gmail.com"
APP_PASSWORD = "nhkbebokvoqrbvvw"  # Use your app-specific password if 2FA is enabled

# Helper function to check if an event exists
def event_exists(event_id):
    event_ref = db.collection(EVENTS_COLLECTION).document(event_id)
    return event_ref.get().exists

# Route to send an email invitation to a collaborator
@app.route('/send-invite', methods=['POST'])
def send_invite():
    data = request.get_json()
    email = data.get('email')
    event_id = data.get('eventId')
    task_id = data.get('taskId')

    if not email:
        return jsonify({'error': 'No email provided'}), 400

    try:
        send_email(email, event_id, task_id)
        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        print(f"Error sending email: {str(e)}")  # Log the exact error
        return jsonify({'error': str(e)}), 500

# Function to send the email using SMTP
def send_email(recipient_email, event_id, task_id):
    subject = "Collaboration Invitation"
    body = f"You've been invited to collaborate on a task in Event {event_id}. Click the link to accept the task: http://localhost:3000/events/{event_id}/tasks/{task_id}"

    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = recipient_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    try:
        # Start the SMTP server connection
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Secure the connection
        server.login(EMAIL_ADDRESS, APP_PASSWORD)  # Login to the email account
        server.sendmail(EMAIL_ADDRESS, recipient_email, msg.as_string())
        server.quit()  # Close the SMTP connection

        print(f"Email sent successfully to {recipient_email}")
    except smtplib.SMTPException as smtp_err:
        print(f"SMTP error occurred: {smtp_err}")
        raise  # Re-raise the exception to return an error in Flask
    except Exception as e:
        print(f"Error: {str(e)}")
        raise  # Re-raise any other general errors

# API Routes

# 1. View All Events (No ability to create new events)
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

# 2. Add Task to an Event (with task progress options)
@app.route('/events/<event_id>/tasks', methods=['POST'])
def add_task(event_id):
    if not event_exists(event_id):
        return jsonify({"error": "Event not found"}), 404
    
    data = request.json
    task_data = {
        "title": data.get("title"),
        "description": data.get("description"),
        "status": data.get("status", "pending"),  # Can be set as 'pending', 'in-progress', 'completed'
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

# 3. View Tasks for an Event (With Option to Edit Task Progress)
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

# 4. Update Task Progress of an Event (Can be triggered from View Task or Add Task)
@app.route('/events/<event_id>/tasks/<task_id>', methods=['PUT'])
def update_task_progress(event_id, task_id):
    if not event_exists(event_id):
        return jsonify({"error": "Event not found"}), 404
    
    task_ref = db.collection(EVENTS_COLLECTION).document(event_id).collection(TASKS_SUBCOLLECTION).document(task_id)
    
    if not task_ref.get().exists:
        return jsonify({"error": "Task not found"}), 404
    
    data = request.json
    progress_update = {
        "status": data.get("status")  # Progress can be 'pending', 'in-progress', or 'completed'
    }
    
    try:
        task_ref.update(progress_update)
        return jsonify({"message": "Task progress updated successfully"}), 200
    except Exception as e:
        print(f"Error updating task progress: {str(e)}")  # Debugging
        return jsonify({"error": str(e)}), 500

# 5. Remove Task from an Event
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

# 6. Update a single task's information (PATCH method)
@app.route('/events/<event_id>/tasks/<task_id>', methods=['PATCH'])
def patch_task(event_id, task_id):
    if not event_exists(event_id):
        return jsonify({"error": "Event not found"}), 404
    
    task_ref = db.collection(EVENTS_COLLECTION).document(event_id).collection(TASKS_SUBCOLLECTION).document(task_id)
    
    if not task_ref.get().exists:
        return jsonify({"error": "Task not found"}), 404
    
    data = request.json
    update_data = {}
    
    # Only include fields that are provided in the request
    if "title" in data:
        update_data["title"] = data["title"]
    if "description" in data:
        update_data["description"] = data["description"]
    if "status" in data:
        update_data["status"] = data["status"]
    if "dueDate" in data:
        update_data["dueDate"] = data["dueDate"]
    if "assignedTo" in data:
        update_data["assignedTo"] = data["assignedTo"]
    
    # Update the task if there's any data to update
    if update_data:
        try:
            task_ref.update(update_data)
            return jsonify({"message": "Task updated successfully"}), 200
        except Exception as e:
            print(f"Error updating task: {str(e)}")  # Debugging
            return jsonify({"error": str(e)}), 500
    
    return jsonify({"message": "No updates provided"}), 400


# 7. Get a single task's details (GET method)
@app.route('/events/<event_id>/tasks/<task_id>', methods=['GET'])
def get_single_task(event_id, task_id):
    if not event_exists(event_id):
        return jsonify({"error": "Event not found"}), 404
    
    task_ref = db.collection(EVENTS_COLLECTION).document(event_id).collection(TASKS_SUBCOLLECTION).document(task_id)
    
    if not task_ref.get().exists:
        return jsonify({"error": "Task not found"}), 404
    
    try:
        task = task_ref.get().to_dict()
        return jsonify(task), 200
    except Exception as e:
        print(f"Error fetching task: {str(e)}")  # Debugging
        return jsonify({"error": str(e)}), 500


# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Mail, Message
import os
import logging

# Initialize Flask App
app = Flask(__name__)

# Database Configuration (Replace with your own database URI if you want to use my project)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///portfolio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Mail Configuration (Replace with your own mail server details if you want to use my project)
app.config['MAIL_SERVER']='smtp.yourmailserver.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'your_email@example.com'
app.config['MAIL_PASSWORD'] = 'your_password'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

# User Authentication
login_manager = LoginManager()
login_manager.init_app(app)

# Logging Configuration
logging.basicConfig(filename='error.log', level=logging.ERROR)

# Models
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# Database models
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(150))
    message = db.Column(db.Text)


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    link = db.Column(db.String(200))


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    proficiency = db.Column(db.Integer)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/register', methods=['POST'])
def register():
    data = request.form
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"status": "User registered successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.form
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        login_user(user)
        return jsonify({"status": "Logged in successfully"}), 200
    return jsonify({"status": "Invalid username or password"}), 401


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"status": "Logged out successfully"}), 200


# Routes
@app.route('/contact', methods=['POST'])
def contact():
    data = request.form
    new_contact = Contact(name=data['name'], email=data['email'], subject=data['subject'], message=data['message'])
    db.session.add(new_contact)
    db.session.commit()
    return jsonify({"status": "success"}), 201


@app.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    project_data = [{"title": project.title, "description": project.description, "link": project.link} for project in projects]
    return jsonify(project_data)


@app.route('/skills', methods=['GET'])
def get_skills():
    skills = Skill.query.all()
    skill_data = [{"name": skill.name, "proficiency": skill.proficiency} for skill in skills]
    return jsonify(skill_data)


# Error handling
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/send_mail', methods=['POST'])
def send_mail():
    data = request.form
    msg = Message(data['subject'], sender='your_email@example.com', recipients=['recipient@example.com'])
    msg.body = data['message']
    mail.send(msg)
    return jsonify({"status": "Email sent successfully"}), 200


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)

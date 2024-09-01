from flask import Flask, render_template, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_uploads import UploadSet, configure_uploads, IMAGES
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, FileField, validators
from flask_restful import Api, Resource

app = Flask(__name__)
app.config.from_object('config.Config')

db = SQLAlchemy(app)
migrate = Migrate(app, db)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)

class Chatbot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(100), nullable=False)
    answer = db.Column(db.Text)


class ChatbotForm(FlaskForm):
    question = StringField('Question', validators=[validators.InputRequired()])
    answer = TextAreaField('Answer')


class ChatbotList(Resource):
    def get(self):
        chatbots = Chatbot.query.all()
        return [{'id': chatbot.id, 'question': chatbot.question, 'answer': chatbot.answer} for chatbot in chatbots]

    def post(self):
        data = request.get_json()
        new_chatbot = Chatbot(question=data['question'], answer=data['answer'])
        db.session.add(new_chatbot)
        db.session.commit()
        return {'id': new_chatbot.id}, 201


class ChatbotResource(Resource):
    def get(self, chatbot_id):
        chatbot = Chatbot.query.get_or_404(chatbot_id)
        return {'question': chatbot.question, 'answer': chatbot.answer}

    def put(self, chatbot_id):
        chatbot = Chatbot.query.get_or_404(chatbot_id)
        data = request.get_json()
        chatbot.question = data['question']
        chatbot.answer = data['answer']
        db.session.commit()
        return {'msg': 'Chatbot updated'}

    def delete(self, chatbot_id):
        chatbot = Chatbot.query.get_or_404(chatbot_id)
        db.session.delete(chatbot)
        db.session.commit()
        return {'msg': 'Chatbot deleted'}


api = Api(app)
api.add_resource(ChatbotList, '/api/chatbots')
api.add_resource(ChatbotResource, '/api/chatbots/<int:chatbot_id>')

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    proficiency = db.Column(db.Integer)


class SkillForm(FlaskForm):
    name = StringField('Name', validators=[validators.InputRequired()])
    proficiency = StringField('Proficiency')


class SkillList(Resource):
    def get(self):
        skills = Skill.query.all()
        return [{'id': skill.id, 'name': skill.name, 'proficiency': skill.proficiency} for skill in skills]

    def post(self):
        data = request.get_json()
        new_skill = Skill(name=data['name'], proficiency=data['proficiency'])
        db.session.add(new_skill)
        db.session.commit()
        return {'id': new_skill.id}, 201


class SkillResource(Resource):
    def get(self, skill_id):
        skill = Skill.query.get_or_404(skill_id)
        return {'name': skill.name, 'proficiency': skill.proficiency}

    def put(self, skill_id):
        skill = Skill.query.get_or_404(skill_id)
        data = request.get_json()
        skill.name = data['name']
        skill.proficiency = data['proficiency']
        db.session.commit()
        return {'msg': 'Skill updated'}

    def delete(self, skill_id):
        skill = Skill.query.get_or_404(skill_id)
        db.session.delete(skill)
        db.session.commit()
        return {'msg': 'Skill deleted'}


api = Api(app)
api.add_resource(SkillList, '/api/skills')
api.add_resource(SkillResource, '/api/skills/<int:skill_id>')

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True)
    password_hash = db.Column(db.String(128))
    bio = db.Column(db.Text)
    resume_url = db.Column(db.String(256))

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[validators.InputRequired(), validators.Length(min=4, max=15)])
    password = PasswordField('Password', validators=[validators.InputRequired(), validators.Length(min=8, max=80)])


class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[validators.InputRequired(), validators.Length(min=4, max=15)])
    email = StringField('Email', validators=[validators.InputRequired(), validators.Email(), validators.Length(max=50)])
    password = PasswordField('Password', validators=[validators.InputRequired(), validators.Length(min=8, max=80)])


class ProfileForm(FlaskForm):
    bio = TextAreaField('Bio', validators=[validators.Length(max=500)])
    resume = FileField('Upload Resume')


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    link = db.Column(db.String(200))


class ProjectForm(FlaskForm):
    title = StringField('Title', validators=[validators.InputRequired()])
    description = TextAreaField('Description')
    link = StringField('Link')


class ContactForm(FlaskForm):
    name = StringField('Name', validators=[validators.InputRequired(), validators.Length(min=4, max=15)])
    email = StringField('Email', validators=[validators.InputRequired(), validators.Email(), validators.Length(max=50)])
    message = TextAreaField('Message', validators=[validators.InputRequired(), validators.Length(max=500)])


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.Text)
    message = db.Column(db.Text)


class ProjectList(Resource):
    def get(self):
        projects = Project.query.all()
        return [{'id': project.id, 'title': project.title, 'description': project.description, 'link': project.link} for project in projects]

    def post(self):
        data = request.get_json()
        new_project = Project(title=data['title'], description=data['description'], link=data['link'])
        db.session.add(new_project)
        db.session.commit()
        return {'id': new_project.id}, 201


class ProjectResource(Resource):
    def get(self, project_id):
        project = Project.query.get_or_404(project_id)
        return {'title': project.title, 'description': project.description, 'link': project.link}


    def put(self, project_id):
        project = Project.query.get_or_404(project_id)
        data = request.get_json()
        project.title = data['title']
        project.description = data['description']
        project.link = data['link']
        db.session.commit()
        return {'msg': 'Project updated'}


    def delete(self, project_id):
        project = Project.query.get_or_404(project_id)
        db.session.delete(project)
        db.session.commit()
        return {'msg': 'Project deleted'}


api = Api(app)
api.add_resource(ProjectList, '/api/projects')
api.add_resource(ProjectResource, '/api/projects/<int:project_id>')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    form = ContactForm()
    if form.validate_on_submit():
        new_contact = Contact(name=form.name.data, email=form.email.data, message=form.message.data)
        db.session.add(new_contact)
        db.session.commit()
        return redirect(url_for('contact'))
    return render_template('contact.html', form=form)


@app.route('/contact/<int:contact_id>/delete', methods=['POST'])
@login_required
def delete_contact(contact_id):
    contact = Contact.query.get_or_404(contact_id)
    db.session.delete(contact)
    db.session.commit()
    return redirect(url_for('contact'))


@app.route('/contact/<int:contact_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_contact(contact_id):
    contact = Contact.query.get_or_404(contact_id)
    form = ContactForm(obj=contact)
    if form.validate_on_submit():
        contact.name = form.name.data
        contact.email = form.email.data
        contact.message = form.message.data
        db.session.commit()
        return redirect(url_for('contact'))
    return render_template('edit-contact.html', form=form)


@app.route('/contact/<int:contact_id>')
@login_required
def contact_details(contact_id):
    contact = Contact.query.get_or_404(contact_id)
    return render_template('contact-details.html', contact=contact)


@app.route('/contacts')
@login_required
def contacts():
    contacts = Contact.query.all()
    return render_template('contacts.html', contacts=contacts)


@app.route('/projects')
def projects():
    projects = Project.query.all()
    return render_template('projects.html', projects=projects)


@app.route('/projects/<int:project_id>')
def project_details(project_id):
    project = Project.query.get_or_404(project_id)
    return render_template('project-details.html', project=project)


@app.route('/projects/<int:project_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_project(project_id):
    project = Project.query.get_or_404(project_id)
    form = ProjectForm(obj=project)
    if form.validate_on_submit():
        project.title = form.title.data
        project.description = form.description.data
        project.link = form.link.data
        db.session.commit()
        return redirect(url_for('project_details', project_id=project.id))
    return render_template('edit-project.html', form=form)


@app.route('/projects/create', methods=['GET', 'POST'])
@login_required
def create_project():
    form = ProjectForm()
    if form.validate_on_submit():
        project = Project(title=form.title.data, description=form.description.data, link=form.link.data)
        db.session.add(project)
        db.session.commit()
        return redirect(url_for('project_details', project_id=project.id))
    return render_template('create-project.html', form=form)


@app.route('/projects/<int:project_id>/delete', methods=['POST'])
@login_required
def delete_project(project_id):
    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()
    return redirect(url_for('projects'))


@app.route('/send_mail', methods=['POST'])
def send_mail():
    data = request.form
    new_contact = Contact(name=data['name'], email=data['email'], message=data['message'])
    db.session.add(new_contact)
    db.session.commit()
    return jsonify({"status": "success"}), 201


@app.route('/register', methods=['POST'])
def register():
    data = request.form
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"status": "User registered successfully"}), 201


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.check_password(form.password.data):
            login_user(user)
            return redirect(url_for('index'))
        else:
            return redirect(url_for('login'))
    return render_template('login.html', form=form)


@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register.html', form=form)


@app.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    form = ProfileForm(obj=current_user)
    if form.validate_on_submit():
        current_user.bio = form.bio.data
        if form.resume.data:
            filename = photos.save(form.resume.data)
            current_user.resume_url = photos.url(filename)
        db.session.commit()
        return redirect(url_for('profile'))
    return render_template('profile.html', form=form)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/projects')
def projects():
    projects = Project.query.all()
    return render_template('projects.html', projects=projects)


@app.route('/projects/<int:project_id>')
def project_details(project_id):
    project = Project.query.get_or_404(project_id)
    return render_template('project-details.html', project=project)


@app.route('/projects/<int:project_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_project(project_id):
    project = Project.query.get_or_404(project_id)
    form = ProjectForm(obj=project)
    if form.validate_on_submit():
        project.title = form.title.data
        project.description = form.description.data
        project.link = form.link.data
        db.session.commit()
        return redirect(url_for('project_details', project_id=project.id))
    return render_template('edit-project.html', form=form)


@app.route('/projects/create', methods=['GET', 'POST'])
@login_required
def create_project():
    form = ProjectForm()
    if form.validate_on_submit():
        project = Project(title=form.title.data, description=form.description.data, link=form.link.data)
        db.session.add(project)
        db.session.commit()
        return redirect(url_for('project_details', project_id=project.id))
    return render_template('create-project.html', form=form)


@app.route('/projects/<int:project_id>/delete', methods=['POST'])
@login_required
def delete_project(project_id):
    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()
    db.session.commit()
    return redirect(url_for('projects'))


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/linkedin')
def linkedin():
    return render_template('linkedin.html')


@app.route('/github')
def github():
    return render_template('github.html')


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)

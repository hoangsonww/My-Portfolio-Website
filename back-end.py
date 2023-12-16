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

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)

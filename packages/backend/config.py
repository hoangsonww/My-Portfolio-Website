class Config(object):
    SECRET_KEY = 'abc123xyz'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///my-portfolio.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOADED_PHOTOS_DEST = '/uploads'
    MAIL_SERVER = 'smtp.mongodb.com'
    MAIL_PORT = 587
    MAIL_USERNAME = 'hoangson091104@gmail.com'
    MAIL_PASSWORD = '123456789'
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False

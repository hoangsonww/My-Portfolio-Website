from flask import Flask, request, jsonify, g
import logging
from functools import wraps
from flask_login import current_user

app = Flask(__name__)

# Configure Logging
logging.basicConfig(level=logging.INFO)

# Middleware for Logging Requests
@app.before_request
def log_request_info():
    logging.info(f'Request URL: {request.url} Method: {request.method} Body: {request.get_data()}')


# Middleware for Authenticating Routes
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            return jsonify({'message': 'Authentication is required'}), 403
        return f(*args, **kwargs)
    return decorated_function


def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_admin:
            return jsonify({'message': 'Admin rights are required'}), 403
        return f(*args, **kwargs)
    return decorated_function


def admin_or_owner_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_admin and current_user.id != kwargs['user_id']:
            return jsonify({'message': 'Admin rights or owner status required'}), 403
        return f(*args, **kwargs)
    return decorated_function


# Global Error Handler
@app.errorhandler(500)
def handle_500_error(e):
    logging.error(f'Internal Server Error: {e}')
    return jsonify({'message': 'Internal Server Error'}), 500


@app.errorhandler(404)
def handle_404_error(e):
    logging.warning(f'Not Found: {e}')
    return jsonify({'message': 'Resource not found'}), 404


@app.route('/protected')
@login_required
def protected():
    return jsonify({'message': 'This is a protected route'})


if __name__ == '__main__':
    app.run(debug=True)

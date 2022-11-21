from flask import Blueprint, jsonify, request, session, abort
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

from app import db
from models import Admin, Student

auth_router = Blueprint(__name__, 'auth')

def login_required(fn):
    @wraps(fn)
    def check_login(*args, **kwargs):
        if not session.get('current_user', None):
            abort(403, 'Gotta log in bruh')
        return fn(*args, **kwargs)
    return check_login

@auth_router.route('/api/registration/', methods=['POST'])
def register():
    print(request.json)
    username = request.json.get('username')
    password = request.json.get('password')

    password_hash = generate_password_hash(password)

    # account_type = request.json.get(checkboxdata)

    staffmember = Admin(username=username, password_hash=password_hash)
    db.session.add(staffmember)
    db.session.commit()

    user_dict = staffmember.to_dict()
    session['current_user'] = user_dict
    return jsonify({
        'success': 'success',
        'message': 'Successfully registered',
        'user': user_dict
    })


@auth_router.route('/login/', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    account_type = request.json.get('isadmin')
    #if account type is admin is true



    student_user = Student.query.filter_by(username=username).first()
    admin_user = Admin.query.filter_by(username=username).first()



    if not user:
        abort(404, 'User not found')

    if not check_password_hash(user.password_hash, password):
        abort(403, 'Username and password don\'t match')

    user_dict = user.to_dict()
    session['current_user'] = user_dict
    return jsonify({
        'success': 'success',
        'message': 'Successfully logged in',
        'user': user_dict
    })
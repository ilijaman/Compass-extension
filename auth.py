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

# REGISTER ==========================================

@auth_router.route('/api/register/', methods=['POST'])
def register():
    print(request.json)
    username = request.json.get('username')
    password = request.json.get('password')

    password_hash = generate_password_hash(password)

    account_type = request.json.get('checked')

    if account_type == False:
        student = Student(username=username, password_hash=password_hash)
        db.session.add(student)
        db.session.commit()

        student_dict = student.to_dict()
        session['current_user'] = student_dict
        return jsonify({
        'success': 'success',
        'message': 'Successfully registered',
        'user': student_dict
    })

    else:
        staffmember = Admin(username=username, password_hash=password_hash)
        db.session.add(staffmember)
        db.session.commit()

        admin_dict = staffmember.to_dict()
        session['current_user'] = admin_dict
        return jsonify({
        'success': 'success',
        'message': 'Successfully registered',
        'user': admin_dict
    })


# LOGIN =======================================

@auth_router.route('/api/login/', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    account_type = request.json.get('checked')

    if account_type == False:
        student = Student.query.filter_by(username=username).first()
        if not student:
            abort(404, 'User not found')
        if not check_password_hash(student.password_hash, password):
            abort(403, 'Username and password don\'t match')
        student_dict = student.to_dict()
        return jsonify({
        'success': 'success',
        'message': 'Successfully logged in',
        'user': student_dict
        })
    else:
        admin = Admin.query.filter_by(username=username).first()
        if not admin:
            abort(404, 'Member of staff not found')
        if not check_password_hash(student.password_hash, password):
            abort(403, 'Username and password don\'t match')
        admin_dict = admin.to_dict()
        return jsonify({
        'success': 'success',
        'message': 'Successfully logged in',
        'user': admin_dict    
        })


# LOGOUT =======================================

@auth_router.route('/api/logout/', methods=['POST'])
def logout():
    session.pop('current_user', None)
    return jsonify({
        'status': 'success',
        'message': 'Successfully logged out'
    })


@auth_router.route('/api/verify/', methods=['GET'])
def verify():
    current_user = session.get('current_user', None)
    if not current_user:
        abort(404, 'User not logged in or not found')
    return jsonify({
        'status': 'success',
        'message': 'User verified',
        'user': current_user
    })

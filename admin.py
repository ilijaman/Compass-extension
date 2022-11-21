from flask import Blueprint, jsonify, request, session, abort
from app import db
from models import Admin, Student, Noticeboard

students_router = Blueprint(__name__, 'students')

@students_router.route('/api/')
def show_students():
    students = Student.query.all()
    student_dicts = [student.to_dict() for student in students]

    noticeboard = Noticeboard.query.all()
    noticeboard_dict = [notice.to_dict() for notice in noticeboard]
    data = {
        'students': student_dicts,
        'noticeboard': noticeboard_dict
    }
    
    return jsonify(data)


@students_router.route('/api/<username>/')
def show_student(username):
    student = Student.query.filter(Student.username == username).first()
    if not student:
        abort(404, 'Student not found')
    student_dict = student.to_dict()
    student_dict['todoitem'] = [item.to_dict for item in student.todoitem]
    return jsonify(student_dict)




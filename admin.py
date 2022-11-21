# from flask import Blueprint, jsonify, request, session, abort
# from app import db
# from models import Admin, Student

# students_router = Blueprint(__name__, 'students')

# @students_router.route('/students/')
# def show_students():
#     students = Student.query.all()
#     student_dicts = [student.to_dict() for student in students]
#     return jsonify(student_dicts)

# @students_router.route('/students/<username>/')
# def show_student(username):
#     student = Student.query.filter(Student.username == username).first()
#     if not student:
#         abort(404, 'Student not found')
#     student_dict = student.to_dict()
#     return jsonify(student_dict)


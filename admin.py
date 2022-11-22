from flask import Blueprint, jsonify, request, session, abort
from app import db
from models import Admin, Student, Noticeboard

admin_router= Blueprint(__name__, 'admin')

@admin_router.route('/api/admin/')
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


@admin_router.route('/api/<student>/')
def show_student(student):
    student = Student.query.filter(Student.username == student).first()
    if not student:
        abort(404, 'Student not found')
    student_dict = student.to_dict()
    student_dict['todoitem'] = [item.to_dict for item in student.todoitem]
    return jsonify(student_dict)

@admin_router.route('/api/search/', methods=["POST"])
def show_search():
    query = request.get_json()
    print(query)
    students = Student.query.all()
    results_list = []
    students_dict = [student.to_dict() for student in students]
    for kid in students_dict:
        if (kid['name'] == query):
            results_list.append(kid)
    return jsonify(results_list)


    




# @admin_router.route('/api/admin/<student>/edit')

# @admin_router.route('/api/admin/<student>/delete')

# @admin_router.route('/api/admin/create/')

# @admin_router.route('/api/noticeboard/create/')

# @admin_router.route('/api/noticeboard/edit/')

# @admin_router.route('/api/noticeboard/delete')

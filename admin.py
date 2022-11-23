from flask import Blueprint, jsonify, request, session, abort
from app import db
from models import Admin, Student, Noticeboard, Todoitem

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


@admin_router.route('/api/admin/<student_id>/')
def show_student(student_id):
    print(student_id)
    student = Student.query.get_or_404(student_id, 'Student not found')
    student_dict = student.to_dict()

    todos = Todoitem.query.filter_by(student_id = student_id)
    todos_dict = [todo.to_dict() for todo in todos]
    data = {
        'student': student_dict,
        'todos': todos_dict
    }
    print(data)

    return jsonify(data)


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


@admin_router.route('/api/admin/<student_id>/', methods=['PUT'])
def update_student(student_id):
    student_data = request.get_json()
    print(student_data)
    student = Student.query.get_or_404(student_id, 'Student not found')
    print(student)

    for key, value in student_data.items():
        setattr(student, key, value)

    db.session.add(student)
    db.session.commit()
    return jsonify(student.to_dict())
    




    




# @admin_router.route('/api/admin/<student>/edit')

# @admin_router.route('/api/admin/<student>/delete')

# @admin_router.route('/api/admin/create/')

# @admin_router.route('/api/noticeboard/create/')

# @admin_router.route('/api/noticeboard/edit/')

# @admin_router.route('/api/noticeboard/delete')

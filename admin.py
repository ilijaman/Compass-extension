from flask import Blueprint, jsonify, request, session, abort
from app import db
from models import Admin, Student, Noticeboard, Todoitem

admin_router= Blueprint(__name__, 'admin')

#HOME PG/ INDEX

@admin_router.route('/api/admin/')
def show_students():
    students = Student.query.all()
    student_dicts = [student.to_dict() for student in students]

    noticeboard = Noticeboard.query.all()
    noticeboard_dict = [notice.to_dict() for notice in noticeboard]

    admins = Admin.query.all()
    admins_dict = [admin.to_dict() for admin in admins]
    data = {
        'students': student_dicts,
        'noticeboard': noticeboard_dict,
        'admins': admins_dict
    }
    
    current_user = session.get('current_user')
    print(current_user)
    
    return jsonify(data)


# ADD TO NOTICEBOARD

@admin_router.route('/api/admin/', methods=['POST'])
def create_notice():
    current_user = session.get('current_user')

    notice_data= request.get_json()
    notice = Noticeboard(**notice_data, admin_id = current_user['id'])
    db.session.add(notice)
    db.session.commit()
    return jsonify(notice.to_dict())
#need to query Admin model// current user??


#SHOW PG

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


# SEARCH

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


# EDIT

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

# DELETE

@admin_router.route('/api/admin/<student_id>/', methods=['DELETE'])
def delete_student(student_id):
    student = Student.query.get_or_404(student_id, 'Student not found')
    print(student)

    db.session.delete(student)
    db.session.commit()
    return jsonify(student.to_dict())

# CREATE

@admin_router.route('/api/admin/', methods=['POST'])
def create_student():
    student_data= request.get_json()
    # student = Student(name=student_data['name'], grade=student_data['grade'], user_id=current_user['id'])
    student = Student(**student_data)
    db.session.add(student)
    db.session.commit()
    return jsonify(student.to_dict())
    



    



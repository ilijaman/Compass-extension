from flask import Blueprint, jsonify, request, session, abort
from app import db
from models import Student, Todoitem

student_router= Blueprint(__name__, 'student')

@student_router.route('/api/compassbuddy/<student_id>/')
def show_tasks(student_id):
    student = Student.query.get_or_404(student_id, 'Account not found')
    student_dict = student.to_dict()
    
    todos = Todoitem.query.filter_by(student_id = student_id)
    todos_dict = [todo.to_dict() for todo in todos]
    data = { 
        'student': student_dict,
        'todos': todos_dict
    }
    return jsonify(data)





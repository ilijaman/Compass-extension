from datetime import date
from app import app, db
from models import Admin, Student, Todoitem


student_list = [

    {
        'username': 'Mario',
        'details': (
        ('Mario', 'Mario has been diagnosed with xyz. His abc, has recommended that he has xyz support in the classroom. Etc...', 9)
        )
    },
        {
        'username': 'Bobby',
        'details': (
        ('Bobby', 'Bobby has been diagnosed with xyz. His abc, has recommended that he has xyz support in the classroom. Etc...', 9)
        )
    },
        {
        'username': 'Katarina',
        'details': (
        ('Katarina', 'Katarina has been diagnosed with xyz. Her abc, has recommended that she has xyz support in the classroom. Etc...', 9)
        )
    },
        {
        'username': 'Daphne',
        'details': (
        ('Daphne', 'Daphne has been diagnosed with xyz. Her abc, has recommended that she has xyz support in the classroom. Etc...', 9)
        )
    }
]

todoitems = [
    'Complete xyz English task for this Friday', 'Complete xyz Math task for this Friday' 
]


with app.app_context():
    db.drop_all()
    db.create_all()
    for kids in student_list:
        student = Student(username=kids['username'], password_hash='')
        student.name=kids['details'][0]
        student.bio=kids['details'][1]
        student.grade=kids['details'][2]
        for items in todoitems:
            todo = Todoitem(text=items)
            student.todoitem.append(todo)
        db.session.add(student)
    db.session.commit()
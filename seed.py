from datetime import date
from app import app, db
from models import Admin, Student


student_list = [

    {
        'username': 'Mario',
        'details': (
        ('Mario', 'Mario has been diagnosed with xyz. His xyz, has recommended that he has xyz support in the classroom. Etc...', 9)
        )
    },
        {
        'username': 'Bobby',
        'details': (
        ('Bobby', 'Bobby has been diagnosed with xyz. His xyz, has recommended that he has xyz support in the classroom. Etc...', 9)
        )
    },
        {
        'username': 'Katarina',
        'details': (
        ('Katarina', 'Katarina has been diagnosed with xyz. Her xyz, has recommended that she has xyz support in the classroom. Etc...', 9)
        )
    },
        {
        'username': 'Daphne',
        'details': (
        ('Daphne', 'Daphne has been diagnosed with xyz. Her xyz, has recommended that she has xyz support in the classroom. Etc...', 9)
        )
    }
]


with app.app_context():
    db.drop_all()
    db.create_all()
    for kids in student_list:
        student = Student(username=kid['username'], password_hash='')
        for k in kids['details']:
            kid = Student(name=k[0], bio=k[1], grade=k[2])
            student.append(kid)
        db.session.add(student)
    db.session.commit()
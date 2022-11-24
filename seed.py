from datetime import date
from app import app, db
from models import Admin, Student, Todoitem, Noticeboard


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

admin_list = [

    {
        'username': 'Alex',
        'role': 'Education Support'
    },
    {
        'username': 'Nicola',
        'role': 'Education Support'
    }
]
    

todoitems = [
    'Complete xyz English task for this Friday', 'Complete xyz Math task for this Friday' 
]

noticeboard_items = [ 
    'Mario year 9 camp - Important!', 'Mario will need xyz assistance on camp and etc. etc.', 'Daphne - note from parents', 'Daphne is feeling xyz, she will return to school xyz', 'General', 'Important'
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

    for admins in admin_list:
        admin = Admin(username=admins['username'], password_hash='')
        admin.name=admins['username']
        admin.role=admins['role']
        notice1 = Noticeboard(title=noticeboard_items[0], text=noticeboard_items[1], importance_tier=noticeboard_items[4])
        notice2 = Noticeboard(title=noticeboard_items[2], text=noticeboard_items[3], importance_tier=noticeboard_items[5])
        if admins['username'] == 'Alex':
            admin.noticeboard.append(notice1)
        else: 
            admin.noticeboard.append(notice2)
        db.session.add(admin)
    db.session.commit()

  


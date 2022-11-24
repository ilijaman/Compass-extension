import datetime
from app import db

class Admin(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    name = db.Column(db.String(100), unique=True)
    role = db.Column(db.String(50))
    noticeboard = db.relationship('Noticeboard', backref='noticeboard')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'role': self.role,
            'account_type': 'Admin'
        }

    def __repr__(self):
        return f'<Admin {self.name} - {self.id}>'



class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password_hash = db.Column(db.Text)
    name = db.Column(db.String(100), unique=True)
    bio = db.Column(db.String(500), unique=True)
    grade = db.Column(db.Integer)
    # timetable = db.relationship('Timetable', backref='timetable')
    todoitem = db.relationship('Todoitem', backref='todoitem')
    # # subjects = db.relationship('Subjects', backref='subjects')
    # completedtasks = db.relationship('Completedtask', backref= 'completedtask')
    # goals = db.relationship('Goals', backref= 'goals')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'bio': self.bio,
            'grade': self.grade,
            'account_type': 'Student'
        }

    def __repr__(self):
        return f'<Student name: {self.name} id: {self.id}>'



class Noticeboard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    text = db.Column(db.Text, nullable=False)
    importance_tier = db.Column(db.String(20), nullable=False)
    date = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now)
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'))

    def to_dict(self):
        return {
        'id': self.id,
        'title': self.title,
        'text': self.text,
        'importance_tier': self.importance_tier,
        'date': self.date,
        'admin_id': self.admin_id
    }


# class Timetable(db.Model):
#     __tablename__ = 'timetable'
#     id = db.Column(db.Integer, primary_key=True)
#     date = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now)
#     student_id = db.Column(db.Integer, db.ForeignKey('students.id'))


class Todoitem(db.Model):
    __tablename__ = 'todoitems'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now)
    text = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))

    def to_dict(self):
        return {
        'id': self.id,
        'date': self.date,
        'text': self.text,
        'completed': self.completed,
        'student_id': self.student_id
    }


# class Subjects(db.Model):
#     __tablename__ = 'subjects'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.List, nullable=False)
#     date = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now)
#     student_id = db.Column(db.Integer, db.ForeignKey('students.id'))


# class CompletedTask(db.Model):
#     __tablename__ = 'completedtasks'
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.Text, nullable=False)
#     description = db.Column(db.Text, nullable=False)
#     student_id = db.Column(db.Integer, db.ForeignKey('students.id'))


# class Goals(db.Model):
#     __tablename__ = 'goals'
#     id = db.Column(db.Integer, primary_key=True) 
#     title = db.Column(db.Text, nullable=False)
#     description = db.Column(db.Text, nullable=False)
#     student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    









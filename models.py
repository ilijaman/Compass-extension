import datetime
from app import db

class Admin(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    name = db.Column(db.String(100), unique=True, nullable=False)
    role = db.Column(db.String(50), nullable=False)
    noticeboard = db.relationship('Noticeboard', backref='noticeboard')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username
        }

    def __repr__(self):
        return f'<Admin {self.name} - {self.id}>'



class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    name = db.Column(db.String(100), unique=True, nullable=False)
    bio = db.Column(db.String(500), unique=True, nullable=False)
    grade = db.Column(db.Integer, nullable=False)
    timetable = db.relationship('Timetable', backref='timetable')
    todoitem = db.relationship('Todoitem', backref='todoitem')
    # subjects = db.relationship('Subjects', backref='subjects')
    # completedtasks = db.relationship('Completedtask', backref= 'completedtask')
    goals = db.relationship('Goals', backref= 'goals')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username
        }

    def __repr__(self):
        return f'<Student name: {self.name} id: {self.id}>'



class Noticeboard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    text = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now)
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'))


class Timetable(db.Model):
    __tablename__ = 'timetable'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))


class Todoitem(db.Model):
    __tablename__ = 'todoitems'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now)
    text = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))


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


class Goals(db.Model):
    __tablename__ = 'goals'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    









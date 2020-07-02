'''a modual to contain the definitions of the different types of users'''

class User:
    '''a class that holds the definition of the base type user'''
    def __init__(self, _id=None, username='', password='', department='', functional_team='', title=''):
        self._id = _id
        self.username = username
        self.password = password
        self.department = department
        self.functional_team = functional_team
        self.title = title

    def to_dict(self):
        '''reutrns a dictionary deffinition of itself'''
        return self.__dict__

    @classmethod
    def from_dict(cls, input_user):
        '''takes an input dictionary and returns a user'''
        user = User()
        user.__dict__.update(input_user)
        return user

class DJ(User):
    '''a class that holds the deffinition of a DJ extends the base User class'''
    def __init__(self, _id=None, username='', password='', department='', functional_team='', title='', role='DJ'):
        super().__init__(_id, username=username, password=password, department=department, functional_team=functional_team, title=title)
        self.role = role

    @classmethod
    def from_dict(cls, input_dj):
        '''takes an input dictionary and returns a user'''
        user = DJ()
        user.__dict__.update(input_dj)
        return user

class Admin:
    '''the class for users that manage users'''
    def __init__(self, _id=None, username="", password="", role='admin'):
        self._id = _id
        self.username = username
        self.password = password
        self.role = 'admin'

    def to_dict(self):
        '''returns a dictionary representation of self'''
        return self.__dict__

    @classmethod
    def from_dict(cls ,input_admin):
        '''creates an admin object from a dictionary'''
        user = Admin()
        user.__dict__.update(input_admin)
        return user
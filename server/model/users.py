'''a modual to contain the definitions of the different types of users'''

class User:
    '''a class that holds the definition of the base type user'''
    def __init__(self, _id=None, user_name='', password='', department='', functional_team='', title=''):
        self._id = _id
        self.user_name = user_name
        self.password = password
        self.department = department
        self.functional_team = functional_team
        self.title = title

    def to_dict(self):
        '''reutrns a dictionary deffinition of itself'''
        user_dict = self.__dict__
        if user_dict['_id']:
            del user_dict['_id']
        return self.__dict__

    @classmethod
    def from_dict(cls, input_user):
        '''takes an input dictionary and returns a user'''
        user = User()
        user.__dict__.update(input_user)
        return user

class DJ(User):
    '''a class that holds the deffinition of a DJ extends the base User class'''
    def __init__(self, _id=None, user_name='', password='', department='', functional_team='', title='', role='DJ'):
        super().__init__(_id, user_name=user_name, password=password, department=department, functional_team=functional_team, title=title)
        self.role = role

    def to_dict(self):
        '''reutrns a dictionary deffinition of itself'''
        return self.to_dict()

    @classmethod
    def from_dict(cls, input_dj):
        '''takes an input dictionary and returns a user'''
        user = DJ()
        user.__dict__.update(input_dj)
        return user
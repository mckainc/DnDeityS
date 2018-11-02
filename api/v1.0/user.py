

class User:
	def __init__(self, is_authenticated=False, is_active=True, is_anonymous=True, user_id=-1, db_user_id=-1):
		self.__is_authenticated = is_authenticated
		self.__is_active = is_active
		self.__is_anonymous = is_anonymous
		self.__user_id = user_id
		self.__db_user_id = db_user_id

	@user_id.setter
	def user_id(self, user_id):
		self.__user_id = user_id

	@is_athenticated.setter
	def is_athenticated(self, is_authenticated):
		self.__is_authenticated = is_authenticated

	@is_anonymous.setter
	def is_anonymous(self, is_anonymous):
		self.__is_anonymous = is_anonymous

	@is_active.setter
	def is_active(self, is_active):
		self.__is_active = is_active

	@db_user_id.setter
	def is_active(self, db_user_id):
		self.__db_user_id = db_user_id

	@property
	def db_user_id(self):
		return self.__db_user_id

	@property
	def is_authenticated(self):
		return self.__is_authenticated

	@property
	def is_anonymous(self):
		return self.__is_anonymous
	
	@property
	def is_active(self):
		return self.__is_active

	def get_id(self):
		return str(self.__user_id)

	def __eq__(self, other):
        '''
        Checks the equality of two `UserMixin` objects using `get_id`.
        '''
        if isinstance(other, User):
            return self.get_id() == other.get_id()
        return NotImplemented

    def __ne__(self, other):
        '''
        Checks the inequality of two `UserMixin` objects using `get_id`.
        '''
        equal = self.__eq__(other)
        if equal is NotImplemented:
            return NotImplemented
        return not equal
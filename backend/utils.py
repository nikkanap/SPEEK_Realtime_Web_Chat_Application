import random
import string

from passlib.hash import bcrypt

# generates a userID of size 10
def generateUserID(size=10, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

# generates a hash of the password string
def generatePassHash(password):
    return bcrypt.hash(password)

# matches the password
def checkPassHash(password, passwordhash):
    return bcrypt.verify(password, passwordhash)
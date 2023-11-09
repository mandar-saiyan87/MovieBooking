from datetime import datetime
from flask_bcrypt import generate_password_hash


class DBConfig:
    MONGO_URI = "mongodb+srv://MongoDBPRJ:gVdjR7i016fD1Zil@cluster0.u9qxrdf.mongodb.net/airbncDB?retryWrites=true&w=majority"


class AppConfig:
    DEBUG = True



class User:
    def __init__(self, userData):
        self.name = userData['name']
        self.email = userData['email']
        self.password = generate_password_hash(userData['password'], 10)
        self.timestamp = datetime.now()

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "timestamp": self.timestamp
        }


from datetime import datetime, timedelta
from flask_bcrypt import generate_password_hash
from flask_jwt_extended import JWTManager


class DBConfig:
    MONGO_URI = "mongodb+srv://MongoDBPRJ:gVdjR7i016fD1Zil@cluster0.u9qxrdf.mongodb.net/airbncDB?retryWrites=true&w=majority"


class AppConfig:
    DEBUG = True
    SECRET_KEY = '28d198718ec1995'
    JWT_SECRET_KEY = '723b1c11dd4ec026fe79'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=9)
    UPLOAD_FOLDER = 'static'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


class NewUser:
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


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in AppConfig.ALLOWED_EXTENSIONS


class NewPlace:
    def __init__(self, userid, title, address, photos, description, amenities, checkIn, checkInT, checkOut, checkOutT, guests, extraInfo):
        self.userid = userid
        self.title = title
        self.address = address
        self.photos = photos
        self.description = description
        self.amenities = amenities
        self.checkIn = checkIn
        self.checkInT = checkInT
        self.checkOut = checkOut
        self.checkOutT = checkOutT
        self.guests = guests
        self.extraInfo = extraInfo

    def to_dict(self):
        return {
            "usrid": self.userid,
            "title": self.title,
            "address": self.address,
            "photos": self.photos,
            "description": self.description,
            "amenities": self.amenities,
            "checkIn": self.checkIn,
            "checkInT": self.checkInT,
            "checkOut": self.checkOut,
            "checkOutT": self.checkOutT,
            "guests": self.guests,
            "extraInfo": self.extraInfo
        }

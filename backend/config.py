from datetime import datetime, timedelta
from flask_bcrypt import generate_password_hash
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

db_passwd = os.getenv('MONGO_PASSWORD')


class DBConfig:
    MONGO_URI = f'mongodb+srv://MongoDBPRJ:{db_passwd}@cluster0.u9qxrdf.mongodb.net/airbncDB?retryWrites=true&w=majority'


class AppConfig:
    DEBUG = True
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
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
    def __init__(self, userid, title, address, photos, description, amenities, checkIn, checkInT, checkOut, checkOutT, guests, price, extraInfo):
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
        self.price = price
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
            "price": self.price,
            "extraInfo": self.extraInfo
        }
        
class NewBooking:
    def __init__(self, placeid, userid, fname, contact, amount, checkIn, checkOut, numofguests):
        self.userid = userid
        self.placeid = placeid
        self.fname = fname
        self.contact = contact
        self.amount = amount
        self.checkIn = checkIn
        self.checkOut = checkOut
        self.numofguests = numofguests
        
    def to_dict(self):
        return {
            "usrid": self.userid,
            "placeid": self.placeid,
            "fname": self.fname,
            "contact": self.contact,
            "amount": self.amount,
            "checkIn": self.checkIn,
            "checkOut": self.checkOut,
            "numofguests": self.numofguests,
        }

from flask_pymongo import MongoClient
from config import DBConfig
import redis

mongodb = MongoClient(DBConfig.MONGO_URI).get_database('airbncDB')


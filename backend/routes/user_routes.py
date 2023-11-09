from flask import Blueprint, jsonify, request
from bson import ObjectId
from db import db
from config import User


user_routes = Blueprint('/api/users', __name__)


@user_routes.route('/api/users', methods=['GET'])
def get_users():
    return {'success': 'test ok'}


@user_routes.route('/api/users', methods=['POST'])
def register_user():
    userData = request.json
    newUser = User(userData).to_dict()
    # print(newUser)
    try:
        userExist = db.users.find_one({"email": newUser["email"]})
        print(userExist)
        if userExist:
            return {"status": "Duplicate", "msg": "User exists with email id"}
        else:
            result = db.users.insert_one(newUser)
            if result.acknowledged:
                newUser['_id'] = str(result.inserted_id)
                return {"id": newUser['_id'], "msg": "New user registered", "status": "Success"}
            else:
                return {"status": "Failed", "msg": "User not registered"}
    except Exception as e:
        return {"status": "Failed", "srverror": str(e), "msg": "Someting went wrong, please try again later!"}


@user_routes.route('/api/users', methods=['POST'])
def login():
    userData = request.json
    print(userData)
    return {"msg": "User found"}

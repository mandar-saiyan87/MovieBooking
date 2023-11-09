from flask import Blueprint, jsonify, request
from bson import ObjectId
from db import db
from config import User
from flask_bcrypt import check_password_hash


user_routes = Blueprint('/api/users', __name__)


@user_routes.route('/api/users', methods=['GET'])
def get_users():
    return {'success': 'test ok'}


@user_routes.route('/api/users/register', methods=['POST'])
def register_user():
    userData = request.json
    newUser = User(userData).to_dict()
    try:
        userExist = db.users.find_one({"email": newUser["email"]})
        if userExist:
            return {"status": "Warning", "msg": "User exists with email id"}
        else:
            result = db.users.insert_one(newUser)
            if result.acknowledged:
                newUser['_id'] = str(result.inserted_id)
                return {"id": newUser['_id'], "msg": "New user registered", "status": "Success"}
            else:
                return {"status": "Failed", "msg": "User not registered"}
    except Exception as e:
        return {"status": "Failed", "srverror": str(e), "msg": "Someting went wrong, please try again later!"}


@user_routes.route('/api/users/login', methods=['POST'])
def login():
    loginData = request.json
    userData = db.users.find_one({'email': loginData['email']})
    if userData:
        pass_valid = check_password_hash(
            userData['password'], loginData['password'])
        if pass_valid:
            return {"msg": "User found"}
        else:
            return {"msg": "Password doesn't match"}
    else:
        return {"msg": "User not found"}

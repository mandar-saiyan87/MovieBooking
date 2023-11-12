from datetime import datetime, timedelta
from flask import Blueprint, jsonify, make_response, request
from bson import ObjectId
from db import db
from config import User
from flask_bcrypt import check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


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
    try:
        userData = db.users.find_one({'email': loginData['email']})
        if userData:
            pass_valid = check_password_hash(
                userData['password'], loginData['password'])
            if pass_valid:
                # expiry = datetime.now() + timedelta(days=2)
                access_token = create_access_token(
                    identity=userData['email'], expires_delta=False)
                return {
                    "status": "Success",
                    "msg": "User logged in successfully",
                    "token": access_token,
                    "userDetails": {
                        "name": userData['name'],
                        "email": userData['email']
                    }
                }
            else:
                return {"status": "Failed", "msg": "Invalid credentials. Please check username / password"}
        else:
            return {"status": "Failed", "msg": "Invalid credentials. Please check username / password"}
    except Exception as e:
        return {"status": "Failed", "srverror": str(e), "msg": "Someting went wrong, please try again later!"}


@user_routes.route('/api/users/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    user = db.users.find_one({'email': current_user})
    userinfo = {
        'name': user['name'],
        'email': user['email']
    }
    return {"msg": "user found", 'status': 'Success', 'userInfo': userinfo}

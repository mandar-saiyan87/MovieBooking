from datetime import datetime, timedelta
from flask import Blueprint, jsonify, make_response, request
from bson import ObjectId
from db import mongodb
from config import NewUser
from flask_bcrypt import check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

user_routes = Blueprint('/api/users', __name__)
login_manager = LoginManager()


class User(UserMixin):
    pass


@login_manager.user_loader
def load_user(user_id):
    userData = mongodb.users.find_one({"_id": user_id})
    if userData:
        user = User()
        user.id = userData['_id']
        return user
    return None


@user_routes.route('/api/users', methods=['GET'])
def get_users():
    return {'success': 'test ok'}


@user_routes.route('/api/users/register', methods=['POST'])
def register_user():
    userData = request.json
    newUser = NewUser(userData).to_dict()
    try:
        userExist = mongodb.users.find_one({"email": newUser["email"]})
        if userExist:
            return {"status": "Warning", "msg": "User exists with email id"}
        else:
            result = mongodb.users.insert_one(newUser)
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
        userData = mongodb.users.find_one({'email': loginData['email']})
        if userData:
            pass_valid = check_password_hash(
                userData['password'], loginData['password'])
            if pass_valid:
                user = User()
                user.id = userData['_id']
                login_user(user)
                access_token = create_access_token(
                    identity=userData['email'])
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
    userData = mongodb.users.find_one({'email': current_user})
    user = User()
    user.id = userData['_id']
    login_user(user)
    userinfo = {
        'name': userData['name'],
        'email': userData['email']
    }
    return {"msg": "user found", 'status': 'Success', 'userInfo': userinfo}


@user_routes.route('/api/users/logout', methods=['POST'])
def logout():
    try:
        logout_user()
        return {"msg": "Logout Successful", 'status': 'Success'}
    except Exception as e:
        return {"msg": "Logout Failed", "status": "Failed", "error": str(e)}

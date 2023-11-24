import os
from datetime import datetime, timedelta
from flask import Blueprint, jsonify, request, url_for, redirect, session
from bson import ObjectId
import requests
from db import mongodb
from config import NewUser, AppConfig, allowed_file, NewPlace
from flask_bcrypt import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename


user_routes = Blueprint('/api/users', __name__)


def get_user():
    user = get_jwt_identity()
    userData = mongodb.users.find_one({'email': user})
    userId = str(userData['_id'])
    return userId


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
                access_token = create_access_token(
                    identity=userData['email'])
                session['id'] = str(userData['_id'])
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
    userId = get_user()
    userData = mongodb.users.find_one({'email': current_user})
    userinfo = {
        'id': userId,
        'name': userData['name'],
        'email': userData['email']
    }
    return {"msg": "user found", 'status': 'Success', 'userInfo': userinfo}


@user_routes.route('/api/users/logout', methods=['POST'])
def logout():
    try:
        session.pop('id', None)
        return {"msg": "Logout Successful", 'status': 'Success'}
    except Exception as e:
        print(e)
        return {"msg": "Logout Failed", "status": "Failed", "error": str(e)}


@user_routes.route('/api/users/photobylink', methods=['POST'])
@jwt_required()
def upload_link_photo():

    userId = get_user()

    # check if image url in post request
    if 'image_url' not in request.json:
        return {'status': 'Failed', 'msg': 'No image url provided'}

    image_url = request.json['image_url']
    folder_title = request.json['title']

    # download image
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        # response.content
    except Exception as e:
        return {'status': 'Failed', 'msg': 'Error downloading image', 'error': str(e)}

    # check folder for current user, if not create
    try:
        user_folder = os.path.join(
            AppConfig.UPLOAD_FOLDER, f'photo_uploads/{userId}/{str(folder_title).replace(" ", "_")}')

        if not os.path.exists(user_folder):
            os.makedirs(user_folder)

        # print(user_folder)

        # filename from url
        base, extension = os.path.splitext(image_url)
        filename = os.path.join(
            user_folder, f'{os.path.basename(base)}.jpg')
        # print(filename)

        # save image to folder
        with open(filename, 'wb') as f:
            f.write(response.content)

        # user_images = [url_for('photo_upload', filename=f'{userId}/{img}')
        #                for img in os.listdir(user_folder) if img.endswith('.jpg')]

        user_images = []
        for img in os.listdir(user_folder):
            img_url = url_for(
                'static', filename=f'photo_uploads/{userId}/{folder_title}/{img}')
            user_images.append(img_url)

        print(user_images)

        return {'status': 'Success', 'msg': 'Image saved successfully', 'userImages': user_images}
    except Exception as e:
        return {'status': 'Failed', 'msg': 'Couldn\'t save image',  "error": str(e)}


@user_routes.route('/api/users/photofromdevice', methods=['POST'])
@jwt_required()
def upload_device_photo():

    userId = get_user()
    data = request.files['file']
    folder_name = request.form.get('title').replace(" ", "_")

    if data.filename == '':
        return {"status": "Failed", "msg": "No file selected"}

    try:
        user_folder = os.path.join(
            AppConfig.UPLOAD_FOLDER, f'photo_uploads/{userId}/{folder_name}')
        if not os.path.exists(user_folder):
            os.makedirs(user_folder)

        # print(user_folder)

        if allowed_file(data.filename):
            filename = secure_filename(data.filename)
            data.save(os.path.join(user_folder, filename))

            user_images = []
            for img in os.listdir(user_folder):
                img_url = url_for(
                    'static', filename=f'photo_uploads/{userId}/{folder_name}/{img}')
                user_images.append(img_url)

            return {"status": 'Success', "msg": "Photo saved to profile", 'userImages': user_images}
        else:
            return {"status": 'Failed', "msg": "Couln't save the photo"}
    except Exception as e:
        return {"status": 'Failed', "msg": "Something went wrong please try again", "error": str(e)}


@user_routes.route('/api/users/deletephoto', methods=['POST'])
@jwt_required()
def delete_image():
    userId = get_user()
    image_path = request.json['imgpath'].lstrip('/')
    folder_name = str(request.json['title']).replace(" ", "_")
    try:
        if os.path.exists(image_path):
            os.remove(image_path)

        # user_folder = os.path.join(
        # AppConfig.UPLOAD_FOLDER, f'photo_uploads/{userId}/Treebo_Trend_Five_Elements')
        user_folder = os.path.dirname(image_path)
        if user_folder and len(user_folder) > 0:
            user_images = []
            for img in os.listdir(user_folder):
                img_url = url_for(
                    'static', filename=f'photo_uploads/{userId}/{folder_name}/{img}')
                user_images.append(img_url)

            return {'status': 'Success', 'msg': 'Image deleted', 'userImages': user_images}
        else:
            return {'status': 'Success', 'msg': 'Could\'t delete image'}

    except Exception as e:
        return {"status": "Failed", "msg": "Something went wrong, Please try again", "error": str(e)}


@user_routes.route('/api/users/newplace', methods=['POST'])
@jwt_required()
def add_newplace():
    userId = get_user()
    placeData = request.json
    # print(placeData)
    new_place = NewPlace(
        userId, placeData['title'], placeData['address'], placeData['photos'],
        placeData['description'], placeData['amenities'],
        placeData['checkIn'], placeData['checkInT'],
        placeData['checkOut'], placeData['checkOutT'],
        placeData['guests'], placeData['extraInfo'],
    ).to_dict()
    # print(new_place)
    try:
        result = mongodb.places.insert_one(new_place)
        if result.acknowledged:
            new_place['_id'] = str(result.inserted_id)
            return {"status": "Success", "msg": "New place added successfully", "id": new_place['_id']}
        else:
            return {"status": "Failed", "msg": "Place not added"}
    except Exception as e:
        return {"status": "Failed", "msg": "Someting went wrong, please try again later!", "error": str(e)}


# @user_routes.route('/api/users/photos', methods=['GET'])
# @jwt_required()
# def get_photos():

#     userId = get_user()

#     user_folder = os.path.join(
#         AppConfig.UPLOAD_FOLDER, f'photo_uploads/{userId}/Treebo_Trend_Five_Elements')
#     if not os.path.exists(user_folder):
#         os.mkdir(user_folder)

#     # print(user_folder)
#     if user_folder and len(user_folder) > 0:
#         user_images = []
#         for img in os.listdir(user_folder):
#             img_url = url_for(
#                 'static', filename=f'photo_uploads/{userId}/Treebo_Trend_Five_Elements/{img}')
#             user_images.append(img_url)

#         return {'status': 'Success', 'msg': 'Image retrived successfully', 'userImages': user_images}
#     else:
#         return {'status': 'Success', 'msg': 'There are no image', 'userImages': []}

from flask import Blueprint, request
import requests
from bson import ObjectId
from db import mongodb
from .user_routes import get_user
from config import AppConfig, replace_special
from flask_jwt_extended import jwt_required
import os
import shutil

places_routes = Blueprint('/api/places', __name__)


@places_routes.route('/api/places/test', methods=['GET'])
def test_api():
    return {"status": 200, "msg": "All Good"}


@places_routes.route('/api/places/getplaces', methods=['GET'])
def get_all_places():
    try:
        records = mongodb.places.find()
        places = []
        for place in records:
            place['_id'] = str(place['_id'])
            places.append(place)

        if len(places) > 0:
            # print(user_places)
            return {"status": "Success", "msg": "Places found for user", "places": places}
        else:
            return {"status": "Failed", "msg": "No places found", "user_places": []}
    except Exception as e:
        return {"status": 'Error', "msg": "Somthing went wrong", "error": str(e)}


@places_routes.route('/api/places/placebyuser', methods=['GET'])
@jwt_required()
def get_user_places():
    current_user = get_user()
    try:
        records = mongodb.places.find({'usrid': current_user})
        user_places = []
        for place in records:
            place['_id'] = str(place['_id'])
            user_places.append(place)

        if len(user_places) > 0:
            # print(user_places)
            return {"status": "Success", "msg": "Places found for user", "user_places": user_places}
        else:
            return {"status": "Failed", "msg": "No places found", "user_places": []}
    except Exception as e:
        return {"status": "Error", "msg": "Something went wrong", "error": str(e)}


@places_routes.route('/api/places/getplace/<id>', methods=['GET'])
def get_place_by_id(id):
    placeID = ObjectId(id)
    try:
        place = mongodb.places.find_one({'_id': placeID})
        if place:
            bookings = mongodb.bookings.find({'placeid': id})
            all_booking = []
            for booking in bookings:
                booking['_id'] = str(booking['_id'])
                all_booking.append(booking)
            if len(all_booking) > 0:
                place['bookings'] = all_booking
            place['_id'] = str(place['_id'])
            return {"status": 'Success', "msg": "Place found", "user_place": place}
        else:
            return {"status": 'Failed', "msg": "Place not found"}
    except Exception as e:
        return {"status": 'Error', "msg": "Somthing went wrong, please try again", "error": str(e)}


@places_routes.route('/api/places/updateplace/<id>', methods=['PUT'])
@jwt_required()
def update_place_by_id(id):
    placeID = ObjectId(id)
    placeData = request.json
    try:
        place = mongodb.places.find_one_and_update(
            {'_id': placeID}, {'$set': placeData})
        return {"status": 'Success', "msg": "Place found"}
    except Exception as e:
        return {"status": 'Error', "msg": "Somthing went wrong, please try again", "error": str(e)}


@places_routes.route('/api/places/deleteplace/<id>', methods=['DELETE'])
@jwt_required()
def delete_place(id):
    current_user = get_user()
    placeData = mongodb.places.find_one({'_id': ObjectId(id)})
    folder_title = placeData['title']
    folder_name = replace_special(folder_title).replace(' ', '_')
    try:
        folder_path = os.path.join(
            AppConfig.UPLOAD_FOLDER, f'photo_uploads/{current_user}/{folder_name}')
        if os.path.exists(folder_path):
            shutil.rmtree(folder_path, ignore_errors=True)
        placeDelete = mongodb.places.find_one_and_delete({'_id': ObjectId(id)})
        bookings = mongodb.bookings.delete_many({'placeid': id})
        return {"status": "Success", "msg": "Place deleted"}
    except Exception as e:
        print(str(e))
        return {"status": 'Error', "msg": "Somthing went wrong, please try again", "error": str(e)}

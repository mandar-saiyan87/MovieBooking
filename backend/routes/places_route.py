from flask import Blueprint, jsonify, request, url_for
import requests
from bson import ObjectId
from db import mongodb
from .user_routes import get_user
from flask_jwt_extended import jwt_required


places_routes = Blueprint('/api/places', __name__)


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
        return {"status": 'Failed', "msg": "Somthing went wrong"}


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
        return {"status": "Failed", "msg": "Something went wrong", "error": str(e)}


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
        return {"status": 'Failed', "msg": "Somthing went wrong, please try again", "error": str(e)}


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
        return {"status": 'Failed', "msg": "Somthing went wrong, please try again", "error": str(e)}

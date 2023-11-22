from flask import Blueprint, jsonify, request, url_for
import requests
from bson import ObjectId
from db import mongodb
from .user_routes import get_user
from flask_jwt_extended import jwt_required


places_routes = Blueprint('/api/places', __name__)


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
            print(user_places)
            return {"status": "Success", "msg": "Places found for user", "user_palces": user_places}
        else:
            return {"status": "Failed", "msg": "No places found"}
    except Exception as e:
        return {"status": "Failed", "msg": "Something went wrong", "error": str(e)}

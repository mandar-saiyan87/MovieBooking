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
    return {"status": "In progress", "msg": "In progress"}

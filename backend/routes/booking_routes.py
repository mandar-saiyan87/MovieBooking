from flask import Blueprint, jsonify, request, url_for
import requests
from bson import ObjectId
from db import mongodb
from .user_routes import get_user
from flask_jwt_extended import jwt_required

booking_routes = Blueprint('/api/bookings', __name__)


@booking_routes.route('/api/bookings/newbooking', methods=['POST'])
@jwt_required()
def new_booking():
    current_user = get_user()
    return {'status': 'In progress', 'msg': 'In progress'}

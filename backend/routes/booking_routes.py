from flask import Blueprint, jsonify, request, url_for
import requests
from bson import ObjectId
from db import mongodb
from config import NewBooking
from .user_routes import get_user
from flask_jwt_extended import jwt_required

booking_routes = Blueprint('/api/bookings', __name__)


@booking_routes.route('/api/bookings/newbooking', methods=['POST'])
@jwt_required()
def new_booking():
    current_user = get_user()
    booking = request.json
    # print(current_user)
    # print(booking)
    booking_new = NewBooking(
      booking['placeId'], current_user, booking['fname'], booking['contact'],
      booking['amount'], booking['bookcheckIn'], booking['bookcheckOut'], booking['bookGuests']
    ).to_dict()
    try:
      result = mongodb.bookings.insert_one(booking_new)
      if result.acknowledged:
        booking_new['_id'] = str(result.inserted_id)
        return {"status": "Success", "msg": "New booking added successfully", "id": booking_new['_id']}
      else:
        return {"status": "Failed", "msg": "Booking not added"}
    except Exception as e:
        return {"status": "Failed", "msg": "Someting went wrong, please try again later!", "error": str(e)}

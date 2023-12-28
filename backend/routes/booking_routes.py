from flask import Blueprint, request
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
    placeId = ObjectId(booking['placeId'])
    booking_new = NewBooking(
        booking['placeId'], current_user, booking['fname'], booking['contact'],
        booking['amount'], booking['bookcheckIn'], booking['bookcheckOut'], booking['bookGuests']
    ).to_dict()
    try:
        # place = mongodb.places.find_one({'_id': placeId})
        result = mongodb.bookings.insert_one(booking_new)
        if result.acknowledged:
            print(booking_new['_id'])
            return {"status": "Success", "msg": "New booking added successfully", "id": str(booking_new['_id'])}
        else:
            return {"status": "Failed", "msg": "Booking not added"}
    # return {"status": "In progress", "msg": "In progress"}
    except Exception as e:
        return {"status": "Failed", "msg": "Someting went wrong, please try again later!", "error": str(e)}


@booking_routes.route('/api/bookings/userbookings', methods=['GET'])
@jwt_required()
def get_user_bookings():
    current_user = get_user()
    # print(current_user)
    try:
        bookings = mongodb.bookings.find({'usrid': current_user})
        booking_details = []
        for booking in bookings:
            booking['_id'] = str(booking['_id'])
            place_id = ObjectId(booking['placeid'])
            # Get place from booking using placeid
            place = mongodb.places.find_one({'_id': place_id})
            place['_id'] = str(place['_id'])
            # Add place to respective booking details
            booking['booked_place'] = place
            booking_details.append(booking)
        # print(booking_details)
        if len(booking_details) > 0:
            return {'status': 'Success', 'msg': 'Booking found', 'bookings': booking_details}
        else:
            return {"status": "Failed", "msg": "Booking not added", 'bookings': []}
    except Exception as e:
        return {'status': 'Failed', 'msg': 'Something went wrong', 'error': str(e)}

from flask import Blueprint, jsonify
from utils import get_database_connection
#from app.socket_setup import socketio
# from app import app, socketio


user_bp = Blueprint('api/user', __name__)

# Get all the users
@user_bp.route('/get-users', methods=['GET'])
def get_all_users():
    conn = get_database_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM driver")
    drivers = cur.fetchall()

    driver_list = []
    for driver in drivers:
        driver_dict = {
            'user_id': driver[0],
             'first_name': driver[1],
             'vehicle_id':driver[2],
            'last_name': driver[3],
            'physical_address':driver[4]
           
        }
        driver_list.append(driver_dict)

    cur.close()
    conn.close()
    
    return jsonify(driver_list)
from flask import Blueprint, jsonify
from utils import get_database_connection
#from app.socket_setup import socketio
# from app import app, socketio


vehicle_bp = Blueprint('api/vehicle', __name__)

# Get vehicle data
@vehicle_bp.route('/get-vehicle-data', methods=['GET'])
def get_all_vehicles():
	conn = get_database_connection()
	cur = conn.cursor()

	cur.execute("SELECT * FROM vehicle")
	vehicles = cur.fetchall()

	vehicle_list = []
	for vehicle in vehicles:
		vehicle_dict = {
			'vehicle_id': vehicle[0],
			'user_id': vehicle[1],
			'bus_color': vehicle[2],
		}
		vehicle_list.append(vehicle_dict)

	cur.close()
	conn.close()
	
	return jsonify(vehicle_list)
    
    
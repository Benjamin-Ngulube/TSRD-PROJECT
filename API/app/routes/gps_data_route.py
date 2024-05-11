from flask import Blueprint, jsonify, request
from utils import get_database_connection
import sqlite3

gps_bp = Blueprint('api/gps', __name__)

# Post GPS data in the database
@gps_bp.route('/gps-data', methods=['POST'])
def insert_gps_data():
    try:
        conn = get_database_connection()
        cur = conn.cursor()

        data = request.get_json()
        location_id = data['location_id']
        vehicle_id = data['vehicle_id']
        latitude = data['latitude']
        longitude = data['longitude']
        timestamp = data['timestamp']
        speed = data['speed']

        cur.execute("INSERT INTO gps_data (location_id, vehicle_id, latitude, longitude, timestamp, speed) VALUES (?, ?, ?, ?, ?, ?)",
                     (location_id, vehicle_id, latitude, longitude, timestamp, speed))
       
        conn.commit()
        conn.close()

        return jsonify({'status': 201, 'message': 'GPS data inserted successfully'})
    except Exception as e:
        return jsonify({'status': 500, 'message': 'Error inserting GPS data: {}'.format(str(e))})

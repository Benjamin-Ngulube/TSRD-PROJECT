from flask import Blueprint, jsonify, request
from utils import get_database_connection
import sqlite3

violation_bp = Blueprint('api/violation', __name__)

# Post GPS data in the database
@violation_bp.route('/violations-data', methods=['POST'])
def insert_violation_data():
    try:
        conn = get_database_connection()
        cur = conn.cursor()

        data = request.get_json()
        violation_id = data['violation_id']
        vehicle_id = data['vehicle_id']
        user_id = data['user_id']
        location_id = data['location_id']
        speed_limit = data['speed_limit']
        recorded_speed = data['recorded_speed']
        timestamp = data['timestamp']
        violation_type = data['violation_type']

        cur.execute("INSERT INTO violations (violation_id, vehicle_id, user_id, location_id, speed_limit, recorded_speed, timestamp, violation_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                     (violation_id, vehicle_id, user_id, location_id, speed_limit, recorded_speed, timestamp, violation_type))
       
        conn.commit()
        conn.close()

        return jsonify({'status': 201, 'message': 'Violation data inserted successfully'})
    except Exception as e:
        return jsonify({'status': 500, 'message': 'Error inserting violation data: {}'.format(str(e))})

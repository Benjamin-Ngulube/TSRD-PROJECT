from flask import Flask, jsonify
from app.routes.user_routes import get_all_users
from app.routes.gps_data_route import insert_gps_data
from app.routes.bus_vehicle_route import get_all_vehicles
from app.routes.violation_data_route import insert_violation_data

app = Flask(__name__)

@app.route('/violations-data')
def violations():
    data = insert_violation_data()  # Fetch violations data
    return jsonify(data)

@app.route('/get-vehicle-data')
def vehicles():
    data = get_all_vehicles()  # Fetch vehicles data
    return jsonify(data)

@app.route('/gps-data')
def gps_data():
    data = insert_gps_data()  # Fetch GPS data
    return jsonify(data)

@app.route('/get-users')
def drivers():
    data = get_all_users()  # Fetch drivers data
    return jsonify(data)

@app.route('/report-point')
def combined_data():
    violations_data = insert_violation_data().get_json()
    vehicles_data = get_all_vehicles().get_json()
    gps_data_data = insert_gps_data().get_json()
    drivers_data = get_all_users().get_json()

    # Combine the data from each module into a single list
    combined_data = []
    for violation in violations_data:
        vehicle = next((v for v in vehicles_data if v['vehicle_id'] == violation['vehicle_id']), None)
        gps_datum = next((g for g in gps_data_data if g['location_id'] == violation['location_id']), None)
        driver = next((d for d in drivers_data if d['user_id'] == violation['user_id']), None)
        combined_data.append({
            **violation,
            **vehicle,
            **gps_datum,
            **driver
        })

    return jsonify(combined_data)

if __name__ == '__main__':
    app.run()
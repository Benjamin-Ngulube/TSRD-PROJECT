from flask import Flask
from flask_cors import CORS
from app.routes.user_routes import user_bp
from app.routes.bus_vehicle_route import vehicle_bp
from app.routes.gps_data_route import gps_bp
from app.routes.violation_data_route import violation_bp


def createApp():
    app = Flask(__name__)
    # registering routes blueprints for each route
    app.register_blueprint(user_bp)
    app.register_blueprint(vehicle_bp)
    app.register_blueprint(gps_bp)
    app.register_blueprint(violation_bp)

    CORS(app) # Enable Cross-Origin Resource Sharing (CORS)
    # Enable CORS
    CORS(app, resources={r"/*": {"origins": "*"}})

    return app
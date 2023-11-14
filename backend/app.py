from flask import Flask
from config import AppConfig
from routes.user_routes import user_routes, login_manager
from flask_cors import CORS
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.config.from_object(AppConfig)
jwt = JWTManager(app)
login_manager.init_app(app)
CORS(app)
app.register_blueprint(user_routes)


if __name__ == '__main__':
    app.run()

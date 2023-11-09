from flask import Flask
from config import AppConfig
from routes.user_routes import user_routes
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config.from_object(AppConfig)
app.register_blueprint(user_routes)
CORS(app)

if __name__ == '__main__':
    app.run()

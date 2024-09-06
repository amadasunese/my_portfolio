from flask import Flask
from flask_mail import Mail
from dotenv import load_dotenv
from config import Config 
import os

mail = Mail()

def create_app():
    load_dotenv()
    app = Flask(__name__)
    # app.secret_key = os.getenv('SECRET_KEY')
    app.secret_key = 'SECRET_KEY'
    app.config.from_object(Config)

    mail.init_app(app)


    with app.app_context():
        from routes import bp as routes_bp
        app.register_blueprint(routes_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)

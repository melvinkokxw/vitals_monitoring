from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    with app.app_context():
        from .home import routes
        app.register_blueprint(home.routes.home_bp)
        from .api import routes
        app.register_blueprint(api.routes.api_bp)
    return app
from flask import Flask

app = Flask(__name__, instance_relative_config=True, 
	template_folder='../frontend/templates',
	static_folder='../frontend/static')

# Import routes
from app.backend import views

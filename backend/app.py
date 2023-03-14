import os
import logging
import hashlib
from distutils.util import strtobool
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo
from dotenv import load_dotenv

from flask import Flask, request, render_template
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, set_access_cookies
from flask_jwt_extended import get_jwt, unset_jwt_cookies, jwt_required

from controller import get_palettes_list, get_palette_by_id, get_palette_by_tags, get_tags
from controller import add_new_user, authorization, get_user_info, update_user
from controller import get_favorite_user_palettes, update_user_favorite, save_palette_in_db, prepare_palette
from error_handler import ce

load_dotenv()
app_debug = bool(strtobool(os.getenv("DEBUG")))
app_log = bool(strtobool(os.getenv("LOG")))
dev_api = os.getenv("DEV_API_KEY")
logfile = os.getenv("LOG_FILE")

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=12)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
jwt = JWTManager(app)

if app_log:
    logging.basicConfig(
        filename=logfile,
        level=logging.DEBUG,
        format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s'
    )


##############
# USERS
##############

# Registration user
@app.route("/api/user/signup", methods=['POST'])
def signup():
    return add_new_user(request.json)


# Auth user, JTW token cookie
@app.route("/api/user/login", methods=["POST"])
def login():
    return authorization(request.json)


# Unset cookie, user logout
@app.route("/api/user/logout", methods=["POST"])
@jwt_required()
def logout():
    response = ce("Info", "0x0014", "Log Out Successful")
    unset_jwt_cookies(response)
    return response


# Get info
@app.route("/api/user/info", methods=['POST'])
@jwt_required()
def protected():
    return get_user_info(request.json)


# Update User Info
@app.route("/api/user/update", methods=['POST'])
@jwt_required()
def user_update():
    return update_user(request.json)


@app.route("/api/user/favorite", methods=['POST'])
@jwt_required()
def user_favorite():
    return update_user_favorite(request.json)


##############
# PALETTES
##############

# Get palettes list
@app.route("/api/palettes/list", methods=['POST'])
def palettes_list():
    return get_palettes_list(request.json)


# Get palette by ID
@app.route("/api/palettes/id", methods=['POST'])
def palette_by_id():
    return get_palette_by_id(request.json)


# Get palettes by colors
@app.route("/api/palettes/colors", methods=['POST'])
def palette_color():
    return get_palette_by_tags(request.json)


@app.route("/api/palettes/tags", methods=['POST'])
def tags_list():
    return get_tags()


@app.route("/api/palettes/favorite", methods=['POST'])
@jwt_required()
def get_fav_palettes():
    return get_favorite_user_palettes(request.json)


# Get palettes by colors
@app.route("/api/palettes/create", methods=['POST'])
@jwt_required()
def create_palette():
    return prepare_palette(request.form, request.files['file'])


# Get palettes by colors
@app.route("/api/palettes/save", methods=['POST'])
@jwt_required()
def save_palette():
    return save_palette_in_db(request.json)


##############
# PAGES
##############

@app.route("/api/logs", methods=['GET'])
def show_log():
    array = []
    with open(logfile, "r") as f:
        for line in reversed(list(f)):
            array.append(line.rstrip())
    return render_template("logs.html", content=array)


@app.route("/api/control", methods=['GET'])
def admin_control():
    ips = os.getenv("ALLOW_IPS").split(',')
    ip = request.headers.get('Cf-Connecting-Ip')
    if ip in ips:
        return render_template("admin.html")


##############
# SERVICE
##############

@app.after_request
def refresh_expiring_jwt(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(hours=3))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
            app.logger.info(f'UC:{get_jwt_identity()}; TRG: {target_timestamp}; EXP: {exp_timestamp}; T:{access_token}')
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response


# @app.before_request
# def head_key():
#     if request.method == 'POST':
#         now_date = datetime.now().strftime('%Y-%m-%d')
#         prod_api = hashlib.sha1(f"D4f0g6g{now_date}CC22".encode()).hexdigest()
#         head_api = request.headers.get("x-api-key")
#         if head_api != dev_api and head_api != prod_api:
#             # print(f"H: {head_api}; D: {dev_api}; P:{prod_api}")
#             app.logger.info(f'LP: {request.method} {request.full_path} H: {head_api}; D: {dev_api}; P:{prod_api}')
#             return "Forbidden", 403


@app.after_request
def after_request(response):
    api = request.headers.get('X-Api-Key')
    ip = request.headers.get('Cf-Connecting-Ip')
    ts = datetime.now(ZoneInfo("Europe/Moscow")).strftime('[%Y-%b-%d %H:%M]')
    data = request.headers.get('Show-Data')
    if data == "True":
        app.logger.warning(request.headers)
        app.logger.warning(request.get_data())
    app.logger.info(f'AR:{ts} {ip} {request.method} {response.status} {request.full_path} {request.scheme} {api}')
    return response


if __name__ == '__main__':
    app.run(os.getenv("SRV_HOST"), os.getenv("SRV_PORT"), app_debug)

import json
import os
import logging
import hashlib
import threading
from distutils.util import strtobool
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo
from dotenv import load_dotenv

from flask import Flask, request, render_template, render_template_string, flash, redirect, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, set_access_cookies
from flask_jwt_extended import get_jwt, unset_jwt_cookies, jwt_required

from controller import get_palettes_list, get_palette_by_id, get_palette_by_tags, get_tags
from controller import add_new_user, authorization, get_user_info, update_user, verification_mail
from controller import get_favorite_user_palettes, update_user_favorite, save_palette_in_db, prepare_palette
from controller import admin_get_users, admin_get_palettes, admin_delete_user, admin_switch_ban_user, update_user_avatar
from controller import admin_delete_palette, recovery_password, telegram_sender, params, keep_unique
from error_handler import ce

load_dotenv()

threading.Thread(print(params())).start()
app_debug = bool(strtobool(os.getenv("DEBUG")))
app_log = bool(strtobool(os.getenv("LOG")))
dev_api = os.getenv("DEV_API_KEY")
logfile = os.getenv("LOG_FILE")

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
app.config['SESSION_TYPE'] = 'filesystem'
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
#
# Required:
# login = mail@mail.ru
# password = md5 hash
#
@app.route("/api/user/signup", methods=['POST'])
def signup():
    return add_new_user(request.json)


# Auth user, JTW token cookie
#
# Required:
# login = mail@mail.ru
# password = md5 hash
#
@app.route("/api/user/login", methods=["POST"])
def login():
    return authorization(request.json)


# Recovery password
#
# Required:
# login = mail@mail.ru
#
@app.route("/api/user/recovery", methods=["POST"])
def recovery():
    return recovery_password(request.json)


# Unset cookie, user logout
#
# Required:
# CSRF Cookie
#
@app.route("/api/user/logout", methods=["POST"])
@jwt_required()
def logout():
    response = ce("Info", "0x0014", "Log Out Successful")
    unset_jwt_cookies(response)
    return response


# Get info
#
# Required:
# CSRF Cookie
#
@app.route("/api/user/info", methods=['POST'])
@jwt_required()
def protected():
    return get_user_info(request.json)


# Update User Info
#
# Required:
# CSRF Cookie
# old_password = md5 hash
# avatar = string url to image
# new_password = md5 hash
#
@app.route("/api/user/update", methods=['POST'])
@jwt_required()
def user_update():
    return update_user(request.json)


# Update or delete user avatar
#
# Required:
# CSRF Cookie
# avatar = string url to image
#
@app.route("/api/user/avatar", methods=['POST'])
@jwt_required()
def user_avatar():
    return update_user_avatar(request.json)


# Add palette to favorite
#
# Required:
# CSRF Cookie
# favorite = array(palette ids)
#
@app.route("/api/user/favorite", methods=['POST'])
@jwt_required()
def user_favorite():
    return update_user_favorite(request.json)


##############
# PALETTES
##############

# Get palettes list
#
# Required:
# count = int
# skip = int
#
@app.route("/api/palettes/list", methods=['POST'])
def palettes_list():
    return get_palettes_list(request.json)


# Get palette by ID
#
# Required:
# id = palette id
#
@app.route("/api/palettes/id", methods=['POST'])
def palette_by_id():
    return get_palette_by_id(request.json)


# Get palettes by colors
#
# Required:
# count = int
# skip = int
# tags = array(tags)
#
@app.route("/api/palettes/colors", methods=['POST'])
def palette_color():
    return get_palette_by_tags(request.json)


# Get all tags
#
@app.route("/api/palettes/tags", methods=['POST'])
def tags_list():
    return get_tags()


#
# Required:
# CSRF Cookie
#
@app.route("/api/palettes/favorite", methods=['POST'])
@jwt_required()
def get_fav_palettes():
    return get_favorite_user_palettes(request.json)


@app.route("/api/palettes/search", methods=['POST'])
def live_search():
    pass


@app.route("/api/palettes/random", methods=['POST'])
def random_palettes():
    return jsonify({"status", "OK"})


# Create new palette
#
# Required:
# CSRF Cookie
# file = form.files
# data = json
#
# example json: {'x': 633, 'y': 42, 'width': 400.00000000000006, 'height': 265,
# 'unit': 'px', 'realWidth': 3840, 'realHeight': 1080, 'scale': 3.2, 'mime': 'png'}
#
@app.route("/api/palettes/create", methods=['POST'])
@jwt_required()
def create_palette():
    return prepare_palette(request.form, request.files['file'])


# Save new palette in database
#
# Required:
# CSRF Cookie
# image_b64 = base64 encoded image
# colors = array(hex colors)
# tags = array(tags)
#
@app.route("/api/palettes/save", methods=['POST'])
@jwt_required()
def save_palette():
    return save_palette_in_db(request.json)


##############
# PAGES
##############

# Send message from site to telegram
#
# Required:
# name = string
# email = string(email@mail.ru)
# message = string
#
@app.route("/api/contact", methods=['POST'])
def feedback():
    js = request.get_json()
    msg = f"Message from site:\nSender:{js['name']} - {js['email']}\nMessage:\n{js['message']}"
    r = telegram_sender(msg)
    response = json.loads(r.content.decode('utf-8'))
    if response['ok']:
        return jsonify({'status': 'ok'})
    else:
        return ce('Error', '0x0024', response['description']), int(response['error_code'])


# Email verification
#
# Required:
# userid = database ObjectId()
# code = sha1(code)
#
@app.route("/api/verify/<userid>/<code>", methods=['GET'])
def verify(userid, code):
    return verification_mail(userid, code)


##############
# FLASK RENDER
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
    ip = request.headers.get('X-Real-IP')
    if ip is not None:
        ip = ip.split(",")[0]
    if ip is None:
        ip = request.remote_addr
    if ip in ips:
        act = request.args.get('act', type=str)
        uid = request.args.get('uid', type=str)
        if act is not None and uid is not None:
            match act:
                case 'user_del':
                    admin_delete_user(uid)
                    flash(f'User id: {uid} has been delete.')
                case 'user_ban':
                    admin_switch_ban_user(uid)
                    flash(f'User id: {uid} has been banned.')
                case 'palette_del':
                    admin_delete_palette(uid)
                    flash(f'Palette id: {uid} has been delete.')
                case _:
                    return render_template_string("Access denied")
            return redirect("/api/control", code=302)

        users = admin_get_users()
        palettes = admin_get_palettes()
        return render_template("admin.html", users=users, palettes=palettes)
    else:
        return render_template_string("Access denied")


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


@app.before_request
def head_key():
    if request.method == 'POST':
        now_date = datetime.now(timezone.utc).strftime('%Y-%m-%d')
        prod_api = hashlib.sha1(f"D4f0g6g{now_date}CC22".encode()).hexdigest()
        head_api = request.headers.get("x-api-key")
        if head_api != dev_api and head_api != prod_api:
            # print(f"H: {head_api}; D: {dev_api}; P:{prod_api}")
            app.logger.info(f'LP: {request.method} {request.full_path} H: {head_api}; D: {dev_api}; P:{prod_api}')
            return "Forbidden", 403


@app.after_request
def after_request(response):
    api = request.headers.get('X-Api-Key')
    ip = request.headers.get('X-Real-IP')
    if ip is not None:
        ip = ip.split(",")[0]
    if ip is None:
        ip = request.remote_addr
    ts = datetime.now(ZoneInfo("Europe/Moscow")).strftime('[%Y-%b-%d %H:%M]')
    data = request.headers.get('Show-Data')
    if data == "True":
        app.logger.warning(request.headers)
        app.logger.warning(request.get_data())
    app.logger.info(f'AR:IP:{ip}; {request.method} {response.status}; '
                    f'FullPath:{request.scheme}|{request.full_path}; ApiKey:{api}\n{"===" * 30}')
    threading.Thread(keep_unique(ip, ts, request.full_path, request.headers)).start()
    return response


if __name__ == '__main__':
    app.run(os.getenv("SRV_HOST"), os.getenv("SRV_PORT"), app_debug)

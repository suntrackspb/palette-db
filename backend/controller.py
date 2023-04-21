import json
import base64
import os
import re
from datetime import datetime
import hashlib
import random
import string
import requests

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from bson.objectid import ObjectId
from flask import jsonify, redirect
from flask_jwt_extended import set_access_cookies, create_access_token, get_jwt_identity

from database.db import UsersDB, PalettesDB, AdminUsers, AdminPalettes, UniqueVisits
from database.MongoJson import JSE
from converter.ImageFormater import crop_image, read_image
from error_handler import ce


mail_pattern = r'^[a-z0-9]+[\._-]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
pass_pattern = r'^[a-z0-9]{32}$'
url_pattern = r'^(http:\/\/|https:\/\/)[a-z0-9\/\.\-\_]+$'
palette_pattern = r'^[a-z0-9]{24}$'
username_pattern = r'^[А-ЯЁа-яёA-Za-z0-9]{1,24}$'

mail_srv = os.getenv("MAIL_SMTP")
mail_user = os.getenv("MAIL_USERNAME")
mail_pass = os.getenv("MAIL_PASSWORD")
mail_port = int(os.getenv("MAIL_PORT"))

# Проверяем наличие всех обязательных полей входных данных
#     if not all(field in data for field in REQUIRED_FIELDS):
#         return ce("Error", "0x0004", "Missing required fields"), 400


##############
# USERS
##############

def add_new_user(data):
    if check_exist_user(data['login']) is not None:
        return ce("Error", "0x0001", "User already register"), 400
    if check_exist_username(data['username']) is not None:
        return ce("Error", "0x0028", "User already register"), 400
    if not re.search(mail_pattern, data['login']):
        return ce("Error", "0x0002", "Check e-mail"), 400
    if not re.search(pass_pattern, data['password']):
        return ce("Error", "0x0003", "Invalid hash password"), 400
    if not re.search(username_pattern, data['username']):
        return ce("Error", "0x0023", "Invalid username"), 400

    service_code = hashlib.sha1(f"{data['login']}{datetime.now()}".encode()).hexdigest()
    obj = {
        "uid": next_users_count(),
        "username": data['username'],
        "login": data['login'],
        "password": data['password'],
        "avatar": None,
        "create": datetime.now(),
        "favorite": [],
        "block": False,
        "verify": False,
        "service_code": service_code
    }
    # print(data)
    db = JSE.encode(UsersDB().create(obj))
    # send_mail(data['login'], db, service_code)
    uid = db.replace('"', '')
    email = data['login']
    subject = f"Mail verification code from {os.getenv('BASE_URL')}"
    message = f"Этот почтовый адрес был использован для регистрации на сайте {os.getenv('BASE_URL')}. \n" \
              f"Для активации аккаунта перейдите по ссылке: {os.getenv('BASE_URL')}/api/verify/{uid}/{service_code} \n" \
              f"Если это были не вы просто проигнорируте письмо. \n\n\n\n С уважением, администрация!"

    mail_sender(email, subject, message)
    return db


def check_exist_user(login):
    return UsersDB().check({"login": login})


def check_exist_username(username):
    return UsersDB().check({"username": username})


def next_users_count():
    return int(UsersDB().count()) + 1


def authorization(data):
    if not data['login'] and data['password']:
        return ce("Error", "0x0007", "Incorrect symbols password or username"), 401
    if not re.search(mail_pattern, data['login']):
        return ce("Error", "0x0007", "Incorrect symbols password or username"), 401

    db = UsersDB().auth(data)
    if db is None:
        return ce("Error", "0x0004", "Wrong username or password"), 400
    try:
        if db['block']:
            return ce("Error", "0x0025", "User has banned"), 403
        if not db["verify"]:
            return ce("Error", "0x0015", "Not verify e-mail"), 400

        if db['login'] == data['login'] and db['password'] == data['password']:
            access_token = create_access_token(identity=data['login'])
            response = ce("Info", "0x0005", "Login Successful")
            set_access_cookies(response, access_token)
            return response, 200
        else:
            return ce("Error", "0x0006", "Wrong username or password"), 400
    except KeyError as e:
        return ce("Error", "0x0018", "No field verify in db"), 400


def verification_mail(uid, code):
    db = UsersDB().verify(ObjectId(uid))[0]
    if db is None:
        return ce("Error", "0x0017", "Wrong user"), 400
    if code == db['service_code']:
        UsersDB().update_verify(ObjectId(uid))
        return redirect("/login?verify=true", code=302)
    else:
        return ce("Error", "0x0016", "Wrong code"), 400


def get_user_info(data):
    user = get_jwt_identity()
    data = UsersDB().auth({"login": user})
    data.pop('password')
    return JSE.encode(data), 200


def update_user_favorite(data):
    user = get_jwt_identity()
    favorite = []
    for pid in data['favorite']:
        favorite.append(ObjectId(pid))

    UsersDB().update_favorite(user, favorite)
    return JSE.encode(UsersDB().favorite(user))


def update_user_avatar(data):
    user = get_jwt_identity()
    if data['avatar'] == "None":
        avatar = None
        UsersDB().update_avatar(user, avatar)
        return ce("Info", "0x0026", "Avatar has been deleted")

    if not re.search(url_pattern, data['avatar']):
        return ce("Error", "0x0020", "Invalid url format"), 400
    else:
        UsersDB().update_avatar(user, data['avatar'])
        return ce("Info", "0x0027", "Avatar has been updated")


#
# Required object properties
# uid, login, password, avatar, create, favorite
#
def update_user(data):
    user = get_jwt_identity()
    user_info = check_exist_user(user)
    user_data = {"login": user}
    if user_info['password'] != data["old_password"]:
        return ce("Error", "0x0019", "Wrong old password"), 400

    if data["new_password"]:
        if not re.search(pass_pattern, data['new_password']):
            return ce("Error", "0x0003", "Invalid hash password"), 400
        user_data["password"] = data['new_password']

    if data["avatar"]:
        if not re.search(url_pattern, data['avatar']):
            return ce("Error", "0x0020", "Invalid url format"), 400
        user_data["avatar"] = data['avatar']

    UsersDB().update(user_data)
    data = UsersDB().auth({"login": user})
    data.pop('password')
    return JSE.encode(data), 200


##############
# PALETTES
##############

def get_palettes_list(data):
    try:
        if data['count'] and type(data['skip']) == int:
            return JSE.encode(PalettesDB().get_list(data['count'], data['skip'])), 200
        else:
            return ce("Error", "0x0008", "Incorrect parameters"), 400
    except Exception as e:
        return ce("Error", "0x0009", str(e)), 400


def get_palette_by_id(data):
    try:
        if re.match(palette_pattern, data['id']) is not None:
            return JSE.encode(PalettesDB().get_by_id(data['id'])), 200
        else:
            return ce("Error", "0x0010", "This is not ID"), 400
    except Exception as e:
        return ce("Error", "0x0011", str(e)), 400


def get_palette_by_tags(data):
    try:
        if data['tags'] and data['count'] and type(data['skip']) == int:
            return JSE.encode(PalettesDB().get_by_tags(data['tags'], data['count'], data['skip'])), 200
    except Exception as e:
        return ce("Error", "0x0012", str(e)), 400


def get_favorite_user_palettes(data):
    user = get_jwt_identity()
    palettes = UsersDB().favorite(user)
    if palettes is not None:
        return JSE.encode(PalettesDB().favorite(palettes)), 200
    else:
        return ce("Warning", "0x0013", "User doesn't have favorite palettes"), 400


def next_palettes_count():
    return int(PalettesDB().count()) + 1


def get_tags():
    return json.loads(JSE.encode(PalettesDB().tags())), 200


def search_from_tags(data):
    tag = data['tag']


def prepare_palette(data, file):
    data = json.loads(data['data'])
    result = crop_image(data, file)
    return json.dumps({'colors': result, 'image': read_image()}), 200


def save_palette_in_db(data):
    image_bytes = base64.b64decode(data['image_b64'])
    num = next_palettes_count()
    with open(f"{os.getenv('USERS_IMAGE_PATH')}/palette-{num}.webp", "wb") as f:
        f.write(image_bytes)

    user = get_jwt_identity()

    obj = {
        "pid": num,
        "name": f"Palette {num}",
        "src": f"palette-{num}.webp",
        "colors": data['colors'],
        "tags": data['tags'],
        "owner": data['username'],
        "date": datetime.now()
    }
    return JSE.encode(PalettesDB().create(obj)), 200


def get_random_palettes():
    pass


##############
# SERVICE
##############

def generate_password():
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for i in range(8))
    return password


def recovery_password(data):
    login = data['login']
    if check_exist_user(login) is not None:
        new_password = generate_password()
        subject = "Recovery password"
        message = f"Для аккаунта на сайте {os.getenv('BASE_URL')} было запрошего восстановление пароля. \n" \
                  f"Ваш новый пароль: {new_password} \n" \
                  f"\n Если вы этого не делали проигнорируйте письмо, \n" \
                  f"если вам часто приходят такие письма напишите пожалуйста администрации \n" \
                  f"через форму обратной связи: {os.getenv('BASE_URL')}/feedback или на почту admin@sntrk.ru"
        mail_sender(login, subject, message)
        return ce("Info", "0x0022", "Password changed"), 200
    else:
        return ce("Error", "0x0021", "User not found"), 400


def mail_sender(email, subject, message_text):
    server = smtplib.SMTP(mail_srv, mail_port)
    server.starttls()
    server.login(mail_user, mail_pass)

    msg = MIMEMultipart()
    msg['From'] = mail_user
    msg['To'] = email
    msg['Subject'] = subject
    message = message_text
    msg.attach(MIMEText(message))

    server.sendmail(mail_user, email, msg.as_string())

    server.quit()


def telegram_sender(text):
    token = os.getenv('TELEGRAM_BOT_TOKEN')
    chat_ids = os.getenv('TELEGRAM_CHATS_ID').split(',')
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    for chat_id in chat_ids:
        params = {'chat_id': chat_id, 'text': text}
        response = requests.post(url, data=params)
        return response


##############
# ADMIN
##############

def admin_get_users():
    # return JSE.encode(AdminUsers().user_list())
    return list(AdminUsers().user_list())


def admin_get_palettes():
    return AdminPalettes().palettes_list()


def admin_get_visitors(ip):
    if ip is not None:
        return UniqueVisits().sort_unique(ip).__reversed__()
    else:
        return UniqueVisits().get_unique().__reversed__()


def admin_delete_visitors(ip):
    return UniqueVisits().delete_unique(ip)


def admin_delete_user(uid):
    return UsersDB().delete(uid)


def admin_switch_ban_user(uid):
    return UsersDB().block(uid)


def admin_delete_palette(uid):
    return PalettesDB().delete(uid)


def params():
    return ":'######::'##::::'##:'##::: ##:'########:'########:::::'###:::::'######::'##:::'##: \n'##... ##: ##:::: ##: ###:: ##:... ##..:: ##.... ##:::'## ##:::'##... ##: ##::'##:: \n ##:::..:: ##:::: ##: ####: ##:::: ##:::: ##:::: ##::'##:. ##:: ##:::..:: ##:'##::: \n. ######:: ##:::: ##: ## ## ##:::: ##:::: ########::'##:::. ##: ##::::::: #####:::: \n:..... ##: ##:::: ##: ##. ####:::: ##:::: ##.. ##::: #########: ##::::::: ##. ##::: \n'##::: ##: ##:::: ##: ##:. ###:::: ##:::: ##::. ##:: ##.... ##: ##::: ##: ##:. ##:: \n. ######::. #######:: ##::. ##:::: ##:::: ##:::. ##: ##:::: ##:. ######:: ##::. ##: \n:......::::.......:::..::::..:::::..:::::..:::::..::..:::::..:::......:::..::::..:: "


def keep_unique(addr, ltime, path, head):
    obj = {
        "ip": addr,
        "date": ltime,
        "path": path,
        "header": str(head['User-Agent'])
    }
    UniqueVisits().add_unique(obj)


def get_ip(r):
    ip = r.headers.get('X-Real-IP')
    if ip is not None:
        ip = ip.split(",")[0]
    if ip is None:
        ip = r.remote_addr
    return ip


def check_ip(ip):
    ips = os.getenv("ALLOW_IPS").split(',')
    if ip in ips:
        return True
    else:
        return False

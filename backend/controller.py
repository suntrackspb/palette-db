import json
import base64
import os
import re
from datetime import datetime

from bson.objectid import ObjectId
from flask import jsonify

from database.db import UsersDB, PalettesDB
from flask_jwt_extended import set_access_cookies, create_access_token, get_jwt_identity

from error_handler import ce
from database.MongoJson import JSE
from converter.ImageFormater import crop_image, read_image

mail_pattern = r'^[a-z0-9]+[\._-]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
pass_pattern = r'^[a-z0-9]{32}$'
url_pattern = r'^(http:\/\/|https:\/\/)[a-z0-9\/\.\-\_]+$'
palette_pattern = r'^[a-z0-9]{24}$'


##############
# USERS
##############

def add_new_user(data):
    if check_exist_user(data['login']) is not None:
        return ce("Error", "0x0001", "User already register"), 400
    if not re.search(mail_pattern, data['login']):
        return ce("Error", "0x0002", "Check e-mail"), 400
    if not re.search(pass_pattern, data['password']):
        return ce("Error", "0x0003", "Check password"), 400

    data['uid'] = next_users_count()
    data['avatar'] = None
    data['create'] = datetime.now()
    data['favorite'] = []
    data['block'] = False
    print(data)
    return JSE.encode(UsersDB().create(data)), 200


def check_exist_user(login):
    return UsersDB().check({"login": login})


def next_users_count():
    return int(UsersDB().count()) + 1


def authorization(data):
    if data['login'] and data['password']:
        if re.search(mail_pattern, data['login']):
            db = UsersDB().auth(data)
            if db is None:
                return ce("Error", "0x0004", "Wrong username or password"), 400
            if db['login'] == data['login'] and db['password'] == data['password']:
                access_token = create_access_token(identity=data['login'])
                # response = ce("Info", "0x0005", "Login Successful")
                # set_access_cookies(response, access_token)
                response = jsonify({"msg": "login successful"})
                set_access_cookies(response, access_token)
                return response, 200
            else:
                ce("Error", "0x0006", "Wrong username or password"), 401
        else:
            return ce("Error", "0x0007", "Incorrect symbols password or username"), 401


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
    return JSE.encode(UsersDB().update_favorite(user, favorite))


#
# Required object properties
# uid, login, password, avatar, create, favorite
#
def update_user(data):
    user = get_jwt_identity()
    user_data = {
        "login": user,
        "password": data['password'],
        "avatar": data['avatar'],
        "create": data['create'],
        "favorite": [ObjectId(val) for val in data['favorite']],
        "block": data['block']
    }
    return user_data, 200
    # return UsersDB().update(user_data), 200


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


def prepare_palette(data, file):
    data = json.loads(data['data'])
    result = crop_image(data, file)
    return json.dumps({'colors': result, 'image': read_image()}), 200


def save_palette_in_db(data):
    image_bytes = base64.b64decode(data['image_b64'])
    num = next_palettes_count()
    with open(f"{os.getenv('USERS_IMAGE_PATH')}/palette-{num}.jpg", "wb") as f:
        f.write(image_bytes)

    user = get_jwt_identity()
    obj = {
        "pid": num,
        "name": f"Palette {num}",
        "src": f"palette-{num}.jpg",
        "colors": data['colors'],
        "tags": data['tags'],
        "owner": user,
        "date": datetime.now()
    }
    return JSE.encode(PalettesDB().create(obj)), 200

##############
# SERVICE
##############

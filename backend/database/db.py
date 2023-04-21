import os

from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv

load_dotenv()


def connect():
    conn = MongoClient(host=os.getenv("DB_HOST"),
                       port=int(os.getenv("DB_PORT")),
                       username=os.getenv("DB_USER"),
                       password=os.getenv("DB_PASS"),
                       authSource='admin', )
    db = conn.palettepicker
    return db


def to_url(data):
    for i in data:
        if i.get("owner") != 'host':
            baseurl = os.getenv("USERS_IMAGE_URL")
        else:
            baseurl = os.getenv("HOST_IMAGE_URL")
        name = i.get("src")
        i.update({"src": f"{baseurl}{name}"})
        # i.update({"name": f"{name.split('.')[0]}"})
    return data


class PalettesDB:
    def __init__(self):
        self.conn = connect().palettes

    def count(self):
        return self.conn.count_documents({})

    def get_list(self, count, skip):
        return to_url(list(self.conn.find({}, {
            "name": 1, "src": 1, "owner": 1
        }).sort("_id", -1).limit(count).skip(skip)))

    def favorite(self, data):
        return to_url(list(self.conn.find({"_id": {"$in": data}}, {
            "name": 1, "src": 1, "owner": 1
        }).sort("_id", -1)))

    def get_by_tags(self, tags, count, skip):
        return to_url(list(self.conn.find({"tags": {"$all": tags}}, {
            "name": 1, "src": 1, "owner": 1
        }).sort("_id", -1).limit(count).skip(skip)))

    def get_by_id(self, pid):
        return to_url(list(self.conn.find({"_id": ObjectId(pid)})))

    def create(self, data):
        return self.conn.insert_one(data).inserted_id

    def tags(self):
        return self.conn.distinct("tags")

    def delete(self, uid):
        self.conn.delete({"_id": ObjectId(uid)})


class UsersDB:
    def __init__(self):
        self.conn = connect().users

    def count(self):
        return self.conn.count_documents({})

    def create(self, user):
        return self.conn.insert_one(user).inserted_id

    def check(self, login):
        return self.conn.find_one(login)

    def auth(self, user):
        return self.conn.find_one(user, {"service_code": 0})

    def update(self, obj):
        return self.conn.update_one({"login": obj['login']}, {"$set": obj})

    def favorite(self, login):
        return self.conn.find({"login": login}, {"_id": 0, "favorite": 1})[0]['favorite']

    def update_favorite(self, login, favorite):
        return self.conn.update_one({"login": login}, {"$set": {"favorite": favorite}})

    def verify(self, uid):
        return list(self.conn.find({"_id": uid}, {"_id": 0, "verify": 1, "service_code": 1}))

    def update_verify(self, uid):
        self.conn.update_one({"_id": uid}, {"$set": {"service_code": False}})
        return self.conn.update_one({"_id": uid}, {"$set": {"verify": True}})

    def delete(self, uid):
        self.conn.delete_one({"_id": ObjectId(uid)})

    def update_avatar(self, login, avatar):
        return self.conn.update_one({"login": login}, {"$set": {"avatar": avatar}})

    def block(self, uid):
        self.conn.update_many({'_id': ObjectId(uid)}, [{'$set': {'block': {'$not': '$block'}}}])


class AdminPalettes:
    def __init__(self):
        self.conn = connect().palettes

    def palettes_list(self):
        data = to_url(list(self.conn.find({"owner": {"$ne": "host"}}, {
            "name": 1, "src": 1, "owner": 1
        }).sort("_id", -1).limit(50).skip(0)))
        return data


class AdminUsers:
    def __init__(self):
        self.conn = connect().users

    def user_list(self):
        return self.conn.find()


class UniqueVisits:
    def __init__(self):
        self.conn = connect().visits

    def check_unique(self, ip):
        return self.conn.find_one({"ip": ip})

    def add_unique(self, obj):
        return self.conn.insert_one(obj).inserted_id

    def get_unique(self):
        return list(self.conn.find())

    def sort_unique(self, ip):
        return list(self.conn.find({"ip": ip}))

    def delete_unique(self, ip):
        query = {"ip": ip}
        d = self.conn.delete_many(query)
        return d.deleted_count









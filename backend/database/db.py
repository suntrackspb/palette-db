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


class UsersDB:
    def __init__(self):
        self.db = connect().users
        self.conn = self.db

    def count(self):
        return self.conn.count_documents({})

    def create(self, user):
        return self.conn.insert_one(user).inserted_id

    def check(self, login):
        return self.conn.find_one(login)

    def auth(self, user):
        return self.conn.find_one(user)

    def update(self, obj):
        return self.conn.update_one({"login": obj['login']}, {"$set": obj})

    def favorite(self, login):
        return self.conn.find({"login": login}, {"_id": 0, "favorite": 1})[0]['favorite']

    def update_favorite(self, login, favorite):
        return self.conn.update_one({"login": login}, {"$set": {"favorite": favorite}})

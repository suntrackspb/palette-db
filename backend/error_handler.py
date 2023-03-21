import json

from flask import jsonify


def ce(status, code, text):
    obj = {
        "status": status,
        "code": code,
        "text": text,
    }
    print(json.dumps(obj))
    return jsonify(obj)

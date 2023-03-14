import json


def ce(status, code, text):
    obj = {
        "status": status,
        "code": code,
        "text": text,
    }
    print(json.dumps(obj))
    return json.dumps(obj)

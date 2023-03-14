import base64

import numpy as np
import cv2
import os
from collections import Counter
from sklearn.cluster import KMeans
from converter.img_settings import landscape_settings, portrait_settings
from dotenv import load_dotenv

load_dotenv()


def read_image():
    with open(f"{os.getenv('TEMP_PATH')}/temp.jpg", "rb") as f:
        pic = f.read()
    return base64.encodebytes(pic).decode('utf-8')


# START POINT
def crop_image(string, file):
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    img = cv2.resize(img, (string['realWidth'], string['realHeight']), interpolation=cv2.INTER_AREA)
    x = int(int(string['x']) * float(string['scale']))
    y = int(int(string['y']) * float(string['scale']))
    x1 = x + int(int(string['width']) * float(string['scale']))
    y1 = y + int(int(string['height']) * float(string['scale']))
    cropped_image = img[y:y1, x:x1]
    if string['width'] > string['height']:
        cropped_image = cv2.resize(cropped_image, (400, 265), interpolation=cv2.INTER_AREA)
        data = execute_color_run(cropped_image, landscape_settings)
    else:
        cropped_image = cv2.resize(cropped_image, (265, 400), interpolation=cv2.INTER_AREA)
        data = execute_color_run(cropped_image, portrait_settings)
    return data


def execute_color_run(image, settings):
    image_bgr = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    modified_image = preprocess(image_bgr)
    data = analyze(modified_image, image, settings)
    return data


def preprocess(raw):
    image = cv2.resize(raw, (400, 400), interpolation=cv2.INTER_AREA)
    image = image.reshape(image.shape[0]*image.shape[1], 3)
    return image


def rgb_to_hex(rgb_color):
    hex_color = "#"
    for i in rgb_color:
        hex_color += ("{:02x}".format(int(i)))
    return hex_color


def analyze(mod_img, original, settings):
    clf = KMeans(n_clusters=5)
    color_labels = clf.fit_predict(mod_img)
    center_colors = clf.cluster_centers_
    counts = Counter(color_labels)
    ordered_colors = [center_colors[i] for i in counts.keys()]
    hex_colors = [rgb_to_hex(ordered_colors[i]) for i in counts.keys()]
    vis = draw_color(ordered_colors, original, settings)
    filename = f"{os.getenv('TEMP_PATH')}/temp.jpg"
    cv2.imwrite(filename, vis)
    return hex_colors


def draw_color(colors, myimage, settings):
    sx, sy = settings['sx'], settings['sy']
    ex, ey = settings['ex'], settings['ey']
    axis = settings['axis']
    blank = np.ones((settings['y'], settings['x'], 3), dtype=np.uint8) * 255
    for i in colors:
        cv2.rectangle(blank, (sx, sy), (ex, ey), (int(i[0]), int(i[1]), int(i[2])), -1)
        # cv2.rectangle(blank, (sx, sy), (ex, ey), tuple(color), -1)
        if settings['axis'] == 0:
            sx, ex = ex + 10, ex + 10 + 72
        else:
            sy, ey = ey + 10, ey + 10 + 72

    blank = cv2.cvtColor(blank, cv2.COLOR_BGR2RGB)
    img = cv2.resize(myimage, (settings['ix'], settings['iy']), interpolation=cv2.INTER_AREA)
    img = cv2.cvtColor(img, cv2.COLOR_RGBA2RGB)
    # print(img)
    # print(blank)
    vis = np.concatenate((img, blank), axis=axis)

    return vis


# def crop_image(string, file):
#     img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
#     img = cv2.resize(img, (string['realWidth'], string['realHeight']), interpolation=cv2.INTER_AREA)
#     x, y, w, h = [int(float(string[key]) * float(string['scale'])) for key in ['x', 'y', 'width', 'height']]
#     cropped_image = img[y:y+h, x:x+w]
#     size = (400, 265) if string['width'] > string['height'] else (265, 400)
#     cropped_image = cv2.resize(cropped_image, size, interpolation=cv2.INTER_AREA)
#     settings = landscape_settings if string['width'] > string['height'] else portrait_settings
#     data = execute_color_run(cropped_image, settings, string['mime'])
#     return data

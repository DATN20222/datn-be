#!/usr/bin/env python
import base64
from cv2 import resize
import numpy as np
import pika
import sys
import os
import cv2
import json
from datetime import datetime
import time


url = os.environ.get("CLOUDAMQP_URL", "amqp://admin:admin@localhost:5672")
params = pika.URLParameters(url)
params.socket_timeout = 5
connection = pika.BlockingConnection(params)
channel = connection.channel()
# channel.exchange_declare(exchange='hello', exchange_type='topic')
channel.queue_declare(queue="q-3")
# f = open("img_200.jpg", "rb")
# i = f.read()
i = cv2.imread("img_200.jpg")
i = cv2.resize(i, (640, 480))
_, i = cv2.imencode(".jpeg", i)
i = i.tobytes()
start = time.time()
image_byte = base64.b64encode(i).decode("utf-8")
# image_array = np.frombuffer(base64.b64decode(image_byte))
# random_array = np.random.randn(224,)
# string_repr = base64.binascii.b2a_base64(random_array).decode("ascii")

# array = np.frombuffer(base64.binascii.a2b_base64(string_repr.encode("ascii")))
# array = array.reshape(224,)
# a = np.fromstring(x_string)
# print(array)
# a =  eval(x_string)
# print(a)


# print(i)
data = {
    "ip": "172.168.67.89",
    "image": str(image_byte),
    "type": 1,
}
# print(data)
message = json.dumps(data)
print(message.__len__())
for x in range(1):
    channel.basic_publish(exchange="", routing_key="hello", body=message)
    print(time.time() - start)

# connection.close()

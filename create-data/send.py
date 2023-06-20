#!/usr/bin/env python
import base64
import numpy as np
import pika
import sys
import os
import json
from datetime import datetime
import time


url = os.environ.get("CLOUDAMQP_URL", "amqp://admin:admin@localhost:5672")
params = pika.URLParameters(url)
params.socket_timeout = 5
connection = pika.BlockingConnection(params)
channel = connection.channel()
# channel.exchange_declare(exchange='hello', exchange_type='topic')
channel.queue_declare(queue="q-2")
f = open("img_200.jpg", "rb")

random_array = np.random.randn(
    224,
)
print(random_array)
string_repr = base64.binascii.b2a_base64(random_array).decode("ascii")

array = np.frombuffer(base64.binascii.a2b_base64(string_repr.encode("ascii")))
array = array.reshape(
    224,
)
print(array)
data = {
    "ip": "172.168.67.89",
    "vector": string_repr,
    "type": 2,
    "timeStamp": str(datetime.now()),
}
print(data)
message = json.dumps(data)
for x in range(100):
    channel.basic_publish(exchange="", routing_key="q-2", body=message)
    time.sleep(2)

# connection.close()

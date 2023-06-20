#!/usr/bin/env python
import base64
import numpy as np
import pika
import sys
import os
import json
from datetime import datetime
import time
from rb import send_feature


# time.sleep(0.2)
# url = os.environ.get("CLOUDAMQP_URL", "amqp://admin:admin@localhost:5672")
# params = pika.URLParameters(url)
# params.socket_timeout = 5
# connection = pika.BlockingConnection(params)
# channel = connection.channel()
# # channel.exchange_declare(exchange='hello', exchange_type='topic')
# channel.queue_declare(queue="q-2")


def test(channel):
    time.sleep(0.2)
    random_array = np.random.randn(
        224,
    )
    string_repr = base64.binascii.b2a_base64(random_array).decode("ascii")

    array = np.frombuffer(base64.binascii.a2b_base64(string_repr.encode("ascii")))
    array = array.reshape(
        224,
    )
    # a = np.fromstring(x_string)
    # print(array)
    # a =  eval(x_string)
    # print(a)
    # i = f.read()

    # print(i)
    data = {"vector": string_repr, "userId": 2, "type": 2, "ip": "172.168.67.89"}
    print(data)
    message = json.dumps(data)

    channel.basic_publish(exchange="", routing_key="q-2", body=message)
    # time.sleep(2)


# test(channel)
time.sleep(20)
send_feature({"shj": "dj"})
# connection.close()

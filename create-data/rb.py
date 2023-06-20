import base64
import numpy as np
import pika
import sys
import os
import json
from datetime import datetime
import time


# Create connection
print("Creating connection...")
url = os.environ.get(
    "CLOUDAMQP_URL", f"amqp://admin:admin@172.168.10.172:5672?heartbeat=900"
)
params = pika.URLParameters(
    url,
)
# params.socket_timeout = 5
connection = pika.BlockingConnection(params)
print(params.heartbeat)
channel = connection.channel()
channel.queue_declare(queue="q-3")
print("Connection established")

# print("sleep")
# time.sleep(10)
# print("off sleep")


def send_feature(tracked_objects, channel=channel):
    start_time = time.time()
    # url = os.environ.get("CLOUDAMQP_URL", f"amqp://admin:admin@{config.server_ip}:5672")
    # params = pika.URLParameters(url)
    # params.socket_timeout = 5
    # connection = pika.BlockingConnection(params)
    # channel = connection.channel()
    # channel.queue_declare(queue="q-2")
    for i in range(3):
        data = {
            "ip": "172.168.67.89",
            "userId": 9,
            "vector": "hbj",
            "type": 2,
        }
        message = json.dumps(data)
        channel.basic_publish(exchange="", routing_key="q-2", body=message)
    print("send features time", time.time() - start_time, "s")

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
string_repr = base64.binascii.b2a_base64(random_array).decode("ascii")
string_repr = "AECVPACgir8AYMNAAIBewABAZD4AgJM/AKAOQABgLUAAYB3AAKD7QAAgsMAAwJ9AAMCMwABA2b4AwJa/AKAmvgCgUr8AwERAAGCYwADAOkAA4Ne/AIBHwABgkUAAQLM/ACBMwABgyD8AQFvAAODQvQAAaz8AgPq/AECtvwCgh78AYDlAAIA/QABAsb4AgCm/AGCDvwDARr8AAFDAAEB1vwDgNEAA4Io/AGDnQABgg0AAwCbAAIBuQABgxD8A4JNAAIAqQAAAHr8AQLe/AOCRwAAAL8AA4IHAAMAmOwBATkAAoOC+ACAsQAAAfUAAgIA9AIBIQADAiz4AwL4/AKB7QADALEAAgBo/AEDuvwBgab8AYJZAAMCRQABAXj8AwEXAAABPvwBAWsAAgGPAAEAXQAAgAUAAgOu/ACB1vwAAFz8AQEHAACAowABgQcAAgIXAAIDSPgBAykAAIIm/AKDyPwDA+D8AQOI/AMA3PwDAu78AoNRAACAvwACgpD8AoIE9AEBSwADAw0AAQFm/AABBPwDATj8AAEc/AGASvwAgIEAAINU+AKAXQABghD8A4BrAAICKwACgokAAgDm/AMBGvwDgNkAAgIc+AKABQABA0r8A4FM/AMD5PQDAGkAA4Nc9AGD4vQCAikAAgLg/AICTwADg/b4AwNtAAKA4QAAgAUAAgMzAAKDQPwAgT0AA4J8/AKByvwDgCz8AoMS/AEAPQAAAEsAA4Ji/AMDRvgBg3D8A4NE/AOCNvwDA9r8AAB1AAIC8QADgVsAAgJm/AACNvwCA+T4AYCRAAOBBQADADcAA4CJAAOD1vwDAsUAAgMQ+AEC/vwBAF8AAANC+AIDYPwCAtMAAAMs9AGA0wACgPcAAwKw/AACFPwDgrT4AwMk/AMDTvwAgDcAAoJ3AAGBEQACgMT8AQGA+AICxPgDgBj4AQP89AEBpQADAskAA4F9AAEBEQAAAyz8AIDI+AACDvwDAwT8AwA0+AMByQAAgtj8AgIRAAGAuQACgsUAA4G6/AGDGvgAgsL8AwG2/AODTPwCgnkAA4Is/AKC0vwBgJz8AADa+AMBzPwDA078AAJ2/ACDcvwBgCMAAIOQ/AMDePwDg6b8AIH/AAEDGPwAABMAAYAXAAKAyQABgVEAA4CY/ACCkPwBgJcAAwKPAAMAmQACAGMAAQKU/AEDrvwBg1T4="
array = np.frombuffer(base64.binascii.a2b_base64(string_repr.encode("ascii")))
array = array.reshape(
    112,
)
# a = np.fromstring(x_string)
print(array)
# a =  eval(x_string)
# print(a)
# i = f.read()

# print(i)
data = {
    "vector": string_repr,
    "code": 2,
    "type": 3,
    "timeStamp": str(datetime.now()),
}
# print(data)
message = json.dumps(data)
# for x in range(100):
#     channel.basic_publish(exchange="", routing_key="q-2", body=message)
#     time.sleep(2)

# connection.close()

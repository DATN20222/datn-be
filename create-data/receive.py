import pika, sys, os, json


def main():
    url = os.environ.get("CLOUDAMQP_URL", "amqp://admin:admin@localhost:5672")
    params = pika.URLParameters(url)
    params.socket_timeout = 5
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    # channel.exchange_declare(exchange='hello', exchange_type='topic')
    channel.queue_declare(queue="q-2")

    def callback(ch, method, properties, body):
        data = json.loads(body)
        print(data)

    channel.basic_consume(queue="q-2", on_message_callback=callback, auto_ack=True)

    print(" [*] Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Interrupted")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)

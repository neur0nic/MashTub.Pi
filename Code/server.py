from flask import Flask, render_template, request

from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop

import random
import json
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_temperature')
def get_temperature():
    return str(random.randint(1, 100)) + ' &deg;C'

@app.route('/set_temperature', methods=['POST'])
def set_temperature():
    temp = request.form['temperature']
    return json.dumps({'temp': temp})

if __name__ == "__main__":
    #app.run()
    http_server = HTTPServer(WSGIContainer(app))
    http_server.listen(5000)
    IOLoop.instance().start()

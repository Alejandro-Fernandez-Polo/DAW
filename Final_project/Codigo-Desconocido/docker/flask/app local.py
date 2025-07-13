import json
from flask import Flask, request, Response, render_template, redirect, url_for
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, OperationFailure
from bson import ObjectId

app = Flask(__name__)

class ConnectionMongoDB2:
    def __init__(self, data):
        self.server     = data['server']
        self.port       = data['port']
        self.username   = data['username']
        self.password   = data['password']
        
    def getDB(self):
        mongoClient = MongoClient("mongodb+srv://" + str(self.username) + ":" + str(self.password) + "@" + str(self.server))

        try:
            if mongoClient.admin.command('ismaster')['ismaster']:
                return mongoClient['codigodesconocido']
        except OperationFailure:
            return None
        except ServerSelectionTimeoutError:
            return None

data = {
    "server":   "cluster0.fksupeq.mongodb.net/",
    "port":     '27017',
    "username": "aferpol1711",
    "password": "alexd17",
}
db = ConnectionMongoDB2(data).getDB()

@app.route('/clients')
def get_clients():
    clients = list(db.clients.find())
    for client in clients:
        client['_id'] = str(client['_id'])
    return render_template('clients.html', clients=clients)

@app.route('/clients/new', methods=['GET', 'POST'])
def create_client():
    if request.method == 'POST':
        data = request.form.to_dict()
        db.clients.insert_one(data)
        return redirect(url_for('get_clients'))
    return render_template('create_client.html')

@app.route('/clients/<id>/edit', methods=['GET', 'POST'])
def update_client(id):
    client = db.clients.find_one({"_id": ObjectId(id)})
    if request.method == 'POST':
        data = request.form.to_dict()
        db.clients.update_one({"_id": ObjectId(id)}, {"$set": data})
        return redirect(url_for('get_clients'))
    client['_id'] = str(client['_id'])
    return render_template('update_client.html', client=client)

@app.route('/clients/<id>/delete', methods=['POST'])
def delete_client(id):
    db.clients.delete_one({"_id": ObjectId(id)})
    return redirect(url_for('get_clients'))

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

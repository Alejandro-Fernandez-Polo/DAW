import json, logging
from flask import Flask, request, jsonify, Response
from flask_restx import Api, Resource, fields
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, OperationFailure
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)

# Configuración de CORS para permitir todos los orígenes
CORS(app)

api = Api(app, version='1.0', title='CodigoDesconocido API',
          description='API to manage clients, escape rooms, and bookings',
          )

# Agregar encabezados CORS a todas las respuestas
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Manejador de solicitud OPTIONS para todas las rutas
@app.route('/<path:path>', methods=['OPTIONS'])
def handle_options(path):
    response = jsonify({'status': 'ok'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

ns_clients = api.namespace('clients', description='Operations related to clients')
ns_escaperooms = api.namespace('escaperooms', description='Operations related to escape rooms')
ns_bookings = api.namespace('bookings', description='Operations related to bookings')

client_model = ns_clients.model('Client', {
    '_id': fields.String(description='The client ID'),
    'name': fields.String(required=True, description='The client name'),
    'email': fields.String(required=True, description='The client email'),
    'role': fields.String(required=True, description='The client role', enum=['User', 'Admin']),
    'description': fields.String(required=True, description='The client description'),
    'avatar': fields.String(description='The client avatar'),
    'friends': fields.List(fields.String, description='List of friend IDs')
})

escaperoom_model = api.model('EscapeRoom', {
    '_id': fields.String(description='The scaperooom ID'),
    'name': fields.String(required=True, description='The escape room name'),
    'description': fields.String(required=True, description='The escape room description'),
    'schedules': fields.List(fields.String, description='List of available schedules'),
    'open_days': fields.List(fields.String, description='List of open days'),
    'price': fields.Float(description='The price of the escape room'),
    'min_players': fields.Integer(description='The minimum number of players'),
    'max_players': fields.Integer(description='The maximum number of players'),
    'difficulty': fields.String(enum=['advanced', 'easy', 'intermediate'], description='The difficulty level of the escape room'),
    'photo': fields.Raw(description='Binary data of the escape room photo')
})

booking_model = api.model('Booking', {
    '_id': fields.String(description='The bookings ID'),
    'id_user': fields.String(required=True, description='The user ID'),
    'id_escaperoom': fields.String(required=True, description='The escape room ID'),
    'date': fields.String(required=True, description='The booking date'),
    'hour': fields.String(required=True, description='The booking hour')
})

class ConnectionMongoDB:
    def __init__(self, data):
        self.server     = data['server']
        self.port       = data['port']
        self.username   = data['username']
        self.password   = data['password']
        self.db         = data['db']
        
    def getDB(self):
        mongoClient = MongoClient("mongodb://" + str(self.username) + ":" + str(self.password) + "@" + str(self.server) + ":" + str(self.port) + "/?authMechanism=DEFAULT&authSource=" + str(self.db), serverSelectionTimeoutMS=500)
        try:
            if mongoClient.admin.command('ismaster')['ismaster']:
                print("Connected to the MongoDB server")
                return (mongoClient[self.db], None)
        except OperationFailure as e:
            print(f"OperationFailure: {e}")
            return (None, f"OperationFailure: {e}")
        except ServerSelectionTimeoutError as e:
            print(f"ServerSelectionTimeoutError: {e}")
            return (None, f"ServerSelectionTimeoutError: {e}")
        except Exception as e:
            print(f"Unexpected error: {e}")
            return (None, f"Unexpected error: {e}")

data = {
    "server":   "cs_mongodb",
    "port":     '27017',
    "username": "User",
    "password": "Admin",
    "db":       "codigodesconocido"
}

db, error = ConnectionMongoDB(data).getDB()

api.add_namespace(ns_clients, path='/clients')
@ns_clients.route('/')
class ClientList(Resource):
    @ns_clients.doc('list_clients')
    @ns_clients.marshal_list_with(client_model)
    def get(self):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        
        try:
            clients = list(db.clients.find())
            for client in clients:
                friends_ids = client.get('friends', [])
                friends = []  # Inicializa la lista de amigos
                for fid in friends_ids:
                    try:
                        # Verifica que fid sea un ObjectId válido antes de usarlo
                        if ObjectId.is_valid(fid):
                            friend = db.clients.find_one({"_id": ObjectId(fid)})
                            if friend:
                                friend['_id'] = str(friend['_id'])
                                friends.append(friend['name'])  # Agrega el ID del amigo a la lista
                            else:
                                logging.warning(f"No friend found with id {fid}")
                        else:
                            logging.warning(f"Invalid ObjectId: {fid}")
                    except Exception as e:
                        logging.error(f"Error retrieving friend with id {fid}: {e}")
                        continue  # Si hay un error, simplemente no agregar el amigo
                client['friends'] = friends
                client['_id'] = str(client['_id'])
            return clients, 200
        except Exception as e:
            logging.error(f"Exception: {e}")
            api.abort(500, f"An error occurred while retrieving clients: {str(e)}")


    @ns_clients.doc('create_client')
    @ns_clients.expect(client_model)
    @ns_clients.marshal_with(client_model, code=201)
    def post(self):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        data = request.json
        db.clients.insert_one(data)
        return data, 201

@ns_clients.route('/<id>')
@ns_clients.response(404, 'Client not found')
@ns_clients.param('id', 'The client identifier')
class Client(Resource):
    @ns_clients.doc('get_client')
    @ns_clients.marshal_with(client_model)
    def get(self, id):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        client = db.clients.find_one({"_id": ObjectId(id)})
        if client:
            client['_id'] = str(client['_id'])
            return client, 200
        else:
            api.abort(404, "Client not found")

    @ns_clients.doc('update_client')
    @ns_clients.expect(client_model)
    @ns_clients.marshal_with(client_model)
    def put(self, id):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        data = request.json
        result = db.clients.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.matched_count > 0:
            return data, 200
        else:
            api.abort(404, "Client not found")

    @ns_clients.doc('delete_client')
    @ns_clients.response(204, 'Client deleted')
    def delete(self, id):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        result = db.clients.delete_one({"_id": ObjectId(id)})
        if result.deleted_count > 0:
            return '', 204
        else:
            api.abort(404, "Client not found")
            
# Definición del nuevo recurso para la lista de amigos
@ns_clients.route('/<id>/friends')
@ns_clients.response(404, 'Client not found')
@ns_clients.param('id', 'The client identifier')
class ClientFriends(Resource):
    @ns_clients.doc('get_client_friends')
    @ns_clients.marshal_list_with(client_model)
    def get(self, id):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        client = db.clients.find_one({"_id": ObjectId(id)})
        if client:
            friends_ids = client.get('friends', [])
            friends = []  # Inicializa la lista de amigos
            for fid in friends_ids:
                friend = db.clients.find_one({"_id": ObjectId(fid)})
                if friend:
                    friend['_id'] = str(friend['_id'])
                    friends.append(friend)  # Agrega el amigo a la lista
            return friends, 200
        else:
            api.abort(404, "Client not found")
            
# Rutas para 'clients'
@ns_clients.route('/name/<string:name>')
@ns_clients.doc(params={'name': 'The name of the client'})
class ClientByNameResource(Resource):
    @ns_clients.doc('get_client_by_name')
    @ns_clients.marshal_with(client_model)
    def get(self, name):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        client = db.clients.find_one({'name': name})
        if not client:
            api.abort(404, f"Client with name {name} not found")
        return client

@ns_clients.route('/email/<string:email>')
@ns_clients.doc(params={'email': 'The email of the client'})
class ClientByEmailResource(Resource):
    @ns_clients.doc('get_client_by_email')
    @ns_clients.marshal_with(client_model)
    def get(self, email):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        client = db.clients.find_one({'email': email})
        if not client:
            api.abort(404, f"Client with email {email} not found")
        return client


# Rutas para 'escaperooms'
@ns_escaperooms.route('/')
class EscapeRoomList(Resource):
    @ns_escaperooms.doc('list_escaperooms')
    @ns_escaperooms.marshal_list_with(escaperoom_model)
    def get(self):
        if db is None:
            api.abort(500, "Failed to connect to the database")

        # Obtener todos los documentos de la colección
        escaperooms = list(db.escaperooms.find())
        for escaperoom in escaperooms:
            escaperoom['_id'] = str(escaperoom['_id'])

        # Devolver la lista de escape rooms
        return escaperooms, 200

    @ns_escaperooms.doc('create_escaperoom')
    @ns_escaperooms.expect(escaperoom_model)
    @ns_escaperooms.marshal_with(escaperoom_model, code=201)
    def post(self):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        data = request.json
        db.escaperooms.insert_one(data)
        return data, 201

@ns_escaperooms.route('/<id>')
@ns_escaperooms.response(404, 'Escape room not found')
@ns_escaperooms.param('id', 'The escape room identifier')
class EscapeRoom(Resource):
    @ns_escaperooms.doc('get_escaperoom')
    @ns_escaperooms.marshal_with(escaperoom_model)
    def get(self, id):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        escaperoom = db.escaperooms.find_one({"_id": ObjectId(id)})
        if escaperoom:
            escaperoom['_id'] = str(escaperoom['_id'])
            return escaperoom, 200
        else:
            api.abort(404, "Escape room not found")

    @ns_escaperooms.doc('update_escaperoom')
    @ns_escaperooms.expect(escaperoom_model)
    @ns_escaperooms.marshal_with(escaperoom_model)
    def put(self, id):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        data = request.json
        result = db.escaperooms.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.matched_count > 0:
            return data, 200
        else:
            api.abort(404, "Escape room not found")

    @ns_escaperooms.doc('delete_escaperoom')
    @ns_escaperooms.response(204, 'Escape room deleted')
    def delete(self, id):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        result = db.escaperooms.delete_one({"_id": ObjectId(id)})
        if result.deleted_count > 0:
            return '', 204
        else:
            api.abort(404, "Escape room not found")

# Rutas para 'bookings'
@ns_bookings.route('/')
class BookingList(Resource):
    @ns_bookings.doc('list_bookings')
    @ns_bookings.marshal_list_with(booking_model)
    def get(self):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        bookings = list(db.bookings.find())
        for booking in bookings:
            booking['_id'] = str(booking['_id'])
        return bookings, 200

    @ns_bookings.doc('create_booking')
    @ns_bookings.expect(booking_model)
    @ns_bookings.marshal_with(booking_model, code=201)
    def post(self):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        data = request.json
        db.bookings.insert_one(data)
        return data, 201

@ns_bookings.route('/<id>')
@ns_bookings.response(404, 'Booking not found')
@ns_bookings.param('id', 'The booking identifier')
class Booking(Resource):
    @ns_bookings.doc('get_booking')
    @ns_bookings.marshal_with(booking_model)
    def get(self, id):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        booking = db.bookings.find_one({"_id": ObjectId(id)})
        if booking:
            booking['_id'] = str(booking['_id'])
            return booking, 200
        else:
            api.abort(404, "Booking not found")

    @ns_bookings.doc('update_booking')
    @ns_bookings.expect(booking_model)
    @ns_bookings.marshal_with(booking_model)
    def put(self, id):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        data = request.json
        result = db.bookings.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.matched_count > 0:
            return data, 200
        else:
            api.abort(404, "Booking not found")

    @ns_bookings.doc('delete_booking')
    @ns_bookings.response(204, 'Booking deleted')
    def delete(self, id):
        if db is None:
            api.abort(500, "Failed to connect to the database")
        result = db.bookings.delete_one({"_id": ObjectId(id)})
        if result.deleted_count > 0:
            return '', 204
        else:
            api.abort(404, "Booking not found")

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
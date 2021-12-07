from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb://localhost/pythonDucks"
mongo = PyMongo(app)

CORS(app)
db = mongo.db.users

@app.route('/users', methods=['POST'])
def createUser():
    id = db.insert({
        'nombre': request.json['nombre'],
        'correo': request.json['correo'],
        'foto': request.json['foto'],
        'xd': request.json["mascotas"]
    })
    return jsonify(str(ObjectId(id)))


@app.route('/users', methods=["GET"])
def getUsers():
    users = []
    for doc in db.find():
        print(doc)
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'nombre': doc['nombre'],
            'correo': doc['correo'],
            'foto': doc['foto'],
            'mascotas': doc["mascotas"]
        })
    return jsonify(users)


@app.route('/user/<id>', methods=["GET"])
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)})
    print(user)
    return jsonify({
        '_id': str(ObjectId(user['_id'])),
        'nombre': user['nombre'],
        'correo': user['correo'],
        'foto': user['foto'],
        "mascotas":user["mascotas"]
    })


@app.route('/users/<id>', methods=["DELETE"])
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})
    return 'Eliminado'


@app.route('/users/<id>', methods=["PUT"])
def updateUser(id):
    print(id)
    print(request.json)
    db.update_one({'_id': ObjectId(id)}, {
        '$set': {
            "nombre": request.json['nombre'],
            "correo": request.json['correo'],
            "foto": request.json['foto'],
            "mascotas":request.json["mascotas"]
        }
    })
    return "Actualizado"


if __name__ == "__main__":
    app.run(debug=True)

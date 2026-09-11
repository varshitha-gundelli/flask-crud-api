from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_URL')
db = SQLAlchemy(app)

# ====================
# MODELS
# ====================

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def json(self):
        return {'id': self.id, 'username': self.username, 'email': self.email}


class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)

    def json(self):
        return {'id': self.id, 'name': self.name, 'price': self.price}


db.create_all()

# ====================
# TEST ROUTE
# ====================

@app.route('/test', methods=['GET'])
def test():
    return make_response(jsonify({'message': 'test route'}), 200)

# ====================
# USER ENDPOINTS
# ====================

@app.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        new_user = User(username=data['username'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return make_response(jsonify({'message': 'user created'}), 201)
    except Exception:
        return make_response(jsonify({'message': 'error creating user'}), 500)

@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return make_response(jsonify([user.json() for user in users]), 200)
    except Exception:
        return make_response(jsonify({'message': 'error getting users'}), 500)

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(jsonify({'user': user.json()}), 200)
        return make_response(jsonify({'message': 'user not found'}), 404)
    except Exception:
        return make_response(jsonify({'message': 'error getting user'}), 500)

@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            data = request.get_json()
            user.username = data['username']
            user.email = data['email']
            db.session.commit()
            return make_response(jsonify({'message': 'user updated'}), 200)
        return make_response(jsonify({'message': 'user not found'}), 404)
    except Exception:
        return make_response(jsonify({'message': 'error updating user'}), 500)

@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response(jsonify({'message': 'user deleted'}), 200)
        return make_response(jsonify({'message': 'user not found'}), 404)
    except Exception:
        return make_response(jsonify({'message': 'error deleting user'}), 500)

# ====================
# PRODUCT ENDPOINTS
# ====================

@app.route('/products', methods=['POST'])
def create_product():
    try:
        data = request.get_json()
        new_product = Product(name=data['name'], price=data['price'])
        db.session.add(new_product)
        db.session.commit()
        return make_response(jsonify({'message': 'product created'}), 201)
    except Exception:
        return make_response(jsonify({'message': 'error creating product'}), 500)

@app.route('/products', methods=['GET'])
def get_products():
    try:
        products = Product.query.all()
        return make_response(jsonify([product.json() for product in products]), 200)
    except Exception:
        return make_response(jsonify({'message': 'error getting products'}), 500)

@app.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    try:
        product = Product.query.filter_by(id=id).first()
        if product:
            return make_response(jsonify({'product': product.json()}), 200)
        return make_response(jsonify({'message': 'product not found'}), 404)
    except Exception:
        return make_response(jsonify({'message': 'error getting product'}), 500)

@app.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    try:
        product = Product.query.filter_by(id=id).first()
        if product:
            data = request.get_json()
            product.name = data['name']
            product.price = data['price']
            db.session.commit()
            return make_response(jsonify({'message': 'product updated'}), 200)
        return make_response(jsonify({'message': 'product not found'}), 404)
    except Exception:
        return make_response(jsonify({'message': 'error updating product'}), 500)

@app.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    try:
        product = Product.query.filter_by(id=id).first()
        if product:
            db.session.delete(product)
            db.session.commit()
            return make_response(jsonify({'message': 'product deleted'}), 200)
        return make_response(jsonify({'message': 'product not found'}), 404)
    except Exception:
        return make_response(jsonify({'message': 'error deleting product'}), 500)
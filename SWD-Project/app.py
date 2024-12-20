from flask import Flask, jsonify, render_template, request, redirect, url_for, flash, session
from flask_mail import Mail, Message
import pyodbc
from werkzeug.security import generate_password_hash, check_password_hash
import os
import secrets
from flask_cors import CORS 
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
app.secret_key = 'A4M'  # Change this to a strong secret key


serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])  # Correct placement
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'market.hub288@gmail.com'  # Your Gmail address
app.config['MAIL_PASSWORD'] = 'yckt czhn mgcq yrbm'  # The App Password you generated
app.config['MAIL_DEFAULT_SENDER'] = 'market.hub288@gmail.com'  # Your Gmail address used for sending

mail = Mail(app)

# Database connection setup
server = 'AMEENS-LAPTOP'
database = 'ecommerce_platform'
conn_str = f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes;'

def get_db_connection():
    """Establishes a connection to the database."""
    try:
        conn = pyodbc.connect(conn_str)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None



@app.route('/api/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        # Collect form data from request JSON
        username = request.json.get('username')
        email = request.json.get('email')
        password = request.json.get('password')
        address = request.json.get('address')
        phone_number = request.json.get('phoneNumber')  # matching the React frontend payload
        role = request.json.get('role')

        # Server-side validation (basic checks)
        if not username or not email or not password or not address or not phone_number or not role:
            return jsonify({"error": "All fields are required."}), 400
        
        # Hash the password securely
        hashed_password = generate_password_hash(password)

        # Connect to the database and insert data into User table
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed."}), 500
        
        cursor = conn.cursor()

        # Prepare the SQL insert query
        query = """
        INSERT INTO [User] (username, email, password, address, phone_number, role)
        VALUES (?, ?, ?, ?, ?, ?)
        """
        
        try:
            cursor.execute(query, (username, email, hashed_password, address, phone_number, role))
            conn.commit()  # Commit the transaction
            return jsonify({"message": "Sign up successful!"}), 201
        except Exception as e:
            print(f"SQL Error: {e}")
            return jsonify({"error": f"An error occurred during sign up: {e}"}), 500
        finally:
            conn.close()


@app.route('/api/login', methods=['POST'])
def login():
    """Handles the login process."""
    if request.method == 'POST':
        data = request.get_json()  # Parse JSON request
        email = data.get('email')
        password = data.get('password')

        # Connect to the database and verify user
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed. Please try again later."}), 500
        
        cursor = conn.cursor()

        # Query to fetch user based on email
        query = "SELECT id, password FROM [User] WHERE email = ?"
        
        try:
            cursor.execute(query, (email,))
            user = cursor.fetchone()
            if user and check_password_hash(user[1], password):
                session['user_id'] = user[0]  # Save user ID in session
                return jsonify({"message": "Login successful!"}), 200  # Respond with success message
            else:
                return jsonify({"error": "Invalid email or password."}), 401
        except Exception as e:
            print(f"SQL Error: {e}")
            return jsonify({"error": f"Error: {e}"}), 500
        finally:
            conn.close()
    return render_template('login.html')

from flask import Flask, jsonify



@app.route('/api/products')
def get_products():
    conn = get_db_connection()  # Assuming you have this function to connect to your database
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT * FROM [Product]")  # Fetch all columns from the Product table
        products = cursor.fetchall()

        product_list = []
        for product in products:
            product_list.append({
                'id': product[0],
                'seller_id': product[1],
                'name': product[2],
                'description': product[3],
                'price': product[4],
                'category_id': product[5]
            })

        return jsonify(product_list)

    except Exception as e:
        print(f"Error fetching products: {e}")
        return jsonify({'error': 'Failed to fetch products'}), 500
    finally:
        cursor.close()
        conn.close()
@app.route('/cart', methods=['GET'])
def cart():
    """Fetches the user's cart."""
    if 'user_id' not in session:
        return jsonify({'error': 'Please log in to view your cart.'}), 401
    
    # Ensure cart exists and is initialized as an empty list if not present
    if 'cart' not in session:
        session['cart'] = []
    
    # Calculate total
    total = sum(item['price'] * item['quantity'] for item in session['cart'])
    
    return jsonify({'cart': session['cart'], 'total': total})

@app.route('/add_to_cart/<int:product_id>', methods=['POST'])
def add_to_cart(product_id):
    """Adds a product to the user's cart."""
    if 'user_id' not in session:
        return jsonify({'error': 'Please log in to add items to cart.'}), 401
    
    # Get product details from the database
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed. Please try again later.'}), 500
    
    cursor = conn.cursor()
    query = "SELECT id, name, price FROM Product WHERE id = ?"
    cursor.execute(query, (product_id,))
    product = cursor.fetchone()

    if product:
        # Initialize cart in session if it doesn't exist
        if 'cart' not in session:
            session['cart'] = []

        # Check if product is already in cart
        cart_item = {
            'id': product[0],
            'name': product[1],
            'price': float(product[2]),
            'quantity': int(request.form.get('quantity', 1))
        }

        # Add to cart if not already present
        if not any(item['id'] == product_id for item in session['cart']):
            session['cart'].append(cart_item)
            session.modified = True
            return jsonify({'message': f'{product[1]} added to cart!'}), 200
        else:
            for item in session['cart']:
                if item['id'] == product_id:
                    item['quantity'] = int(request.form.get('quantity', 1))
                    session.modified = True
                    return jsonify({'message': f'Quantity of {product[1]} updated in cart.'}), 200
    else:
        return jsonify({'error': 'Product not found.'}), 404

@app.route('/remove_from_cart/<int:product_id>', methods=['POST'])
def remove_from_cart(product_id):
    """Removes a product from the user's cart."""
    if 'user_id' not in session:
        return jsonify({'error': 'Please log in to modify your cart.'}), 401
    
    if 'cart' in session:
        session['cart'] = [item for item in session['cart'] if item['id'] != product_id]
        session.modified = True
        return jsonify({'message': 'Product removed from cart.'}), 200
    
    return jsonify({'error': 'Product not found in cart.'}), 404



from werkzeug.security import check_password_hash

from flask import jsonify

from flask import jsonify

@app.route('/api/profile', methods=['POST', 'PUT'])
def get_profile():
    """Fetches or updates the user's profile data."""

    try:
        if request.method == 'POST':
            data = request.json
            if not data:
                return jsonify({'error': 'No JSON body received'}), 400

            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return jsonify({'error': 'Username and password are required'}), 400

            conn = get_db_connection()
            cursor = conn.cursor()
            query = "SELECT * FROM [User] WHERE username = ?"
            cursor.execute(query, (username,))
            user = cursor.fetchone()
            conn.close()

            if not user:
                return jsonify({'error': 'User not found'}), 404

            if not check_password_hash(user[3], password):
                return jsonify({'error': 'Invalid password'}), 401

            # Create a dictionary with column names as keys, EXCLUDING the password
            column_names = ["id", "username", "email", "address", "phone_number", "role", "reset_token"]
            user_data = dict(zip(column_names, user[:3] + user[4:]))

            return jsonify(user_data)

        elif request.method == 'PUT':
            data = request.get_json()
            if not data:
                return jsonify({'error': 'No JSON body received'}), 400

            # Get the user's ID from the session
            user_id = session.get('user_id')
            if not user_id:
                return jsonify({'error': 'User not logged in'}), 401  # Return 401 Unauthorized

            # Extract updated profile data
            username = data.get('username')
            email = data.get('email')
            phone_number = data.get('phone_number')
            address = data.get('address')

            # Update the user's profile in the database
            conn = get_db_connection()
            cursor = conn.cursor()
            query = """
                UPDATE [User] 
                SET username = ?, email = ?, phone_number = ?, address = ?
                WHERE id = ?
            """
            cursor.execute(query, (username, email, phone_number, address, user_id))
            conn.commit()
            conn.close()

            return jsonify({'message': 'Profile updated successfully'}), 200

    except Exception as e:
        print(f"Error in get_profile: {e}")
        return jsonify({'error': str(e)}), 500
@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    """Handles password reset requests."""
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No JSON body received'}), 400

        email = data.get('email')
        if not email:
            return jsonify({'error': 'Email is required'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM [User] WHERE email = ?", (email,))
        user = cursor.fetchone()

        if user:
        # Generate a token
            token = serializer.dumps(email, salt='reset-password-salt')

            # Store the token in the database (replace with your actual database update logic)
            cursor.execute("UPDATE [User] SET reset_token = ? WHERE email = ?", (token, email))
            conn.commit()
            conn.close()

            # Send password reset email
            msg = Message("Password Reset Request", recipients=[email])
            reset_link = url_for('reset_password_route', token=token, _external=True)  # Updated route name here
            msg.body = f"To reset your password, please click on the following link: {reset_link}"
            mail.send(msg)

            return jsonify({'message': 'Password reset email sent'}), 200
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        print(f"Error in forgot_password: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/reset-password/<token>', methods=['GET', 'POST'])
def reset_password_route(token):
    """Handles password reset using a token."""
    try:
        if request.method == 'POST':
            data = request.get_json(force=True)  # Try using force=True here
            if not data:
                return jsonify({'error': 'No JSON body received'}), 400

            new_password = data.get('password')
            if not new_password:
                return jsonify({'error': 'Password is required'}), 400

            # Verify the token (it will raise an exception if invalid or expired)
            try:
                email = serializer.loads(token, salt='reset-password-salt', max_age=1800)  # 30 minutes
            except SignatureExpired:
                return jsonify({'error': 'Token has expired'}), 400
            except BadSignature:
                return jsonify({'error': 'Invalid token'}), 400

            conn = get_db_connection()
            cursor = conn.cursor()

            # Update the user's password in the database
            hashed_password = generate_password_hash(new_password)
            cursor.execute("UPDATE [User] SET password = ?, reset_token = NULL WHERE email = ?", (hashed_password, email))
            conn.commit()
            conn.close()

            return jsonify({'message': 'Password has been reset successfully'}), 200

        else:  # GET request
            # Render a form for the user to enter their new password
            return render_template('reset_password.html', token=token)  # Pass the token to the template

    except Exception as e:
        print(f"Error in reset_password_route: {e}")
        return jsonify({'error': str(e)}), 500
if __name__ == "__main__":
    app.run(debug=True)
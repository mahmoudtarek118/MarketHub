from flask import Flask, render_template, request, redirect, url_for, flash, session
import pyodbc
from werkzeug.security import generate_password_hash, check_password_hash  # To hash and verify passwords

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Database connection setup
server = '(localdb)\Local'  # Replace with your actual server name
database = 'ecommerce_platform'  # Replace with your actual database name
conn_str = f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes;'

def get_db_connection():
    """Establishes a connection to the database."""
    try:
        conn = pyodbc.connect(conn_str)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

@app.route('/', methods=['GET'])
def home():
    """Displays the homepage with options to log in or sign up."""
    return render_template('home.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    """Handles the signup process."""
    if request.method == 'POST':
        # Collect form data
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        address = request.form['address']
        phone_number = request.form['phone_number']
        role = request.form['role']  # Assuming role is part of the form

        # Hash the password securely
        hashed_password = generate_password_hash(password)

        # Connect to the database and insert data into User table
        conn = get_db_connection()
        if conn is None:
            flash("Database connection failed. Please try again later.", 'danger')
            return redirect(url_for('signup'))
        
        cursor = conn.cursor()

        # Prepare the SQL insert query
        query = """
        INSERT INTO [User] (username, email, password, address, phone_number, role)
        VALUES (?, ?, ?, ?, ?, ?)
        """
        
        try:
            # Execute the query with form data
            cursor.execute(query, (username, email, hashed_password, address, phone_number, role))
            conn.commit()  # Commit the transaction
            flash('Sign up successful! You can now log in.', 'success')
            return redirect(url_for('signup'))  # Redirect back to the signup page after successful sign-up
        except Exception as e:
            print(f"SQL Error: {e}")  # Log error to console
            flash(f"Error: {e}", 'danger')  # Flash any error if something goes wrong
        finally:
            conn.close()  # Always close the connection after use

    return render_template('signup.html')  # Ensure signup form is shown initially

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Handles the login process."""
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        # Connect to the database and verify user
        conn = get_db_connection()
        if conn is None:
            flash("Database connection failed. Please try again later.", 'danger')
            return redirect(url_for('login'))
        
        cursor = conn.cursor()

        # Query to fetch user based on email
        query = "SELECT id, password FROM [User] WHERE email = ?"
        
        try:
            cursor.execute(query, (email,))
            user = cursor.fetchone()
            if user and check_password_hash(user[1], password):
                session['user_id'] = user[0]  # Save user ID in session
                flash('Login successful!', 'success')
                return redirect(url_for('profile'))
            else:
                flash('Invalid email or password.', 'danger')
        except Exception as e:
            print(f"SQL Error: {e}")
            flash(f"Error: {e}", 'danger')
        finally:
            conn.close()
    
    return render_template('login.html')  # Show login page

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    """Handles viewing and updating user profile."""
    if request.method == 'POST':
        # Update user data
        username = request.form['username']
        email = request.form['email']
        address = request.form['address']
        phone_number = request.form['phone_number']

        # Connect to the database and update user data
        conn = get_db_connection()
        if conn is None:
            flash("Database connection failed. Please try again later.", 'danger')
            return redirect(url_for('profile'))
        
        cursor = conn.cursor()

        # Update query
        query = """
        UPDATE [User]
        SET username = ?, email = ?, address = ?, phone_number = ?
        WHERE id = ?
        """
        
        try:
            cursor.execute(query, (username, email, address, phone_number, session['user_id']))
            conn.commit()
            flash('Profile updated successfully!', 'success')
        except Exception as e:
            print(f"SQL Error: {e}")
            flash(f"Error: {e}", 'danger')
        finally:
            conn.close()
    
    # Fetch user data to display
    conn = get_db_connection()
    if conn is None:
        flash("Database connection failed. Please try again later.", 'danger')
        return redirect(url_for('signup'))

    cursor = conn.cursor()
    query = "SELECT username, email, address, phone_number FROM [User] WHERE id = ?"
    cursor.execute(query, (session['user_id'],))
    user_data = cursor.fetchone()
    conn.close()

    return render_template('profile.html', user_data=user_data)

if __name__ == '__main__':
    app.run(debug=True)

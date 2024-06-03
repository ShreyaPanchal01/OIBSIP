import bcrypt

# In-memory storage for users (for simplicity)
users = {}

def register(username, password):
    if username in users:
        return "Username already taken!"
    
    # Hash the password
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    users[username] = hashed_pw
    return "User registered successfully!"

def login(username, password):
    if username not in users:
        return "Username not found!"
    
    # Check the hashed password
    hashed_pw = users[username]
    if bcrypt.checkpw(password.encode('utf-8'), hashed_pw):
        return "Login successful!"
    else:
        return "Incorrect password!"

def secured_page(username):
    if username in users:
        return f"Welcome to the secured page, {username}!"
    else:
        return "Access denied. Please log in first."

def main():
    while True:
        print("\n1. Register\n2. Login\n3. Access Secured Page\n4. Exit")
        choice = input("Choose an option: ")
        
        if choice == '1':
            username = input("Enter username: ")
            password = input("Enter password: ")
            print(register(username, password))
        
        elif choice == '2':
            username = input("Enter username: ")
            password = input("Enter password: ")
            print(login(username, password))
        
        elif choice == '3':
            username = input("Enter username: ")
            print(secured_page(username))
        
        elif choice == '4':
            print("Goodbye!")
            break
        
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()

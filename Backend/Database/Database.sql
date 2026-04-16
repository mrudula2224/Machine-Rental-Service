CREATE DATABASE MachineRentalService;

USE MachineRentalService;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    role ENUM('owner', 'renter') NOT NULL,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE machines (
    machine_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT,
    machine_name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    rent_per_day DECIMAL(10,2),
    location VARCHAR(100),
    availability BOOLEAN DEFAULT TRUE,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    machine_id INT,
    renter_id INT,
    owner_id INT,
    from_date DATE,
    to_date DATE,
    status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
    
    FOREIGN KEY (machine_id) REFERENCES machines(machine_id) ON DELETE CASCADE,
    FOREIGN KEY (renter_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    machine_id INT,
    renter_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (machine_id) REFERENCES machines(machine_id),
    FOREIGN KEY (renter_id) REFERENCES users(user_id)
);

CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR(255)
);

DESCRIBE users;
SELECT * FROM users;
SET SQL_SAFE_UPDATES = 0;
DELETE FROM admin WHERE username='admin';
SET SQL_SAFE_UPDATES = 1; -- Recommended: turn it back on after
SELECT * FROM admin;

INSERT INTO admin (username, password)
VALUES ('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'); #admin123



CREATE DATABASE traveloop;

USE traveloop;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  profile_photo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  start_date DATE,
  end_date DATE,
  description TEXT,
  image_url VARCHAR(255),
  budget_limit DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE cities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(255),
  description TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  popularity INT DEFAULT 0
);

CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  cost DECIMAL(10,2),
  city_id INT,
  category VARCHAR(255),
  duration_hours INT,
  rating DECIMAL(3,1),
  FOREIGN KEY (city_id) REFERENCES cities(id)
);

CREATE TABLE itinerary (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_id INT NOT NULL,
  city_id INT NOT NULL,
  sequence_order INT NOT NULL,
  start_date DATE,
  end_date DATE,
  notes TEXT,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
  FOREIGN KEY (city_id) REFERENCES cities(id)
);

CREATE TABLE itinerary_days (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_id INT NOT NULL,
  date DATE NOT NULL,
  city_id INT,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
  FOREIGN KEY (city_id) REFERENCES cities(id)
);

CREATE TABLE trip_activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  itinerary_id INT NOT NULL,
  activity_id INT NOT NULL,
  activity_date DATE,
  notes TEXT,
  FOREIGN KEY (itinerary_id) REFERENCES itinerary(id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activities(id)
);

CREATE TABLE packing_checklist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_id INT NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  completed BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_id INT NOT NULL,
  day_id INT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
  FOREIGN KEY (day_id) REFERENCES itinerary_days(id) ON DELETE CASCADE
);

CREATE TABLE budget_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_id INT NOT NULL,
  category VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

CREATE TABLE shared_trips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_id INT NOT NULL,
  share_token VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

-- Insert some sample cities and activities
INSERT INTO cities (name, country, latitude, longitude) VALUES
('Paris', 'France', 48.8566, 2.3522),
('London', 'UK', 51.5074, -0.1278),
('New York', 'USA', 40.7128, -74.0060),
('Tokyo', 'Japan', 35.6762, 139.6503),
('Sydney', 'Australia', -33.8688, 151.2093);

INSERT INTO activities (name, description, cost, city_id, category) VALUES
('Eiffel Tower Visit', 'Visit the iconic Eiffel Tower', 20.00, 1, 'Sightseeing'),
('Louvre Museum', 'Explore world-famous art at the Louvre', 17.00, 1, 'Museum'),
('Big Ben Tour', 'Tour the Houses of Parliament and Big Ben', 30.00, 2, 'Sightseeing'),
('Central Park Walk', 'Stroll through Central Park', 0.00, 3, 'Nature'),
('Tokyo Skytree', 'Visit the tallest structure in Japan', 15.00, 4, 'Sightseeing'),
('Sydney Opera House Tour', 'Guided tour of the Opera House', 40.00, 5, 'Culture');
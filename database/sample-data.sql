-- Sample Data for Traveloop
-- This file contains sample cities and activities for testing

USE traveloop;

-- Sample Cities
INSERT INTO cities (name, country, description, latitude, longitude, popularity) VALUES
('Paris', 'France', 'City of Light with iconic Eiffel Tower, museums, and romance', 48.8566, 2.3522, 100),
('Tokyo', 'Japan', 'Vibrant capital with ancient temples, modern technology, and delicious food', 35.6762, 139.6503, 95),
('New York', 'United States', 'The city that never sleeps with Broadway, museums, and iconic skyline', 40.7128, -74.0060, 98),
('Barcelona', 'Spain', 'Mediterranean city with Sagrada Familia, beaches, and Catalan culture', 41.3874, 2.1686, 92),
('Dubai', 'United Arab Emirates', 'Luxurious desert city with stunning architecture and shopping', 25.2048, 55.2708, 90),
('Rome', 'Italy', 'Ancient history with Colosseum, Vatican, and amazing cuisine', 41.9028, 12.4964, 94),
('Sydney', 'Australia', 'Modern city with iconic Opera House and beautiful beaches', -33.8688, 151.2093, 88),
('Bangkok', 'Thailand', 'Vibrant city with ornate temples, floating markets, and street food', 13.7563, 100.5018, 85),
('London', 'United Kingdom', 'Historic capital with Big Ben, museums, and diverse neighborhoods', 51.5074, -0.1278, 96),
('Amsterdam', 'Netherlands', 'Charming city with canals, bike culture, and museums', 52.3676, 4.9041, 87);

-- Sample Activities for Paris
INSERT INTO activities (city_id, name, description, category, cost, duration_hours, rating) VALUES
(1, 'Eiffel Tower Visit', 'Climb or take elevator to the iconic Eiffel Tower with panoramic views', 'Sightseeing', 15.00, 3, 4.8),
(1, 'Louvre Museum', 'World\'s largest museum with Mona Lisa and thousands of artworks', 'Sightseeing', 18.00, 4, 4.7),
(1, 'Seine River Cruise', 'Romantic boat tour along the Seine river', 'Sightseeing', 12.00, 2, 4.6),
(1, 'French Cuisine Tour', 'Taste authentic French food and pastries', 'Food & Dining', 45.00, 3, 4.9);

-- Sample Activities for Tokyo
INSERT INTO activities (city_id, name, description, category, cost, duration_hours, rating) VALUES
(2, 'Senso-ji Temple', 'Ancient temple and shopping in Asakusa', 'Sightseeing', 5.00, 2, 4.7),
(2, 'Shibuya Crossing', 'World\'s busiest pedestrian crossing with shopping and nightlife', 'Sightseeing', 0.00, 2, 4.8),
(2, 'Sushi Cooking Class', 'Learn to make authentic sushi from a master chef', 'Food & Dining', 80.00, 3, 4.9),
(2, 'Mount Fuji Day Trip', 'Visit iconic Mount Fuji with scenic views', 'Adventure', 100.00, 8, 4.8);

-- Sample Activities for New York
INSERT INTO activities (city_id, name, description, category, cost, duration_hours, rating) VALUES
(3, 'Statue of Liberty', 'Visit America\'s iconic statue with ferry ride', 'Sightseeing', 24.00, 3, 4.7),
(3, 'Broadway Show', 'Watch a world-class theatre performance', 'Entertainment', 80.00, 3, 4.9),
(3, 'Central Park Walk', 'Stroll through the famous 843-acre park', 'Relaxation', 0.00, 3, 4.6),
(3, 'Times Square Experience', 'Experience the bright lights and energy of Times Square', 'Shopping', 0.00, 2, 4.5);

-- Sample Activities for Barcelona
INSERT INTO activities (city_id, name, description, category, cost, duration_hours, rating) VALUES
(4, 'Sagrada Familia', 'Explore Gaudi\'s masterpiece cathedral', 'Sightseeing', 26.00, 2, 4.8),
(4, 'Park Güell', 'Wander through colorful mosaic park with city views', 'Sightseeing', 14.00, 2, 4.7),
(4, 'Beach Day', 'Relax on Barcelona\'s Mediterranean beaches', 'Relaxation', 0.00, 4, 4.5),
(4, 'Tapas and Wine Tour', 'Sample Spanish tapas and local wines', 'Food & Dining', 65.00, 3, 4.8);

-- Sample Activities for Dubai
INSERT INTO activities (city_id, name, description, category, cost, duration_hours, rating) VALUES
(5, 'Burj Khalifa', 'Visit world\'s tallest building with observation decks', 'Sightseeing', 35.00, 2, 4.7),
(5, 'Dubai Desert Safari', 'Experience desert with dunes and dune bashing', 'Adventure', 70.00, 6, 4.8),
(5, 'Shopping Mall Tour', 'Explore world\'s largest shopping mall', 'Shopping', 0.00, 4, 4.3),
(5, 'Gold Souk', 'Shop for gold and traditional spices', 'Shopping', 20.00, 2, 4.4);

-- Sample Activities for Rome
INSERT INTO activities (city_id, name, description, category, cost, duration_hours, rating) VALUES
(6, 'Colosseum', 'Ancient amphitheater and Roman icon', 'Sightseeing', 18.00, 2, 4.8),
(6, 'Vatican Museums', 'Massive collection of art and Vatican treasures', 'Sightseeing', 28.00, 4, 4.7),
(6, 'Roman Forum Walk', 'Explore ancient Roman government buildings', 'Sightseeing', 12.00, 2, 4.6),
(6, 'Italian Food Tour', 'Taste authentic pasta, pizza, and gelato', 'Food & Dining', 50.00, 3, 4.9);

-- Sample Activities for Sydney
INSERT INTO activities (city_id, name, description, category, cost, duration_hours, rating) VALUES
(7, 'Opera House Tour', 'Visit iconic Sydney Opera House with guided tour', 'Sightseeing', 45.00, 2, 4.8),
(7, 'Bondi Beach', 'Swim and relax on famous Bondi Beach', 'Relaxation', 0.00, 3, 4.5),
(7, 'Harbour Bridge Climb', 'Climb the iconic Sydney Harbour Bridge', 'Adventure', 260.00, 3, 4.9),
(7, 'Blue Mountains Day Trip', 'Visit scenic Blue Mountains with waterfalls', 'Adventure', 100.00, 8, 4.7);

-- Sample Activities for Bangkok
INSERT INTO activities (city_id, name, description, category, cost, duration_hours, rating) VALUES
(8, 'Grand Palace', 'Thailand\'s most sacred royal palace', 'Sightseeing', 20.00, 2, 4.7),
(8, 'Floating Markets', 'Experience traditional floating markets', 'Sightseeing', 40.00, 3, 4.6),
(8, 'Thai Massage', 'Traditional Thai massage and spa experience', 'Relaxation', 15.00, 2, 4.8),
(8, 'Street Food Tour', 'Taste authentic Thai street food', 'Food & Dining', 25.00, 3, 4.9);

-- Sample Activities for London
INSERT INTO activities (city_id, name, description, category, cost, duration_hours, rating) VALUES
(9, 'Big Ben and Parliament', 'Visit iconic clock tower and parliament building', 'Sightseeing', 20.00, 1, 4.7),
(9, 'British Museum', 'One of world\'s greatest history museums', 'Sightseeing', 0.00, 4, 4.8),
(9, 'Thames River Cruise', 'Scenic boat tour along the Thames', 'Sightseeing', 15.00, 1.5, 4.5),
(9, 'West End Show', 'Broadway-style theatre production', 'Entertainment', 75.00, 3, 4.8);

-- Sample Activities for Amsterdam
INSERT INTO activities (city_id, name, description, category, cost, duration_hours, rating) VALUES
(10, 'Canal Tour', 'Scenic boat tour through Amsterdam\'s famous canals', 'Sightseeing', 16.00, 1.5, 4.7),
(10, 'Anne Frank House', 'Historical museum and concentration camp awareness', 'Sightseeing', 14.00, 1.5, 4.8),
(10, 'Bike Tour', 'Explore the city like a local by bike', 'Adventure', 25.00, 3, 4.6),
(10, 'Van Gogh Museum', 'Largest collection of Van Gogh paintings', 'Sightseeing', 20.00, 2, 4.8);

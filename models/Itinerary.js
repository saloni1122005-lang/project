const pool = require('../config/database');

class Itinerary {
  static async addCity(tripId, cityId, sequenceOrder, startDate, endDate, notes) {
    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.query(
        'INSERT INTO itinerary (trip_id, city_id, sequence_order, start_date, end_date, notes) VALUES (?, ?, ?, ?, ?, ?)',
        [tripId, cityId, sequenceOrder, startDate, endDate, notes]
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  }

  static async findByTripId(tripId) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        `SELECT i.*, c.name as city_name, c.country 
         FROM itinerary i
         JOIN cities c ON i.city_id = c.id
         WHERE i.trip_id = ?
         ORDER BY i.sequence_order`,
        [tripId]
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async findById(id) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT * FROM itinerary WHERE id = ?',
        [id]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async updateSequence(id, sequenceOrder) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query(
        'UPDATE itinerary SET sequence_order = ? WHERE id = ?',
        [sequenceOrder, id]
      );
    } finally {
      connection.release();
    }
  }

  static async removeCity(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query('DELETE FROM itinerary WHERE id = ?', [id]);
    } finally {
      connection.release();
    }
  }

  static async addActivity(itineraryId, activityId, activityDate, notes = null) {
    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.query(
        'INSERT INTO trip_activities (itinerary_id, activity_id, activity_date, notes) VALUES (?, ?, ?, ?)',
        [itineraryId, activityId, activityDate, notes]
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  }

  static async removeActivity(itineraryId, activityId) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query(
        'DELETE FROM trip_activities WHERE itinerary_id = ? AND activity_id = ?',
        [itineraryId, activityId]
      );
    } finally {
      connection.release();
    }
  }

  static async getItineraryWithActivities(tripId) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        `SELECT 
          i.id, i.trip_id, i.city_id, i.sequence_order, i.start_date, i.end_date, i.notes,
          c.name as city_name, c.country,
          ta.id as activity_id, ta.activity_date, a.name as activity_name, a.cost, a.description
         FROM itinerary i
         JOIN cities c ON i.city_id = c.id
         LEFT JOIN trip_activities ta ON i.id = ta.itinerary_id
         LEFT JOIN activities a ON ta.activity_id = a.id
         WHERE i.trip_id = ?
         ORDER BY i.sequence_order, ta.activity_date`,
        [tripId]
      );
      return rows;
    } finally {
      connection.release();
    }
  }
}

module.exports = Itinerary;

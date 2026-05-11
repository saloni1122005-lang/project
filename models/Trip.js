const pool = require('../config/database');

class Trip {
  static async create(userId, name, description, startDate, endDate, image, budgetLimit) {
    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.query(
        'INSERT INTO trips (user_id, name, description, start_date, end_date, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, name, description, startDate, endDate, image]
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  }

  static async findById(id) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT id, user_id, name, description, start_date, end_date, image_url AS image, created_at FROM trips WHERE id = ?',
        [id]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async findByUserId(userId) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT id, name, description, start_date, end_date, image_url AS image, created_at FROM trips WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async update(id, name, description, startDate, endDate, budgetLimit) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query(
        'UPDATE trips SET name = ?, description = ?, start_date = ?, end_date = ? WHERE id = ?',
        [name, description, startDate, endDate, id]
      );
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query('DELETE FROM trips WHERE id = ?', [id]);
    } finally {
      connection.release();
    }
  }

  static async getDestinationCount(tripId) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT COUNT(*) as count FROM itinerary_days WHERE trip_id = ?',
        [tripId]
      );
      return rows[0].count;
    } finally {
      connection.release();
    }
  }

  static async getRecentTrips(userId, limit = 3) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT id, name, description, start_date, end_date, image_url AS image, budget_limit, created_at FROM trips WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
        [userId, limit]
      );
      return rows;
    } finally {
      connection.release();
    }
  }
}

module.exports = Trip;

const pool = require('../config/database');

class Activity {
  static async create(cityId, name, description, category, cost, durationHours, rating) {
    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.query(
        'INSERT INTO activities (city_id, name, description, category, cost, duration_hours, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [cityId, name, description, category, cost, durationHours, rating]
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
        'SELECT * FROM activities WHERE id = ?',
        [id]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async findByCityId(cityId) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT * FROM activities WHERE city_id = ? ORDER BY rating DESC',
        [cityId]
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async search(category, maxCost, maxDuration) {
    const connection = await pool.getConnection();
    
    try {
      let sql = 'SELECT * FROM activities WHERE 1=1';
      let params = [];

      if (category) {
        sql += ' AND category = ?';
        params.push(category);
      }

      if (maxCost) {
        sql += ' AND cost <= ?';
        params.push(maxCost);
      }

      if (maxDuration) {
        sql += ' AND duration_hours <= ?';
        params.push(maxDuration);
      }

      sql += ' ORDER BY rating DESC';
      const [rows] = await connection.query(sql, params);
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getCategories() {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT DISTINCT category FROM activities WHERE category IS NOT NULL ORDER BY category'
      );
      return rows.map(row => row.category);
    } finally {
      connection.release();
    }
  }
}

module.exports = Activity;

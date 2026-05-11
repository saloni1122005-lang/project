const pool = require('../config/database');

class City {
  static async create(name, country, description, latitude, longitude, popularity) {
    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.query(
        'INSERT INTO cities (name, country, description, latitude, longitude, popularity) VALUES (?, ?, ?, ?, ?, ?)',
        [name, country, description, latitude, longitude, popularity]
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
        'SELECT * FROM cities WHERE id = ?',
        [id]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async search(query, country, limit = 10) {
    const connection = await pool.getConnection();
    
    try {
      let sql = 'SELECT * FROM cities WHERE name LIKE ?';
      let params = [`%${query}%`];

      if (country) {
        sql += ' AND country = ?';
        params.push(country);
      }

      sql += ' ORDER BY popularity DESC LIMIT ?';
      params.push(limit);

      const [rows] = await connection.query(sql, params);
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getPopularCities(limit = 6) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT id, name, country, description, latitude, longitude, popularity FROM cities ORDER BY popularity DESC LIMIT ?',
        [limit]
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getCountries() {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT DISTINCT country FROM cities ORDER BY country'
      );
      return rows.map(row => row.country);
    } finally {
      connection.release();
    }
  }
}

module.exports = City;

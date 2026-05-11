const pool = require('../config/database');

class Share {
  static async createShareLink(tripId, userId, token, expiresAt = null) {
    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.query(
        'INSERT INTO share_links (trip_id, created_by, share_token, expires_at) VALUES (?, ?, ?, ?)',
        [tripId, userId, token, expiresAt]
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  }

  static async findByToken(token) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT * FROM share_links WHERE share_token = ? AND (expires_at IS NULL OR expires_at > NOW())',
        [token]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async findByTripId(tripId) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT * FROM share_links WHERE trip_id = ? ORDER BY created_at DESC',
        [tripId]
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async deleteLink(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query('DELETE FROM share_links WHERE id = ?', [id]);
    } finally {
      connection.release();
    }
  }
}

module.exports = Share;

const pool = require('../config/database');

class Note {
  static async create(tripId, itineraryId, title, content, noteDate) {
    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.query(
        'INSERT INTO notes (trip_id, itinerary_id, title, content, note_date) VALUES (?, ?, ?, ?, ?)',
        [tripId, itineraryId, title, content, noteDate]
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
        'SELECT * FROM notes WHERE trip_id = ? ORDER BY note_date DESC, created_at DESC',
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
        'SELECT * FROM notes WHERE id = ?',
        [id]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async update(id, title, content, noteDate) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query(
        'UPDATE notes SET title = ?, content = ?, note_date = ? WHERE id = ?',
        [title, content, noteDate, id]
      );
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query('DELETE FROM notes WHERE id = ?', [id]);
    } finally {
      connection.release();
    }
  }
}

module.exports = Note;

const pool = require('../config/database');

class Budget {
  static async addExpense(tripId, category, description, amount) {
    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.query(
        'INSERT INTO budget (trip_id, category, description, amount) VALUES (?, ?, ?, ?)',
        [tripId, category, description, amount]
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
        'SELECT * FROM budget WHERE trip_id = ? ORDER BY created_at DESC',
        [tripId]
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getTotalBudget(tripId) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT SUM(amount) as total FROM budget WHERE trip_id = ?',
        [tripId]
      );
      return rows[0].total || 0;
    } finally {
      connection.release();
    }
  }

  static async getBudgetBreakdown(tripId) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT category, SUM(amount) as total FROM budget WHERE trip_id = ? GROUP BY category',
        [tripId]
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async deleteExpense(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query('DELETE FROM budget WHERE id = ?', [id]);
    } finally {
      connection.release();
    }
  }
}

module.exports = Budget;

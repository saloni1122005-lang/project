const pool = require('../config/database');

class Checklist {
  static async addItem(tripId, itemName, category) {
    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.query(
        'INSERT INTO packing_checklist (trip_id, item_name, category) VALUES (?, ?, ?)',
        [tripId, itemName, category]
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  }


  static async updateItem(id, itemName, category, isCompleted) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query(
        'UPDATE packing_checklist SET item_name = ?, category = ?, is_completed = ? WHERE id = ?',
        [itemName, category, isCompleted, id]
      );
    } finally {
      connection.release();
    }
  }

  static async toggleItem(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query(
        'UPDATE packing_checklist SET is_completed = !is_completed WHERE id = ?',
        [id]
      );
    } finally {
      connection.release();
    }
  }

  static async resetChecklist(tripId) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query(
        'UPDATE packing_checklist SET is_completed = FALSE WHERE trip_id = ?',
        [tripId]
      );
    } finally {
      connection.release();
    }
  }

  static async deleteItem(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query('DELETE FROM packing_checklist WHERE id = ?', [id]);
    } finally {
      connection.release();
    }
  }
}

module.exports = Checklist;

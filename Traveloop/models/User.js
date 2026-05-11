const pool = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async create(email, password, name) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.query(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        [email, hashedPassword, name]
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  }

  static async findByEmail(email) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async findById(id) {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        'SELECT id, email, name, profile_photo, created_at FROM users WHERE id = ?',
        [id]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async update(id, name, profilePhoto) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query(
        'UPDATE users SET name = ?, profile_photo = ? WHERE id = ?',
        [name, profilePhoto, id]
      );
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.query('DELETE FROM users WHERE id = ?', [id]);
    } finally {
      connection.release();
    }
  }

  static async validatePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;

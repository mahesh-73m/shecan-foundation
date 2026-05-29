import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import './Admin.css';

const Admin = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await API.get('/contacts');
      setContacts(response.data.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      await API.delete(`/contacts/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(search.toLowerCase()) ||
                       contact.email.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    read: contacts.filter(c => c.status === 'read').length,
    thisWeek: contacts.filter(c => {
      const created = new Date(c.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return created > weekAgo;
    }).length
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-title">
          <h1>Admin Panel</h1>
          <span className="badge">{stats.total} Messages</span>
        </div>
        <div className="admin-actions">
          <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
          <button className="admin-btn admin-btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon blue">📬</div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Messages</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div className="stat-info">
            <h3>{stats.thisWeek}</h3>
            <p>This Week</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">★</div>
          <div className="stat-info">
            <h3>{stats.new}</h3>
            <p>New Messages</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Messages</option>
          <option value="new">New</option>
          <option value="read">Read</option>
        </select>
      </div>

      {/* Contacts Table */}
      {filteredContacts.length === 0 ? (
        <div className="contacts-table-container">
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No Messages Yet</h3>
            <p>Contact form submissions will appear here.</p>
          </div>
        </div>
      ) : (
        <div className="contacts-table-container">
          <table className="contacts-table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact._id}>
                  <td>
                    <div className="contact-info">
                      <div className="contact-avatar">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="contact-details">
                        <h4>{contact.name}</h4>
                      </div>
                    </div>
                  </td>
                  <td>{contact.email}</td>
                  <td>
                    <div className="message-cell">
                      <p>{contact.message}</p>
                    </div>
                  </td>
                  <td>
                    <span className="date-cell">{formatDate(contact.createdAt)}</span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(contact._id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
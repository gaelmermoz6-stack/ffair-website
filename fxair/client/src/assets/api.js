const BASE_URL = process.env.REACT_APP_API_URL || '';

const api = {
  // Flights
  requestFlight: (data) =>
    fetch(`${BASE_URL}/api/flights/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  searchAirports: (query) =>
    fetch(`${BASE_URL}/api/flights/airports/search?q=${encodeURIComponent(query)}`).then(r => r.json()),

  // Aircraft
  getAircraft: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return fetch(`${BASE_URL}/api/aircraft${qs ? '?' + qs : ''}`).then(r => r.json());
  },

  getAircraftById: (id) =>
    fetch(`${BASE_URL}/api/aircraft/${id}`).then(r => r.json()),

  // Destinations
  getDestinations: (featured = false) =>
    fetch(`${BASE_URL}/api/destinations${featured ? '?featured=true' : ''}`).then(r => r.json()),

  getDestinationBySlug: (slug) =>
    fetch(`${BASE_URL}/api/destinations/${slug}`).then(r => r.json()),

  // Memberships
  getMemberships: () =>
    fetch(`${BASE_URL}/api/memberships`).then(r => r.json()),

  inquireMembership: (data) =>
    fetch(`${BASE_URL}/api/memberships/inquire`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  // Contact
  sendContact: (data) =>
    fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
};

export default api;

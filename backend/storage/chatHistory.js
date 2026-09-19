const sessions = {};

const getSession = (sessionId) => {
  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      history: [],
      pendingOrder: null,
    };
  }

  return sessions[sessionId];
};

module.exports = { getSession };
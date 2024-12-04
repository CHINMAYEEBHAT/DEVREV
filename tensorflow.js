const nodePickle = require('node-pickle');
filePath="C:\Users\preks\Downloads\model.pkl"
const loadPickle = async (filePath) => {
  try {
    const data = await nodePickle.load(filePath);
    return data; // JSON object
  } catch (error) {
    console.error('Error loading pickle file:', error);
    throw error;
  }
};

module.exports = { loadPickle };

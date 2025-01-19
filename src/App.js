import React, { useState, useEffect } from 'react'; 
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import './App.css';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [completedTopics, setCompletedTopics] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const topics = [
    'React', 'Selenium', 'HTML, CSS, JS', 'NextJS', 'Postman',
    'UI/UX Design', 'OOPS', 'Basic Java', 'Selenium', 'Android', 'Firebase Authentication'
  ];

  const subTopics = {
    'HTML, CSS, JS': [
      'Introduction to HTML',
      'Elements, Attributes, Headings, Paragraphs',
      'Styles (Text color, Size, weight, Background color)',
      'Formatting (Bold, Italic, Emphasized text)',
      'Quotations (<blockquote>, <q>, <abbr>, <address>, <cite>)',
      'Bi-directional Override (bdo)',
      'HTML Comments, Colors',
      'HTML CSS (Include CSS file to HTML code), Links, Adding Images',
      'Inserting FAVICONS, Page Titles',
      'Tables, Lists',
    ],
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        const savedData = localStorage.getItem(`completedTopics_${currentUser.uid}`);
        if (savedData) {
          setCompletedTopics(JSON.parse(savedData));
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, []);

  const handleSignUp = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setIsAuthenticated(true);
        localStorage.setItem(`completedTopics_${userCredential.user.uid}`, JSON.stringify({}));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error.message);
        alert('Error signing up: ' + error.message);
      });
  };

  const handleSignIn = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setIsAuthenticated(true);
        const savedData = localStorage.getItem(`completedTopics_${userCredential.user.uid}`);
        if (savedData) {
          setCompletedTopics(JSON.parse(savedData));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error.message);
        alert('Error signing in: ' + error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setIsAuthenticated(false);
        setCompletedTopics({});
        localStorage.removeItem(`completedTopics_${user?.uid}`);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
  };

  const handleSubTopicClick = (subTopic) => {
    const completedKey = `${selectedTopic}-${subTopic}`;
    const updatedCompletedTopics = {
      ...completedTopics,
      [completedKey]: !completedTopics[completedKey],
    };

    setCompletedTopics(updatedCompletedTopics);

    if (user) {
      localStorage.setItem(`completedTopics_${user.uid}`, JSON.stringify(updatedCompletedTopics));
    }
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Authentication */}
      {!isAuthenticated ? (
        <div className="auth-container">
          <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={isSignUp ? handleSignUp : handleSignIn} disabled={isLoading}>
            {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          <p>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <span onClick={() => setIsSignUp(!isSignUp)} style={{ color: 'blue', cursor: 'pointer' }}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </span>
          </p>
        </div>
      ) : (
        <div>
          <h1>Welcome {user?.email}</h1>
          <button onClick={handleSignOut}>Sign Out</button>

          <div className="header-container">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="topic-header"
                onClick={() => handleTopicClick(topic)}
                style={{
                  cursor: 'pointer',
                  padding: '10px',
                  backgroundColor: '#f4f4f4',
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {topic}
              </div>
            ))}
          </div>

          {selectedTopic && subTopics[selectedTopic] && (
            <div className="subtopics-container">
              <h2>{selectedTopic}</h2>
              <ul>
                {subTopics[selectedTopic].map((subTopic, idx) => {
                  const completedKey = `${selectedTopic}-${subTopic}`;
                  return (
                    <li key={idx}>
                      <span
                        style={{
                          fontWeight: completedTopics[completedKey] ? 'bold' : 'normal',
                        }}
                        onClick={() => handleSubTopicClick(subTopic)}
                      >
                        {subTopic}
                      </span>
                      <button
                        disabled={completedTopics[completedKey]}
                        onClick={() => handleSubTopicClick(subTopic)}
                        style={{
                          marginLeft: '10px',
                          padding: '5px 10px',
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {completedTopics[completedKey] ? 'Completed' : 'Mark as Completed'}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

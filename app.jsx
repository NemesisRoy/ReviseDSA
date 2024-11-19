import React, { useState } from 'react';
import { 
  ChevronRight, 
  Moon, 
  Sun, 
  Edit, 
  Save, 
  PlusCircle, 
  Trash2 
} from 'lucide-react';

// Mock data - in a real app, this would come from a backend
const initialTopics = [
  {
    id: 1,
    category: 'Arrays',
    questions: [
      { 
        id: 101, 
        title: 'Two Sum', 
        difficulty: 'Easy',
        solution: 'Use a hash map to store complement values',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
      },
      { 
        id: 102, 
        title: 'Maximum Subarray', 
        difficulty: 'Medium',
        solution: 'Kadane\'s algorithm',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
      }
    ]
  },
  {
    id: 2,
    category: 'Linked Lists',
    questions: [
      { 
        id: 201, 
        title: 'Reverse Linked List', 
        difficulty: 'Easy',
        solution: 'Iterative and recursive approaches',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
      }
    ]
  }
];

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [topics, setTopics] = useState(initialTopics);
  const [editingTopicId, setEditingTopicId] = useState(null);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editingContent, setEditingContent] = useState({});

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Add new topic
  const addTopic = () => {
    const newTopic = {
      id: Date.now(),
      category: 'New Topic',
      questions: []
    };
    setTopics([...topics, newTopic]);
    setEditingTopicId(newTopic.id);
    setEditingContent({ category: 'New Topic' });
  };

  // Add new question to a topic
  const addQuestion = (topicId) => {
    const newQuestion = {
      id: Date.now(),
      title: 'New Question',
      difficulty: 'Easy',
      solution: '',
      timeComplexity: '',
      spaceComplexity: ''
    };
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? { ...topic, questions: [...topic.questions, newQuestion] }
          : topic
      )
    );
    setEditingQuestionId(newQuestion.id);
    setEditingContent(newQuestion);
  };

  // Update topic or question
  const updateItem = () => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === editingTopicId
          ? { ...topic, category: editingContent.category }
          : {
              ...topic,
              questions: topic.questions.map((question) =>
                question.id === editingQuestionId ? { ...editingContent } : question
              )
            }
      )
    );
    setEditingTopicId(null);
    setEditingQuestionId(null);
    setEditingContent({});
  };

  // Delete topic or question
  const deleteItem = (itemId, isQuestion = false, topicId = null) => {
    if (isQuestion) {
      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.id === topicId
            ? { ...topic, questions: topic.questions.filter((q) => q.id !== itemId) }
            : topic
        )
      );
    } else {
      setTopics((prevTopics) => prevTopics.filter((t) => t.id !== itemId));
    }
  };

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">DSA Revision Companion</h1>
        <button 
          onClick={toggleDarkMode} 
          className="p-2 rounded-full hover:bg-gray-700"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* Topics Container */}
      <div className="space-y-4">
        {topics.map((topic) => (
          <div 
            key={topic.id} 
            className={`border rounded-lg p-4 ${
              isDarkMode 
                ? 'border-gray-700 bg-gray-800' 
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            {/* Topic Header */}
            <div className="flex justify-between items-center mb-3">
              {editingTopicId === topic.id ? (
                <input 
                  value={editingContent.category || ''}
                  onChange={(e) => setEditingContent({ ...editingContent, category: e.target.value })}
                  className={`w-full p-1 rounded ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-white text-black'
                  }`}
                  placeholder="Enter topic name"
                />
              ) : (
                <h2 className="text-xl font-semibold">{topic.category}</h2>
              )}
              
              <div className="flex space-x-2">
                {editingTopicId === topic.id ? (
                  <button 
                    onClick={updateItem}
                    className="text-green-500 hover:bg-gray-700 p-1 rounded"
                    aria-label="Save Topic"
                  >
                    <Save size={20} />
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setEditingTopicId(topic.id);
                      setEditingContent({ category: topic.category });
                    }}
                    className="hover:bg-gray-700 p-1 rounded"
                    aria-label="Edit Topic"
                  >
                    <Edit size={20} />
                  </button>
                )}
                <button 
                  onClick={() => deleteItem(topic.id)}
                  className="text-red-500 hover:bg-gray-700 p-1 rounded"
                  aria-label="Delete Topic"
                >
                  <Trash2 size={20} />
                </button>
                <button 
                  onClick={() => addQuestion(topic.id)}
                  className="text-blue-500 hover:bg-gray-700 p-1 rounded"
                  aria-label="Add Question"
                >
                  <PlusCircle size={20} />
                </button>
              </div>
            </div>

            {/* Questions List */}
            {topic.questions.map((question) => (
              <div 
                key={question.id} 
                className={`mb-2 p-3 rounded-md ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  {editingQuestionId === question.id ? (
                    <textarea 
                      value={editingContent.title || ''}
                      onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                      className={`w-full p-1 rounded ${
                        isDarkMode 
                          ? 'bg-gray-600 text-white' 
                          : 'bg-white text-black'
                      }`}
                      placeholder="Enter question title"
                    />
                  ) : (
                    <h3 className="text-lg font-semibold">{question.title}</h3>
                  )}
                  
                  <div className="flex space-x-2">
                    {editingQuestionId === question.id ? (
                      <button 
                        onClick={updateItem}
                        className="text-green-500 hover:bg-gray-700 p-1 rounded"
                        aria-label="Save Question"
                      >
                        <Save size={20} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          setEditingQuestionId(question.id);
                          setEditingContent(question);
                        }}
                        className="hover:bg-gray-700 p-1 rounded"
                        aria-label="Edit Question"
                      >
                        <Edit size={20} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteItem(question.id, true, topic.id)}
                      className="text-red-500 hover:bg-gray-700 p-1 rounded"
                      aria-label="Delete Question"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Difficulty: {question.difficulty} | Time Complexity: {question.timeComplexity || 'N/A'} | Space Complexity: {question.spaceComplexity || 'N/A'}
                </p>
                <p className="text-sm mt-2">
                  {editingQuestionId === question.id ? (
                    <textarea
                      value={editingContent.solution || ''}
                      onChange={(e) =>
                        setEditingContent({ ...editingContent, solution: e.target.value })
                      }
                      className={`w-full p-1 rounded ${
                        isDarkMode
                          ? 'bg-gray-600 text-white'
                          : 'bg-white text-black'
                      }`}
                      placeholder="Enter solution details"
                    />
                  ) : (
                    <>
                      <strong>Solution:</strong> {question.solution || 'No solution added.'}
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        ))}

        {/* Add New Topic Button */}
        <button
          onClick={addTopic}
          className="flex items-center space-x-2 p-3 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          <PlusCircle size={20} />
          <span>Add New Topic</span>
        </button>
      </div>
    </div>
  );
};

export default App;

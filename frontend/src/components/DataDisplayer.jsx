import { useState } from 'react';

export const initialData = [
  {
    id: 1,
    title: 'Docker Installation',
    content: `1. Update system packages using:\n   sudo apt update\n\n2. Install required dependencies:\n   sudo apt install apt-transport-https ca-certificates curl software-properties-common\n\n3. Add Docker repository:\n   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg\n   sudo add-apt-repository \"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\"\n\n4. Install Docker Engine:\n   sudo apt update\n   sudo apt install docker-ce docker-ce-cli containerd.io\n\n5. Start and enable Docker service:\n   sudo systemctl start docker\n   sudo systemctl enable docker`
  }
];

export default function DataDisplayer() {
  const [items, setItems] = useState(initialData);
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleAdd = () => {
    if (inputTitle && inputContent) {
      const newItem = {
        id: Date.now(),
        title: inputTitle,
        content: inputContent,
      };
      setItems(prev => [...prev, newItem]);
      setInputTitle('');
      setInputContent('');
      setExpandedId(newItem.id);
      setPopupOpen(false);
    }
  };

  const toggleExpand = id => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen flex flex-col gap-2 md:flex-row bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      {/* Small Icon Trigger */}
      <div className="  md:static md:mb-4">
        <button
          onClick={() => setPopupOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-shadow text-2xl"
          title="Add new note"
        >
          +
        </button>
      </div>

      {/* Popup Form */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40 px-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Add New Note</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputTitle}
              onChange={e => setInputTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              className="w-full p-2 mb-3 rounded border h-32 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-pre-wrap"
              value={inputContent}
              onChange={e => setInputContent(e.target.value)}
            />
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded w-full"
            >
              Add Note
            </button>
          </div>
        </div>
      )}

      {/* Right Panel */}
      <div className="flex-1 mt-16 md:mt-0 md:ml-0 flex flex-col gap-4">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg transition-all hover:shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(item.id)}
            >
              <h3 className="font-semibold text-gray-800 dark:text-white text-lg break-words">{item.title}</h3>
              <span className="text-xl text-gray-500 dark:text-gray-400">
                {expandedId === item.id ? '▲' : '▼'}
              </span>
            </div>
            {expandedId === item.id && (
              <div className="mt-3 text-left text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed break-words">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
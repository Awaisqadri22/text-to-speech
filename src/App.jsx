import React, { useState, useTransition } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  // Simple function to add items
  const addItems = () => {
    startTransition(() => {
      const newItems = [];
      for (let i = 0; i < 1000; i++) {
        newItems.push(`Item ${items.length + i}`);
      }
      setItems([...items, ...newItems]);
    });
  };

  // Simple function to clear items
  const clearItems = () => {
    startTransition(() => {
      setItems([]);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🚀 Simple useTransition() Example
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Counter Section */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Counter (Always Responsive)</h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">{count}</div>
            <button
              onClick={() => setCount(count + 1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Increment Counter
            </button>
          </div>

          {/* Items Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Items List</h2>
            
            {/* Loading indicator */}
            {isPending && (
              <div className="mb-4 p-3 bg-yellow-100 rounded-lg text-center">
                <div className="inline-flex items-center gap-2 text-yellow-700">
                  <div className="animate-spin w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
                  Adding items...
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={addItems}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Add 1000 Items
              </button>
              <button
                onClick={clearItems}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Items display */}
            <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
              <p className="text-sm text-gray-600 mb-2">
                Total items: <span className="font-semibold">{items.length}</span>
              </p>
              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No items yet. Click "Add 1000 Items" to see the magic!</p>
              ) : (
                <div className="space-y-1">
                  {items.slice(0, 10).map((item, index) => (
                    <div key={index} className="text-sm bg-white p-2 rounded border">
                      {item}
                    </div>
                  ))}
                  {items.length > 10 && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                      ... and {items.length - 10} more items
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">💡 What's happening?</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Counter button</strong> works instantly (urgent update)</li>
              <li>• <strong>Add items button</strong> uses useTransition() (non-urgent)</li>
              <li>• You can click counter while items are loading!</li>
              <li>• UI stays responsive during heavy operations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
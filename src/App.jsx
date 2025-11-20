import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [limit] = useState(4);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/items?page=${page}&limit=${limit}`);
        setItems(res.data.data || []);
        setTotalPages(res.data.totalpages || 1);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [page, limit]);

  // Generate page buttons dynamically
  const getPageNumbers = () => {

    const delta = 2;  
    const range = [];
    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);
    range.push(1);
    if (left > 2) {
      range.push('...')
    }
    for (let i = left; i <= right; i++) {
      range.push(i);
    }
    if (right < (totalPages - 1)) {
      range.push('...')
    }
    if (totalPages > 1) range.push(totalPages)

    return range;
  }

  const pages = getPageNumbers();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6">Products - Page {page}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full mb-6">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-medium mb-2">{item.name}</h3>
            <p className="text-gray-600 font-semibold">Price: ${item.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex space-x-2">
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50" disabled={page === 1}>Prev</button>
        {pages.map((num, idx) => num === '...' ? <span key={idx} className="px-3 py-1 rounded">{num}</span> : <button onClick={() => setPage(num)} key={idx} className={`py-2 px-4 rounded ${page === num ? 'bg-blue-500 text-white font-bold' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{num}</button>)}
        <button onClick={() => setPage(prev => Math.min(prev + 1, 10))} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50" disabled={page === 10}>Next</button>
      </div>
    </div>
  );
}

export default App;

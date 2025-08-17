import { useEffect, useState } from "react";

function App() {
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL = "https://store-feedbacks.onrender.com";

  useEffect(() => {
    console.log(API_URL)
    fetch(`${API_URL}/quote`)
      .then(res => res.json())
      .then(data => setQuote(data.quote.quote))
      .catch(() => setQuote("Failed to load quote."));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, feedback);
    if (!name.trim() || !feedback.trim() || !email.trim()) {
      setError("Name, Email and Feedback cannot be empty.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setError("");
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, feedback })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setName("");
        setEmail("");
        setFeedback("");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Failed to submit feedback.");
    }
    setTimeout(() => setMessage(""), 3000);
    setTimeout(() => setError(""), 3000);
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center w-screen h-1/2 p-4 ">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full text-center">
        <h1 className="text-xl text-gray-800 font-bold mb-4">Quote Of The Day</h1>
        <p className="text-gray-700 italic mb-6 h-16 flex items-center justify-center">
          {quote || "Loading..."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full border rounded-lg p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full border rounded-lg p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Your feedback"
            className="w-full border rounded-lg p-2"
            rows="3"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Submit Feedback
          </button>
        </form>

        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default App;

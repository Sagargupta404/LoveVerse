 {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[75%] shadow-md ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                  : "bg-white/10 text-gray-200 backdrop-blur-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-gray-400 animate-pulse">Love Guru is thinking…</p>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-pink-500/20 flex gap-2 bg-black/50 backdrop-blur-md">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your feelings..."
          className="flex-1 p-3 rounded-xl bg-white/10 outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400"
        />

        <button
          onClick={sendMessage}
          className="px-5 bg-pink-200 hover:bg-pink-800 rounded-xl"
        >
          ❤️
        </button>

      </div>
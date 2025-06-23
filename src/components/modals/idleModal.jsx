
export default function IdleModal({ isOpen, countdown, onStay, onLogout }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 text-center">
        <h2 className="text-xl font-semibold mb-4">Session Expiring Soon</h2>
        <p className="mb-4">
          You will be logged out in <span className="font-bold">{countdown}</span> seconds due to inactivity.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Logout
          </button>
          <button
            onClick={onStay}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  );
}

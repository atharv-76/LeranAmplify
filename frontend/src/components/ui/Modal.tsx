interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ onClose, title, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &#x2715; {/* Unicode character for "X" */}
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};
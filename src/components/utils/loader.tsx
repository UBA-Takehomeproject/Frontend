const Loader = () => (
  <div className="fixed inset-0 z-[2001] flex items-center justify-center bg-white">
    <div className="flex space-x-2">
      <span className="w-4 h-4 bg-uba-red rounded-full animate-bounce delay-0" />
      <span className="w-4 h-4 bg-uba-red rounded-full animate-bounce delay-150" />
      <span className="w-4 h-4 bg-uba-red rounded-full animate-bounce delay-300" />
    </div>

    <style>
      {`
          .animate-bounce {
            animation: bounce 0.6s infinite alternate;
          }
  
          @keyframes bounce {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px); }
          }
  
          .delay-0 {
            animation-delay: 0s;
          }
  
          .delay-150 {
            animation-delay: 0.15s;
          }
  
          .delay-300 {
            animation-delay: 0.3s;
          }
        `}
    </style>
  </div>
);

export default Loader;

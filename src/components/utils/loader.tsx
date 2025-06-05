// Tailwind Loader

const Loader = () => (
    <div className="fixed top-0 left-0 z-[2001] w-full">
        <div className="h-1 w-full bg-uba-200 overflow-hidden">
            <div className="h-full w-1/3 bg-uba-red animate-loader-bar" />
        </div>
        <style>
            {`
                @keyframes loader-bar {
                    0% { margin-left: -33%; width: 33%; }
                    50% { margin-left: 33%; width: 33%; }
                    100% { margin-left: 100%; width: 33%; }
                }
                .animate-loader-bar {
                    animation: loader-bar 1.2s cubic-bezier(0.4,0,0.2,1) infinite;
                }
            `}
        </style>
    </div>
);

export default Loader;

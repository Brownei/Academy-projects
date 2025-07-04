const LoadingState = ({ message }: { message: string }) => (
  <div className="flex items-center space-x-2">
    <div className="animate-spin">
      <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </div>
    <span>{message}</span>
  </div>
);

export default LoadingState;

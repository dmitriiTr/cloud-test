const ErrorMessage = ({ error }: { error: Error }) => {
  if (!error) {
    return null;
  }
  return (
    <div
      className="absolute w-full right-0 top-[60px] md:w-[425px] md:right-[100px]
  p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 border border-yellow-400"
      role="alert"
    >
      <span className="font-medium">Error</span> {error.message}
    </div>
  );
};

export default ErrorMessage;

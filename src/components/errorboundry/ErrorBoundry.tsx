
const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
    return (
        <div className="map">
            <p>Something error occured in map try to refresh to load the component:</p>
            <p className="error">{error.message}</p>
            <button className='btn' onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
};

export { ErrorFallback };
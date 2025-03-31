interface LazyLoadingCardFrameProps {
  loadingMessage: string;
  isFrameVisible: boolean;
  iframeUrl: string;
  isLoading: boolean;
  setIsLoading: (_: boolean) => void;
}

export default function LazyLoadingCardFrame(props: LazyLoadingCardFrameProps) {
  return (
    <>
      {props.isLoading && (
        <div className="flex flex-col items-center justify-center mt-8 mb-8 gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
          <p className="text-gray-600 text-lg">{props.loadingMessage}</p>
        </div>
      )}

      <iframe
        src={props.iframeUrl}
        loading="lazy"
        style={
          props.isFrameVisible
            ? {}
            : {
                visibility: "hidden",
              }
        }
        width="100%"
        height={props.isFrameVisible ? "650" : "0"}
        onLoad={() => {
          props.setIsLoading(false);
        }}
        className="shadow-lg rounded-lg"
      ></iframe>
    </>
  );
}

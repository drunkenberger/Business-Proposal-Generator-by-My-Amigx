import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  ipfsCid?: string;
}

const Image = ({ ipfsCid, alt, className, ...props }: ImageProps) => {
  const ipfsGatewayUrl = ipfsCid
    ? `https://gateway.pinata.cloud/ipfs/${ipfsCid}`
    : props.src;

  return (
    <img src={ipfsGatewayUrl} alt={alt} className={className} {...props} />
  );
};

export { Image };

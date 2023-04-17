import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface NFT {
  amount: string;
  appMetadata: {
    name?: string;
    image?: string;
    animation_url?: string;
    content_type: string;
    content_length: number;
  };
  block_number?: string;
  block_number_minted: string;
  contract_type: string;
  last_metadata_sync: string;
  last_token_uri_sync: string;
  metadata?: string;
  minter_address: string;
  name: string;
  owner_of?: string;
  symbol: string;
  token_address: string;
  token_hash: string;
  token_id: string;
  token_uri: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewer &
        DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export interface ModelViewer {
  src: string;
  alt: string;
  "camera-controls": boolean;
  "shadow-intensity": string;
}

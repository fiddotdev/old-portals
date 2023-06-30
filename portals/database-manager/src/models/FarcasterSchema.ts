import { Generated, GeneratedAlways } from 'kysely';
import {
  HashScheme,
  MessageType,
  ReactionType,
  SignatureScheme,
  UserDataType,
} from '@farcaster/hub-nodejs';

export interface FarcasterDatabase {
  hubSubscriptions: {
    host: string;
    lastEventId: number;
  };

  casts: {
    id: GeneratedAlways<string>;
    createdAt: Generated<Date>;
    updatedAt: Generated<Date>;
    deletedAt: Date | null;
    timestamp: Date;
    fid: number;
    text: string;
    hash: Uint8Array;
    parentHash: Uint8Array | null;
    parentFid: number | null;
    parentUrl: string | null;
    embeds: Generated<string[]>;
    mentions: Generated<number[]>;
    mentionsPositions: Generated<number[]>;
  };

  messages: {
    id: GeneratedAlways<string>;
    createdAt: Generated<Date>;
    updatedAt: Generated<Date>;
    deletedAt: Date | null;
    revokedAt: Date | null;
    prunedAt: Date | null;
    fid: number;
    messageType: MessageType;
    timestamp: Date;
    hash: Uint8Array;
    hashScheme: HashScheme;
    signature: Uint8Array;
    signatureScheme: SignatureScheme;
    signer: Uint8Array;
    raw: Uint8Array;
  };

  reactions: {
    id: GeneratedAlways<string>;
    createdAt: Generated<Date>;
    updatedAt: Generated<Date>;
    deletedAt: Date | null;
    fid: number;
    reactionType: ReactionType;
    timestamp: Date;
    hash: Uint8Array;
    targetHash: Uint8Array | null;
    targetFid: number | null;
    targetUrl: string | null;
  };

  signers: {
    id: GeneratedAlways<string>;
    createdAt: Generated<Date>;
    updatedAt: Generated<Date>;
    deletedAt: Date | null;
    timestamp: Date;
    fid: number;
    custodyAddress: Uint8Array;
    signer: Uint8Array;
    name: string | null;
    hash: Uint8Array;
  };

  verifications: {
    id: GeneratedAlways<string>;
    createdAt: Generated<Date>;
    updatedAt: Generated<Date>;
    deletedAt: Date | null;
    fid: number;
    timestamp: Date;
    hash: Uint8Array;
    claim: {
      address: string;
      ethSignature: string;
      blockHash: string;
    };
  };

  userData: {
    id: GeneratedAlways<string>;
    createdAt: Generated<Date>;
    updatedAt: Generated<Date>;
    deletedAt: Date | null;
    timestamp: Date;
    fid: number;
    hash: Uint8Array;
    type: UserDataType;
    value: string;
  };

  fids: {
    fid: number;
    createdAt: Generated<Date>;
    updatedAt: Generated<Date>;
    custodyAddress: Uint8Array;
  };

  fnames: {
    fname: string;
    createdAt: Generated<Date>;
    updatedAt: Generated<Date>;
    custodyAddress: Uint8Array;
    expiresAt: Date;
  };

  links: {
    id: GeneratedAlways<string>;
    fid: number;
    targetFid: number | null;
    type: string;
    timestamp: Date;
    createdAt: Generated<Date>;
    updatedAt: Generated<Date>;
    displayTimestamp: Date | null;
    deletedAt: Date | null;
  };
}

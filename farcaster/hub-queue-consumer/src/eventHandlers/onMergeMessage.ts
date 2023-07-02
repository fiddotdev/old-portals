import {
  CastAddMessage,
  CastRemoveMessage,
  isCastAddMessage,
  isCastRemoveMessage,
  isLinkAddMessage,
  isLinkRemoveMessage,
  isReactionAddMessage,
  isReactionRemoveMessage,
  isSignerAddMessage,
  isSignerRemoveMessage,
  isUserDataAddMessage,
  isVerificationAddEthAddressMessage,
  isVerificationRemoveMessage,
  LinkAddMessage,
  LinkRemoveMessage,
  Message,
  ReactionAddMessage,
  ReactionRemoveMessage,
  SignerAddMessage,
  SignerRemoveMessage,
  UserDataAddMessage,
  VerificationAddEthAddressMessage,
  VerificationRemoveMessage,
} from '@farcaster/hub-nodejs';
import { storeMessages } from './storeMessages';
import { onCastAdd } from './onCastAdd';
import { onCastRemove } from './onCastRemove';
import { onReactionAdd } from './onReactionAdd';
import { onReactionRemove } from './onReactionRemove';
import { onVerificationAddEthAddress } from './onVerificationAddEthAddress';
import { onVerificationRemove } from './onVerificationRemove';
import { onSignerAdd } from './onSignerAdd';
import { onSignerRemove } from './onSignerRemove';
import { onUserDataAdd } from './onUserDataAdd';
import { onLinkAdd } from './onLinkAdd';
import { onLinkRemove } from './onLinkRemove';

const onMergeMessage = async (messages: Message[]) => {
  if (!messages.length) return;

  const firstMessage = messages[0];
  const isInitialCreation = await storeMessages(messages, 'merge');

  if (isCastAddMessage(firstMessage)) {
    await onCastAdd(messages as CastAddMessage[], isInitialCreation);
  } else if (isCastRemoveMessage(firstMessage)) {
    await onCastRemove(messages as CastRemoveMessage[]);
  } else if (isReactionAddMessage(firstMessage)) {
    await onReactionAdd(messages as ReactionAddMessage[], isInitialCreation);
  } else if (isReactionRemoveMessage(firstMessage)) {
    await onReactionRemove(messages as ReactionRemoveMessage[]);
  } else if (isVerificationAddEthAddressMessage(firstMessage)) {
    await onVerificationAddEthAddress(
      messages as VerificationAddEthAddressMessage[],
      isInitialCreation
    );
  } else if (isVerificationRemoveMessage(firstMessage)) {
    await onVerificationRemove(messages as VerificationRemoveMessage[]);
  } else if (isSignerAddMessage(firstMessage)) {
    await onSignerAdd(messages as SignerAddMessage[], isInitialCreation);
  } else if (isSignerRemoveMessage(firstMessage)) {
    await onSignerRemove(messages as SignerRemoveMessage[]);
  } else if (isUserDataAddMessage(firstMessage)) {
    await onUserDataAdd(messages as UserDataAddMessage[], isInitialCreation);
  } else if (isLinkAddMessage(firstMessage)) {
    await onLinkAdd(messages as LinkAddMessage[], isInitialCreation);
  } else if (isLinkRemoveMessage(firstMessage)) {
    await onLinkRemove(messages as LinkRemoveMessage[]);
  }
};

export { onMergeMessage };

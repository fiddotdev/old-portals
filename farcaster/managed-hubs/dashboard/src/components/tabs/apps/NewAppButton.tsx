import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import useStore from '@/lib/useStore';
import { useAppStore } from '@/lib/zustand/useAppStore';
import { DialogClose } from '@radix-ui/react-dialog';
import { generateId } from '@/lib/utils';

const NewAppButton = () => {
  const [addingNew, setAddingNew] = useState<boolean>(false);
  const [newAppItem, setNewAppItem] = useState<
    'mainnet-playground' | 'shared-mainnet' | 'dedicated-mainnet'
  >('mainnet-playground');
  const [appName, setAppName] = useState<string>('');
  const [btnDisabled, setBtnDisabled] = useState<{
    disabled: boolean;
    message?: string;
  }>({
    disabled: false,
  });
  const [hasTextChanged, setHasTextChanged] = useState<boolean>(false);
  const appStore = useStore(useAppStore, (store) => store);

  useEffect(() => {
    if (appName === '') {
      setBtnDisabled({
        disabled: true,
        message: 'App name cannot be empty!',
      });
    } else if (
      appStore?.apps &&
      appStore?.apps.filter((i) => i.appPlan === 'mainnet-playground').length >
        0 &&
      newAppItem === 'mainnet-playground'
    ) {
      setBtnDisabled({
        disabled: true,
        message: 'You can only have one Mainnet Playground App',
      });
    } else {
      setBtnDisabled({
        disabled: false,
        message: undefined,
      });
    }
  }, [appName, appStore?.apps, newAppItem]);

  const createNewApp = () => {
    setAppName('');
    setBtnDisabled({
      disabled: false,
      message: undefined,
    });
    setHasTextChanged(false);
    appStore?.setApps([
      ...appStore?.apps,
      {
        appId: generateId(6),
        appName,
        appPlan: newAppItem,
        apiKey: generateId(12),
        hubUrl: 'https://google.com',
        createdAt: new Date(),
      },
    ]);
  };
  return (
    <Dialog>
      <DropdownMenu
        onOpenChange={() => setAddingNew(!addingNew)}
        defaultOpen={false}
      >
        <DropdownMenuTrigger asChild>
          <button
            onClick={() => {
              setAddingNew(!addingNew);
            }}
            className={`w-14 h-14 bg-purple-400/50 rounded-full absolute bottom-4 right-4 flex items-center justify-center transition-all ease-in-out ${
              addingNew ? 'rotate-[315deg]' : 'rotate-0'
            }`}
          >
            <PlusIcon color={'black'} size={45} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>New App</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DialogTrigger asChild>
              <button
                onClick={() => setNewAppItem('mainnet-playground')}
                className="text-md font-bold text-primary"
              >
                Mainnet Playground
              </button>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DialogTrigger asChild>
              <button
                onClick={() => setNewAppItem('shared-mainnet')}
                className="text-md font-bold text-primary"
              >
                Shared Mainnet
              </button>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DialogTrigger asChild>
              <button
                onClick={() => setNewAppItem('dedicated-mainnet')}
                className="text-md font-bold text-primary"
              >
                Dedicated Mainnet
              </button>
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Mainnet Playground</DialogTitle>
          <DialogDescription>
            Get access to a restricted Mainnet Hub on Farcaster for free!
            <br />- Unlimited Reads
            <br />- Max 1,000 / writes / month
            <br />
            -Max 1 Mainnet Playground App
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              App Name
            </Label>
            <Input
              id="name"
              value={appName}
              onChange={(e) => {
                setAppName(e.currentTarget.value);
                setTimeout(() => {
                  // Don't automatically change bcz it changes so fast you get some weird UI shift lol
                  setHasTextChanged(true);
                }, 250);
              }}
              placeholder="My Cool App"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogClose asChild>
          <Button
            onClick={createNewApp}
            disabled={btnDisabled.disabled}
            type="submit"
          >
            Create
          </Button>
        </DialogClose>
        {btnDisabled.disabled && btnDisabled.message && hasTextChanged ? (
          <h1 className="text-red-500">{btnDisabled.message}</h1>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export { NewAppButton };

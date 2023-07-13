import useStore from '@/lib/useStore';
import { useAppStore } from '@/lib/zustand/useAppStore';
import { NewAppButton } from './apps/NewAppButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { DropdownMenuSeparator } from '../ui/dropdown-menu';
import { CheckCircleIcon, ClipboardIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

const AppsPage = () => {
  const appStore = useStore(useAppStore, (store) => store);
  const [apiKeyCopied, setApiKeyCopied] = useState<boolean>(false);
  const [hubURLCopied, setHubURLCopied] = useState<boolean>(false);

  const deleteApp = (id: string) => {
    appStore?.setApps(appStore.apps.filter((app) => app.appId !== id));
  };

  return (
    <div className="w-full min-h-screen bg-white relative p-6 flex flex-col space-y-2">
      <h1 className="text-6xl font-bold text-black py-4">My Apps</h1>
      {appStore?.apps.map((app) => (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{app.appName}</CardTitle>
            <CardDescription>
              {app.appPlan === 'mainnet-playground'
                ? 'Mainnet Playground'
                : app.appPlan === 'shared-mainnet'
                ? 'Shared Mainnet'
                : 'Dedicated Mainnet'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-0">
              <h1 className="text-md font-bold text-black pb-2">API Key</h1>
              <Card
                onClick={() => {
                  navigator.clipboard.writeText(app.apiKey);
                  setApiKeyCopied(true);
                  setTimeout(() => {
                    setApiKeyCopied(false);
                  }, 1000);
                }}
                className="w-[300px] p-2 relative flex items-center cursor-pointer"
              >
                <CardContent className="p-0">
                  {'●'.repeat(app.apiKey.length)}
                </CardContent>
                {apiKeyCopied ? (
                  <CheckCircleIcon
                    color={'green'}
                    size={18}
                    className="absolute right-2"
                  />
                ) : (
                  <ClipboardIcon
                    color={'black'}
                    size={18}
                    className="absolute right-2"
                  />
                )}
              </Card>
            </div>
            <div className="flex flex-col space-y-0">
              <h1 className="text-md font-bold text-black pb-2">Hub RPC URL</h1>
              <Card
                onClick={() => {
                  navigator.clipboard.writeText(app.apiKey);
                  setHubURLCopied(true);
                  setTimeout(() => {
                    setHubURLCopied(false);
                  }, 1000);
                }}
                className="w-[300px] p-2 relative flex items-center cursor-pointer"
              >
                <CardContent className="p-0">
                  {'●'.repeat(app.apiKey.length)}
                </CardContent>
                {hubURLCopied ? (
                  <CheckCircleIcon
                    color={'green'}
                    size={18}
                    className="absolute right-2"
                  />
                ) : (
                  <ClipboardIcon
                    color={'black'}
                    size={18}
                    className="absolute right-2"
                  />
                )}
              </Card>
            </div>
          </CardContent>
          <CardFooter className="flex">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your App.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteApp(app.appId)}
                    className="bg-destructive"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
      <NewAppButton />
    </div>
  );
};

export default AppsPage;

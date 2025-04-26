import { FC, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  message?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'default' | 'destructive' | 'secondary' | 'blue';
}

const ConfirmDialog: FC<Props> = ({
  open,
  onOpenChange,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Yes',
  cancelText = 'Cancel',
  confirmColor = 'destructive',
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error('Confirmation failed:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md rounded-2xl bg-white shadow-lg'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-gray-800'>
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className='text-sm text-gray-700'>{message}</div>

        <DialogFooter className='pt-4'>
          <Button variant='secondary' onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>
          <Button variant={confirmColor} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;

import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Room } from '@/services/roomsService';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room: Room;
}

const RoomDetailDialog: FC<Props> = ({ open, onOpenChange, room }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='rounded-2xl bg-white p-6 shadow-lg'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold text-gray-800'>
            Room Details
          </DialogTitle>
        </DialogHeader>

        <div className='mt-4 space-y-2 text-gray-700'>
          <div>
            <strong>Room ID:</strong> {room.id}
          </div>
          <div>
            <strong>Building ID:</strong> {room.buildingId}
          </div>
          <div>
            <strong>Max Capacity:</strong> {room.maxCapacity}
          </div>
          <div>
            <strong>Current Students:</strong> {room.currentStudents}
          </div>
          <div>
            <strong>Underoccupied:</strong> {room.underoccupied ? 'Yes' : 'No'}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetailDialog;

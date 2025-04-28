import { useState, useEffect } from 'react';
import RoomHeader from './components/RoomsHeader';
import RoomFilter from './components/RoomsFilter';
import RoomTable from './components/RoomsTable';
import RoomDetailDialog from './components/RoomsDetailDialog';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import {
  Room,
  getAllRooms,
  getRoomsByBuilding,
  getUnderoccupiedRooms,
  getUnderoccupiedRoomsByBuilding,
} from '@/services/roomsService';
import { toast } from 'react-hot-toast';

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [mode, setMode] = useState<'all' | 'underoccupied'>('all');

  const fetchRooms = async (
    currentMode: 'all' | 'underoccupied',
    currentBuilding: string,
  ) => {
    try {
      let data: Room[] = [];
      if (currentBuilding === 'all') {
        if (currentMode === 'all') {
          data = await getAllRooms();
        } else {
          data = await getUnderoccupiedRooms();
        }
      } else {
        if (currentMode === 'all') {
          data = await getRoomsByBuilding(currentBuilding);
        } else {
          data = await getUnderoccupiedRoomsByBuilding(currentBuilding);
        }
      }
      setRooms(data);
    } catch (error) {
      console.error('Fetch rooms error:', error);
      toast.error('Failed to fetch rooms');
    }
  };

  useEffect(() => {
    fetchRooms(mode, selectedBuilding);
  }, [mode, selectedBuilding]);

  useEffect(() => {
    let result = [...rooms];

    if (searchQuery) {
      result = result.filter((room) =>
        room.room_id?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (sortOrder === 'asc') {
      result.sort((a, b) => (a.room_id || '').localeCompare(b.room_id || ''));
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => (b.room_id || '').localeCompare(a.room_id || ''));
    }

    setFilteredRooms(result);
  }, [rooms, searchQuery, sortOrder]);

  const handleModeToggle = () => {
    // Reset toàn bộ state về ban đầu
    setRooms([]);
    setFilteredRooms([]);
    setSearchQuery('');
    setSelectedBuilding('all');
    setSortOrder('none');
    setSelectedRoom(null);
    setOpenDialog(false);
    setMode((prev) => (prev === 'all' ? 'underoccupied' : 'all'));
  };

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex flex-1 flex-col justify-between bg-gray-100'>
          <div className='px-8 py-6'>
            <RoomHeader />
            <div className='rounded-xl bg-white p-6 shadow-md'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-[20px] font-semibold'>
                  {mode === 'all'
                    ? 'All Rooms List'
                    : 'Underoccupied Rooms List'}
                </h2>
                <button
                  className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
                  onClick={handleModeToggle}
                >
                  {mode === 'all'
                    ? 'Show Underoccupied Rooms'
                    : 'Show All Rooms'}
                </button>
              </div>

              <RoomFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedBuilding={selectedBuilding}
                setSelectedBuilding={setSelectedBuilding}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              <div className='mt-4 rounded-md border'>
                <RoomTable
                  rooms={filteredRooms}
                  onView={(room) => {
                    setSelectedRoom(room);
                    setOpenDialog(true);
                  }}
                />
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>

      {selectedRoom && (
        <RoomDetailDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          room={selectedRoom}
        />
      )}
    </div>
  );
};

export default Rooms;

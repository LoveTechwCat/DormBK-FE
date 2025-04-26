// src/services/roomService.ts
import axios from 'axios';

export interface Room {
  id: string;
  buildingId: string;
  maxCapacity: number;
  currentStudents: number;
  underoccupied: boolean;
}

export const getUnderoccupiedRooms = async (): Promise<Room[]> => {
  const res = await axios.get<Room[]>('/api/rooms/underoccupied');

  return res.data;
};

export const getUnderoccupiedRoomsByBuilding = async (
  buildingId: string,
): Promise<Room[]> => {
  const res = await axios.get<Room[]>(`/api/rooms/underoccupied/${buildingId}`);
  return res.data;
};

export const checkUnderoccupiedRoom = async (
  buildingId: string,
  roomId: string,
): Promise<Room[]> => {
  const res = await axios.get<Room[]>(
    `/api/rooms/underoccupied/${buildingId}/${roomId}`,
  );
  return res.data;
};

import apiClient from "@/lib/axios";

export const createRoom = async (coachId: string, patientId: string) => {
   try {
      const response = await apiClient.post("/message/create-room", {
         coachId,
         patientId,
      });
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const sendMessage = async (
   roomId: string,
   senderId: string,
   content: string
) => {
   try {
      const response = await apiClient.post("/message/send-message", {
         roomId,
         senderId,
         content,
      });
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const getMessages = async (roomId: string) => {
   try {
      const response = await apiClient.get(
         `/message/get-messages?roomId=${roomId}`
      );
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const createMeeting = async (
   senderId: string,
   type: string,
   date: Date,
   time: string,
   duration: number,
   notes: string,
   roomId: string
) => {
   try {
      const response = await apiClient.post("/message/create-meeting", {
         senderId,
         type,
         date,
         time,
         duration,
         notes,
         roomId,
      });
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

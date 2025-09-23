import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface UseRealtimeQueryOptions {
   queryKey: (string | number)[];
   queryFn: () => Promise<any>;
   enabled?: boolean;
   pollingInterval?: number;
   websocketUrl?: string;
   onWebSocketMessage?: (data: any) => void;
}

export const useRealtimeQuery = ({
   queryKey,
   queryFn,
   enabled = true,
   pollingInterval = 5000,
   websocketUrl,
   onWebSocketMessage,
}: UseRealtimeQueryOptions) => {
   const queryClient = useQueryClient();
   const wsRef = useRef<WebSocket | null>(null);

   // Standard React Query
   const query = useQuery({
      queryKey,
      queryFn,
      enabled,
      refetchInterval: pollingInterval,
      refetchIntervalInBackground: true,
      staleTime: 0,
   });

   // WebSocket connection for real-time updates
   useEffect(() => {
      if (!websocketUrl || !enabled) return;

      const connectWebSocket = () => {
         try {
            wsRef.current = new WebSocket(websocketUrl);

            wsRef.current.onopen = () => {
               console.log("WebSocket connected");
            };

            wsRef.current.onmessage = (event) => {
               try {
                  const data = JSON.parse(event.data);
                  onWebSocketMessage?.(data);

                  // Invalidate and refetch the query when we receive new data
                  queryClient.invalidateQueries({ queryKey });
               } catch (error) {
                  console.error("Error parsing WebSocket message:", error);
               }
            };

            wsRef.current.onclose = () => {
               console.log(
                  "WebSocket disconnected, attempting to reconnect..."
               );
               // Reconnect after 3 seconds
               setTimeout(connectWebSocket, 3000);
            };

            wsRef.current.onerror = (error) => {
               console.error("WebSocket error:", error);
            };
         } catch (error) {
            console.error("Failed to connect WebSocket:", error);
         }
      };

      connectWebSocket();

      return () => {
         if (wsRef.current) {
            wsRef.current.close();
         }
      };
   }, [websocketUrl, enabled, queryKey, queryClient, onWebSocketMessage]);

   return {
      ...query,
      isWebSocketConnected: wsRef.current?.readyState === WebSocket.OPEN,
   };
};

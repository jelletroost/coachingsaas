import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface UseSSEQueryOptions {
   queryKey: (string | number)[];
   queryFn: () => Promise<any>;
   enabled?: boolean;
   sseUrl?: string;
   onSSEMessage?: (data: any) => void;
}

export const useSSEQuery = ({
   queryKey,
   queryFn,
   enabled = true,
   sseUrl,
   onSSEMessage,
}: UseSSEQueryOptions) => {
   const queryClient = useQueryClient();
   const eventSourceRef = useRef<EventSource | null>(null);

   // Standard React Query
   const query = useQuery({
      queryKey,
      queryFn,
      enabled,
      staleTime: 0,
   });

   // Server-Sent Events for real-time updates
   useEffect(() => {
      if (!sseUrl || !enabled) return;

      const connectSSE = () => {
         try {
            eventSourceRef.current = new EventSource(sseUrl);

            eventSourceRef.current.onopen = () => {
               console.log("SSE connected");
            };

            eventSourceRef.current.onmessage = (event) => {
               try {
                  const data = JSON.parse(event.data);
                  onSSEMessage?.(data);

                  // Invalidate and refetch the query when we receive new data
                  queryClient.invalidateQueries({ queryKey });
               } catch (error) {
                  console.error("Error parsing SSE message:", error);
               }
            };

            eventSourceRef.current.onerror = (error) => {
               console.error("SSE error:", error);
            };
         } catch (error) {
            console.error("Failed to connect SSE:", error);
         }
      };

      connectSSE();

      return () => {
         if (eventSourceRef.current) {
            eventSourceRef.current.close();
         }
      };
   }, [sseUrl, enabled, queryKey, queryClient, onSSEMessage]);

   return {
      ...query,
      isSSEConnected: eventSourceRef.current?.readyState === EventSource.OPEN,
   };
};

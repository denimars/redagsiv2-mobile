import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { DevToolsBubble } from "react-native-react-query-devtools";

const queryClient = new QueryClient();

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <DevToolsBubble queryClient={queryClient} />
    </QueryClientProvider>
  );
}

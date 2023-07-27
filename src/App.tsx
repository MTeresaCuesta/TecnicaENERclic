// COMPONENTS
import { AppRoutes } from "./routes/AppRoutes";
// CONTEXT
import { AppContextProvider } from "./context/AppContext";
// MATERIAL UI
import { Container } from "@mui/material";

function App() {
  return (
    <AppContextProvider>
      <Container maxWidth="lg">
        <AppRoutes />
      </Container>
    </AppContextProvider>
  );
}

export default App;

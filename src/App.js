import { AppRoutes } from "./routes/AppRoutes";
import { Container } from "@mui/material";
import { AppContextProvider } from "./context/AppContext";

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

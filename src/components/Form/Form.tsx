import { useContext, useState } from "react";
import {
  Box,
  Container,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// HANDLERS
import { getDataHandler } from "../../server/handlers/form-handlers";
// CONTEXT
import { AppContext } from "../../context/AppContext";
// DATA
import { categories } from "../../utils/ApiData";
import "./Form.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const initialValue = {
  lang: "",
  category: "",
  widget: "",
  startDate: "2022-11-01",
  endDate: "2022-11-15",
  timeTrunc: "day",
  geoTrunc: "",
  geoLimit: "",
  geoIds: "",
};

const randomColors = ["#FF5733", "#3399FF", "#FF33FF", "#33FF99", "#FFFF33", "#9933FF", "#33FFFF"];
const lineColors = ["#FF5733", "#3399FF", "#FF33FF", "#33FF99", "#FFFF33", "#9933FF", "#33FFFF"];

export const Form = () => {
  const { setGraphics } = useContext(AppContext);
  const [search, setSearch] = useState(initialValue);
  const [dateError, setDateError] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handleSnackbarClose = () => {
    setErrorOpen(false);
  };

  const handleClick = () => {
    // Validar si hay campos vacíos
    const requiredFields = ["lang", "category", "widget", "startDate", "endDate", "timeTrunc"];
    const isAnyFieldEmpty = requiredFields.some((field) => !search[field]);

    if (isAnyFieldEmpty) {
      setErrorOpen(true);
    } else if (new Date(search.startDate) > new Date(search.endDate)) {
      setDateError(true);
    } else {
      setDateError(false);
      getDataHandler(search).then((response) => {
        // Guardar en el context el resultado
        const { included } = response;
        setGraphics(included);
      });
    }
  };

  const handleCloseErrorModal = () => {
    setErrorOpen(false);
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "aliceblue",
        padding: "20px",
      }}
    >
      <Container maxWidth="xs">
        <form>
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            Comparative graphs
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" align="center">
              Form
            </Typography>
          </Box>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id="language">Language</InputLabel>
            <Select
              name="lang"
              id="language"
              value={search.lang}
              label="Language"
              variant="standard"
              onChange={handleChange}
            >
              <MenuItem value={"es"}>Spanish</MenuItem>
              <MenuItem value={"en"}>English</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id="category">Category</InputLabel>
            <Select
              name="category"
              id="category"
              value={search.category}
              label="Category"
              variant="standard"
              onChange={handleChange}
            >
              {categories.map((elem: any, index: number) => (
                <MenuItem key={index} value={elem.name}>
                  {elem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id="widget">Widget</InputLabel>
            <Select
              name="widget"
              id="widget"
              value={search.widget}
              label="Widget"
              variant="standard"
              onChange={handleChange}
            >
              <MenuItem value={categories[0].widge[0].name}>
                {categories[0].widge[0].name}
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <TextField
              name="startDate"
              id="startDate"
              label="Start Date"
              type="date"
              variant="standard"
              onChange={handleChange}
              value={search.startDate}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              name="endDate"
              id="endDate"
              label="End Date"
              type="date"
              variant="standard"
              value={search.endDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <FormLabel id="time_trunc">Duration</FormLabel>
            <RadioGroup
              aria-labelledby="time_trunc"
              defaultValue="day"
              name="timeTrunc"
              onChange={handleChange}
            >
              <FormControlLabel value="day" control={<Radio />} label="Day" />
              <FormControlLabel value="month" control={<Radio />} label="Month" />
              <FormControlLabel value="year" control={<Radio />} label="Year" />
            </RadioGroup>
          </FormControl>

          <Box sx={{ py: 2 }}>
            <Button color="warning" size="large" variant="contained" onClick={handleClick}>
              Submit
            </Button>
          </Box>

          {dateError && (
            <Typography variant="body2" color="error">
              The end date cannot be before the start date.
            </Typography>
          )}
        </form>
      </Container>

      {/* Modal de error */}
      <Dialog open={errorOpen} onClose={handleCloseErrorModal}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>Please complete all fields before submitting the form.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

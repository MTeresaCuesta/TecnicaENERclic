// DEPENDENCIES
import React, { useContext, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// HANDLERS
import { getDataHandler } from "../../server/handlers/form-handlers";
// CONTEXT
import { AppContext } from "../../context/AppContext";
// DATA
import { categories, filterWidgetsByCategory } from "../../utils/FormData";
// MATERIAL UI
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
// STYLES
import "./Form.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Search {
  lang: string;
  category: string;
  widget: string;
  startDate: string;
  endDate: string;
  timeTrunc: string;
  geoTrunc: string;
  geoLimit: string;
  geoIds: string;
}

const initialValue: Search = {
  lang: "",
  category: "",
  widget: "",
  startDate: "dd-mm-aaaa",
  endDate: "dd-mm-aaaa",
  timeTrunc: "day",
  geoTrunc: "",
  geoLimit: "",
  geoIds: "",
};

export const Form = () => {
  const { setGraphics } = useContext(AppContext);
  const [search, setSearch] = useState(initialValue);
  const [dateError, setDateError] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleChange = (
    event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setSearch({ ...search, [name]: value });
  };

  const handleClick = () => {
    // Validar si hay campos vacíos
    const requiredFields: string[] = [
      "lang",
      "category",
      "widget",
      "startDate",
      "endDate",
      "timeTrunc",
    ];
    const isAnyFieldEmpty = requiredFields.some(
      (field: string) => !search[field]
    );

    if (isAnyFieldEmpty) {
      setErrorOpen(true);
    } else if (new Date(search.startDate) > new Date(search.endDate)) {
      setDateError(true);
    } else {
      setDateError(false);
      getDataHandler(search).then((response) => {
        // Guardar en el context el resultado
        const { included } = response;
        setGraphics({ search: search, data: included });
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
        alignItems: "center",
        minHeight: "75vh",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        marginTop: "50px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: "Cormorant Garamond, serif",
            fontWeight: 600,
            color: "#333",

          }}
        >
          COMPARATIVE GRAPHS
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
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

        <FormControl fullWidth sx={{ mb: 2 }}>
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

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="widget">Widget</InputLabel>
          <Select
            name="widget"
            id="widget"
            value={search.widget}
            label="Widget"
            variant="standard"
            onChange={handleChange}
          >
            {filterWidgetsByCategory(search.category).map((widget) => {
              return (
                <MenuItem key={widget.name} value={widget.name}>
                  {widget.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <FormControl fullWidth sx={{ mb: 2, width: "70%" }}>
                <TextField
                  name="startDate"
                  id="startDate"
                  label="Start Date"
                  type="date"
                  variant="standard"
                  onChange={handleChange}
                  value={search.startDate}
                  InputProps={{ style: { width: "100%" } }}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, width: "70%" }}>
                <TextField
                  name="endDate"
                  id="endDate"
                  label="End Date"
                  type="date"
                  variant="standard"
                  value={search.endDate}
                  onChange={handleChange}
                  InputProps={{ style: { width: "100%" } }}
                />
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
          <FormLabel component="legend">Duration</FormLabel>
          <RadioGroup
            aria-label="timeTrunc"
            name="timeTrunc"
            value={search.timeTrunc}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="day" control={<Radio />} label="Day" />
            <FormControlLabel
              value="month"
              control={<Radio />}
              disabled
              label="Month"
            />
            <FormControlLabel
              value="year"
              control={<Radio />}
              disabled
              label="Year"
            />
          </RadioGroup>
        </FormControl>

        <Box sx={{ py: 2 }}>
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={handleClick}
            fullWidth
          >
            Submit
          </Button>
        </Box>

        {dateError && (
          <Typography variant="body2" color="error" align="center">
            The end date cannot be before the start date.
          </Typography>
        )}
      </Container>

      {/* Modal de error */}
      <Dialog open={errorOpen} onClose={handleCloseErrorModal}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please complete all fields before submitting the form.
          </DialogContentText>
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

// DEPENDENCIES
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
  startDate: "2022/11/01",
  endDate: "2022/11/15",
  timeTrunc: "day",
  geoTrunc: "",
  geoLimit: "",
  geoIds: "",
};

export const Form = () => {
  const { setGraphics } = useContext(AppContext);
  const [search, setSearch] = useState(initialValue);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handleClick = () => {
    getDataHandler(search).then((response) => {
      // Guardar en el context el resultado
      const { included } = response;
      setGraphics(included);
    });
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          background: "linear-gradient(to bottom, pink, white);",
        }}
      >
        <Container maxWidth="xs">
          <form>
            <Box
              sx={{
                my: 3,
              }}
            >
              <Typography color="textPrimary" variant="h4" align="center">
                Gráficos comparativos de la red eléctrica
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "pink",
                my: 3,
              }}
            >
              <Typography color="textPrimary" variant="h4" align="center">
                Formulario
              </Typography>
            </Box>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="language">Language</InputLabel>
              <Select
                name="lang"
                id="language"
                value={search.lang}
                label="language"
                variant="standard"
                onChange={handleChange}
              >
                <MenuItem value={"es"}>Spanish</MenuItem>
                <MenuItem value={"en"}>English</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="category">Categoria</InputLabel>
              <Select name="category" id="category" value={search.category} label="category" onChange={handleChange}>
                {categories.map((elem: any, index: number) => {
                  return (
                    <MenuItem key={index} value={elem.name}>
                      {elem.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="widget">Widget</InputLabel>
              <Select name="widget" id="widget" value={search.widget} label="widget" onChange={handleChange}>
                <MenuItem value={categories[0].widge[0].name}>{categories[0].widge[0].name}</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                name="startDate"
                id="startDate"
                label="Fecha de inicio"
                type="date"
                onChange={handleChange}
                value={search.startDate}
              ></TextField>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                name="endDate"
                id="endDate"
                label="Fecha final"
                type="date"
                value={search.endDate}
                onChange={handleChange}
              ></TextField>
            </FormControl>

            <FormControl>
              <FormLabel id="time_trunc">Medición de tiempo</FormLabel>
              <RadioGroup aria-labelledby="time_trunc" defaultValue="day" name="timeTrunc" onChange={handleChange}>
                <FormControlLabel value="day" control={<Radio />} label="Días" />
                <FormControlLabel value="month" control={<Radio />} label="Meses" />
                <FormControlLabel value="year" control={<Radio />} label="Años" />
              </RadioGroup>
            </FormControl>

            <Box sx={{ py: 2 }}>
              <Button color="primary" size="large" variant="contained" onClick={handleClick}>
                Ejecutar
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

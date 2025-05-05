import './App.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CardContainer from './CardContainer';


//Material Ui //
import Container from '@mui/material/Container';



const theme = createTheme({
  typography: {
    fontFamily: ['zain'],
  },
  palette: {
    primary: {
      main: '#ffffff'
    }
  }
});

function App() {

  
  return (

    <ThemeProvider theme={theme}>

      <div className="App"  >

        <Container maxWidth="sm" >

          <CardContainer langDir="" />



        </Container>

      </div>
    </ThemeProvider>

    

  );
}

export default App;

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Layout from "../../pages/Layout.jsx";
import MainPage from "../../pages/MainPage.jsx";
import NotFound from "../../pages/NotFound.jsx";
import TestPage from "../../pages/TestPage";
import PalettePage, {paletteLoader} from "../../pages/PalettePage.jsx";
import CategoryPage from "../../pages/CategoryPage.jsx";
import AddPalette from "../../pages/AddPalette.jsx";
import PalettesPage from "../../pages/PalettesPage.jsx";
import LoginPage from "../../pages/LoginPage.jsx";
import UserProfilePage from "../../pages/UserProfilePage.jsx";
import FeedbackPage from "../../pages/FeedbackPage.jsx";
import FavoritesPage from "../../pages/FavoritesPage.jsx";
import RequireAuth from "../../hoc/RequireAuth.jsx";
import {AuthProvider} from "../../hoc/AuthProvider";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#7a058e'
    },
    header: {
      main: '#121212'
    },
    common: {
      // first: '#212224',
      first: '#2122248a',
      second: '#292A2C'
    },
    background: {
      default: '#191A1C'
    },
    text: {
      primary: '#eaeaea',
      myMain: '#1f1f1f'
    },
  }
})

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
})


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
    <Route index element={<MainPage/>}/>
    <Route path='palettes' element={<PalettesPage/>}/>
    <Route path='feedback' element={<FeedbackPage/>}/>
    <Route path='category/:category' element={<CategoryPage/>}/>
    <Route path='palette/:id' element={<PalettePage/>} loader={paletteLoader}/>
    <Route path='palette/add' element={<RequireAuth element={<AddPalette/>}/>}/>
    <Route path='user/:id' element={<RequireAuth element={<UserProfilePage/>}/>}/>
    <Route path='palette/favorites' element={<RequireAuth element={<FavoritesPage/>}/>}/>

    <Route path='login' element={<LoginPage/>}/>
    <Route path='test/:category' element={<TestPage/>}/>
    <Route path='*' element={<NotFound/>}/>
  </Route>
))

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </AuthProvider>
)
export default App;
import {Route, Routes} from 'react-router';
import AddDish from './pages/add-dish/add-dish.tsx';
import Header from './components/header/header.tsx';
function App() {
return (
<>
<Header/>
<div className="container">
<Routes>
<Route path="/add-dish" element={<AddDish/>}/>
</Routes>
</div>
</>
);
}
export default App;
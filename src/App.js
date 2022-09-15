import "./index.css";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import BalancePage from "./pages/BalancePage";
import BatchUploadPage from "./pages/BatchUploadPage";
import CheckPricePage from "./pages/CheckPricePage";

function App() {
	return (
		<div>
			<Navbar />
			<AboutPage />
			<BalancePage />
			<BatchUploadPage />
			<CheckPricePage />
		</div>
	);
}

export default App;

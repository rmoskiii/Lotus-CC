import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="bg-white shadow-md px-6 py-4 flex gap-6">
        <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-800">Login</Link>
        <Link to="/dashboard" className="font-semibold text-indigo-600 hover:text-indigo-800">Dashboard</Link>
        <Link to="/customers" className="font-semibold text-indigo-600 hover:text-indigo-800">Customers</Link>
        <Link to="/onboarding" className="font-semibold text-indigo-600 hover:text-indigo-800">Onboarding</Link>
        <Link to="/audit" className="font-semibold text-indigo-600 hover:text-indigo-800">Audit</Link>
    </nav>
);

export default Navbar;

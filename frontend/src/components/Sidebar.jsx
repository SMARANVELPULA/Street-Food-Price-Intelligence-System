import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/price-analysis">Price Analysis</Link></li>
        <li><Link to="/inflation-analysis">Inflation Analysis</Link></li>
        <li><Link to="/map">Map View</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
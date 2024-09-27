// import React from 'react';
// import './Header.css'; // Adjust the path if necessary

// import PropTypes from 'prop-types';
// import { Link } from "react-router-dom";

// export default function Header(props) {
//     return (
//         <nav class="navbar navbar-expand-lg bg-body-tertiary">
//   <div class="container-fluid">
//     <a class="navbar-brand" href="#">Navbar</a>
//     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//       <span class="navbar-toggler-icon"></span>
//     </button>
//     <div class="collapse navbar-collapse" id="navbarNav">
//       <ul class="navbar-nav">
//         <li class="nav-item">
//           <a class="nav-link active" aria-current="page" href="#">Home</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="#">Features</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="#">Pricing</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link disabled" aria-disabled="true">Disabled</a>
//         </li>
        
//         <li class="nav-item">
//           <a class="nav-link" href="/events">Events</a> 
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>

    
//     );
// }

// Header.defaultProps = {
//     title: "Your Title Here",
//     searchBar: true
// }

// Header.propTypes = {
//     title: PropTypes.string,
//     searchBar: PropTypes.bool.isRequired
// }





import React from 'react';
import './Header.css'; // Adjust the path if necessary
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export default function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">EventBuddy</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/events">Events</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

Header.defaultProps = {
    title: "Your Title Here",
    searchBar: true
}

Header.propTypes = {
    title: PropTypes.string,
    searchBar: PropTypes.bool.isRequired
}

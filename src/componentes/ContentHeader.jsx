import React from 'react';
import { Link } from 'react-router-dom';

const ContentHeader = ({ titulo, breadCrumb1, breadCrumb2, breadCrumb3, ruta }) => {
    return (
        <div className="pagetitle">
            <h1>{titulo}</h1>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">{breadCrumb1}</li>
                    {breadCrumb2 === "" ? <li>&nbsp;</li> : <li className="breadcrumb-item"><Link to={ruta}>{breadCrumb2}</Link></li>}
                    {breadCrumb3 === "" ? <li>&nbsp;</li> : <li className="breadcrumb-item active">{breadCrumb3}</li>}
                </ol>
            </nav>
        </div>
    );
}

export default ContentHeader;
import { useState } from "react";
import { adminSections } from "../../data/adminSections";
import NoOptionSelected from "./NoOptionSelected";
import '../../styles/pages/admin.css';


const AdminPage = () => {

  const [selectedOption, setSelectedOption] = useState(undefined);
  
  const selectedSection = adminSections.find(section => section.id === selectedOption);
  const SelectedComponent = selectedSection?.component || NoOptionSelected;

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-2 admin-navbar">
          <h3><a href="/">BeautyBloom</a><span>Admin</span></h3>
          <hr />
          <div className="admin-options">
            {
              adminSections.map((section) => {
                return <div key={section.id}>
                    <button onClick={() => setSelectedOption(section.id)}>{section.title}</button>
                    <hr />
                  </div>
              })
            }
          </div>
        </div>
        <div className="col-sm-12 col-md-10 admin-content">
          <SelectedComponent />
        </div>
      </div>
    </>
  );
};

export default AdminPage;
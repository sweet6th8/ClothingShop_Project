import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../API/ApiClient";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/admin/product');
        const products = response.data; // Assuming this is an array of products

        // Define columns based on your data structure
        const columns = [
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'name', headerName: 'Name', width: 600 },
          { 
            field: 'price', 
            headerName: 'Price', 
            width: 120,
                
             
          },
          // Add other columns as needed
          { field: 'action', headerName: 'Action', width: 200, renderCell: (params) => (
            <div className="cellAction">
              <Link to={`/products/${params.row.id}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">View</div>
              </Link>
              <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
                Delete
              </div>
            </div>
          )}
        ];

        setData(products);
        setColumns(columns);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    // Implement delete logic here
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;

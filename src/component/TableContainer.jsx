import { Button, Modal, Table } from "antd";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TableContainer = () => {
  // State to manage the data source for the table
  const [dataSource, setDataSource] = useState([
    // Initial data for the table
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      brand: "Apple",
      category: "smartphones",
      price: 549,
      discount: 12.96,
      rating: 4.69,
      stock: 94,
    },
    {
      id: 2,
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...	",
      brand: "Apple",
      category: "smartphones",
      price: 899,
      discount: 17.94,
      rating: 4.44,
      stock: 34,
    },
    {
      id: 3,
      title: "Samsung Universe 9",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe	",
      brand: "Samsung",
      category: "smartphones",
      price: 1249,
      discount: 15.46,
      rating: 4.09,
      stock: 36,
    },
    {
      id: 4,
      title: "OPPOF19	",
      description: "OPPO F19 is officially announced on April 2021.	",
      brand: "OPPO",
      category: "smartphones",
      price: 280,
      discount: 17.91,
      rating: 4.3,
      stock: 123,
    },
  ]);
  // State to manage the visibility of the modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to manage the mode of the modal ("add" or "edit")
  const [modalMode, setModelMode] = useState("add");
  // State to manage form field values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    discount: "",
    rating: "",
    stock: "",
  });
  // State to store the ID of the product being edited
  const [editingProductId, setEditingProductId] = useState(null);
  // Function to show the modal
  const showModal = (mode, record) => {
    setModelMode(mode);
    if (mode === "edit") {
      // If editing mode, populate form with data of the selected product
      setEditingProductId(record.id);
      setFormData(record);
    } else {
      setFormData({
        // If adding mode, clear the form fields
        title: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        discount: "",
        rating: "",
        stock: "",
      });
    }
    setIsModalVisible(true);
  };
  // Function to handle modal cancelation
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Function to handle changes in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (modalMode === "add") {
      // Adding a new product
      const newProduct = {
        id: dataSource.length + 1,
        ...formData,
      };
      setDataSource([...dataSource, newProduct]);
    } else if (modalMode === "edit") {
      // Editing an existing product
      const updatedDatasource = dataSource.map((item) =>
        item.id === editingProductId ? { ...item, ...formData } : item
      );
      setDataSource(updatedDatasource);
    }
    setIsModalVisible(false);
  };
  // Function to handle product deletion
  const onDeleteProduct = (record) => {
    const updatedDatasource = dataSource.filter(
      (item) => item.id !== record.id
    );
    setDataSource(updatedDatasource);
  };
  // Columns configuration for the table
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      // Render actions column with edit and delete buttons
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                showModal("edit", record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteProduct(record);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      {/* Button to trigger modal */}
      <Button onClick={() => showModal("add")}>Add Product</Button>
      {/* Table component to display data */}
      <Table
        dataSource={dataSource}
        columns={columns}
      />
      {/* Modal for adding/editing product */}
      <Modal
        title={modalMode === "add" ? "Add Product" : "Edit Product"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {/* Form for adding new product */}
        <div>
          <input
            type="text"
            name="title"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            name="description"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            name="brand"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="brand"
            value={formData.brand}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            name="category"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="number"
            name="price"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="number"
            name="discount"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="discount"
            value={formData.discount}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="number"
            name="rating"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="number"
            name="stock"
            className="mt-1 px-3 py-2 mb-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="stock"
            value={formData.stock}
            onChange={handleInputChange}
          />
        </div>

        <Button
          key="cancel"
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal>
    </div>
  );
};

export default TableContainer;

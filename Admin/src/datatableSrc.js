export const userCols = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "username",
    headerName: "User",
    width: 230,
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  { field: "email", headerName: "Email", width: 230 },
  { field: "city", headerName: "City", width: 150 },
  { field: "phone", headerName: "Phone", width: 180 },
  {
    field: "createdAt",
    headerName: "Joining Date",
    width: 150,
    renderCell: (params) => {
      return params.row.createdAt.slice(0, 10);
    },
  },
  {
    field: "isAdmin",
    headerName: "Admin",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.isAdmin}`}>
          {params.row.isAdmin ? "Admin" : "Not Admin"}
        </div>
      );
    },
  },
];

export const productCols = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Product Name",
    width: 400,
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "categories",
    headerName: "Categories",
    width: 280,
    renderCell: (params) => {
      const capArr = params.row.categories?.map((element) => {
        return (
          element.charAt(0).toUpperCase() + element.substring(1).toLowerCase()
        );
      });
      return `[ ${capArr?.join(", ")} ]`;
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    renderCell: (params) => {
      return `$ ${params.row.price}`;
    },
  },
  {
    field: "createdAt",
    headerName: "Added Date",
    width: 150,
    renderCell: (params) => {
      return params.row.createdAt.slice(0, 10);
    },
  },
];

export const orderCols = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "userId",
    headerName: "User ID",
    width: 230,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    renderCell: (params) => `$ ${params.row.amount?.toFixed(2)}`,
  },
  {
    field: "createdAt",
    headerName: "Order Date",
    width: 150,
    renderCell: (params) => {
      return params.row.createdAt.slice(0, 10);
    },
  },
  {
    field: "address",
    headerName: "Address",
    width: 300,
    renderCell: (params) => {
      return params.row.address
        ? `${params.row.address.line1 ? params.row.address.line1 + ", " : ""}${
            params.row.address.line2 ? params.row.address.line2 + ", " : ""
          }${params.row.address.city ? params.row.address.city + ", " : ""}${
            params.row.address.state ? params.row.address.state + ", " : ""
          }${
            params.row.address.country ? params.row.address.country + ", " : ""
          }${
            params.row.address.postal_code
              ? params.row.address.postal_code + "."
              : ""
          }`
        : "";
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 230,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status
            ? `${params.row.status.charAt(0).toUpperCase()}${params.row.status
                .substring(1)
                .toLowerCase()}`
            : ""}
        </div>
      );
    },
  },
];

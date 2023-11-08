import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const categories = [
  { id: 1, type: "Novels" },
  { id: 2, type: "Science" },
  { id: 3, type: "Technology" },
  { id: 4, type: "Politics" },
  { id: 5, type: "Discovery" },
];

const Categories = () => {
  const [seachParams] = useSearchParams();
  const category = seachParams.get("category");

  return (
    <>
      <Link to={`/create?category=${category || ""}`}>
        <Button
          variant="contained"
          sx={{ margin: "20px", width: "85%", backgroundColor: "#6495ED" }}
        >
          Create Blog
        </Button>
      </Link>
      <Table sx={{ border: "1px solid rgba(224,224,224,1)" }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Link to={"/"}>All Categories</Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => {
            return (
              <TableRow key={category.id}>
                <TableCell>
                  <Link to={`/?category=${category.type}`}>
                    {category.type}
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Categories;

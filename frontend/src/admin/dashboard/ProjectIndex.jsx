import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import apiFetch from "@/lib/api";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function ProjectIndex() {
  const [getProject, setGetProject] = useState([]);

  const getProjects = async () => {
    try {
      const data = await apiFetch("projects");
      console.log("ss", data);
      setGetProject(data);
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await apiFetch(`projects/project-${id}`, {
        method: "DELETE",
      });

      toast.success(response.message);

      getProjects();
    } catch (err) {
      console.error("Failed to delete project:", err);
      toast.error("Failed to delete project.", err);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <h1 className="!mb-15">Welcome Master JC!</h1>

      <Table>
        <TableCaption>A list of your recent projects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Website</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getProject.map((item, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.category?.name}</TableCell>
              <TableCell>
                <a
                  className="hover:text-red-600"
                  href={item.live_url}
                  target="_blank"
                  rel="noopener"
                >
                  {item.live_url}
                </a>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="px-4 py-2 border-2 border-red-600 bg-transparent data-[state=open]:text-white data-[state=open]:bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)] hover:text-white rounded-sm">
                    ...
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Button
                          variant="outline"
                          className="flex gap-2 items-center w-full"
                        >
                          <FaPencilAlt /> Edit
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          variant="destructive"
                          className="flex gap-2 items-center w-full"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrashAlt /> Remove
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ProjectIndex;

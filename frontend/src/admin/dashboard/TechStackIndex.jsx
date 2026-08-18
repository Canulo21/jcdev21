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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiFetch from "@/lib/api";
import { FaPencilAlt, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function TechStackIndex() {
  const [getTag, setgetTag] = useState([]);
  const [name, setName] = useState("");

  const getTags = async () => {
    try {
      const data = await apiFetch("tags");
      setgetTag(data);
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await apiFetch("add-tag", {
        method: "POST",
        body: JSON.stringify({
          name,
        }),
      });

      toast.success(data.message);
      getTags();
      setName("");
    } catch (err) {
      console.log("error", err);
      toast.error(`Failed to add new: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await apiFetch(`tags/tag-${id}`, {
        method: "DELETE",
      });

      toast.success(response.message);

      getTags();
    } catch (err) {
      console.error("Failed to delete tag:", err);
      toast.error("Failed to delete tag.");
    }
  };

  useEffect(() => {
    getTags();
  }, []);
  return (
    <>
      <h1 className="!mb-15">Welcome Master JC!</h1>

      {/* Add Form */}
      <Dialog>
        <DialogTrigger className="py-2 px-6 bg-[var(--bg-secondary)] text-white rounded-md flex gap-4 items-center float-end">
          <FaPlusCircle />
          Add Tech Stack
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="!text-xl">Add New Tech Stack</DialogTitle>
              <DialogDescription className="mb-4">
                Add a new technology to your tech stack. Enter the details below
                and click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  defaultValue="React"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableCaption>A list of your tech stack.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Name</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getTag.map((item, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell className="font-bold">{item.name}</TableCell>

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

export default TechStackIndex;

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
import apiFetch from "@/lib/api";
import { FaPencilAlt, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ReactSelect from "react-select";
import { Textarea } from "@/components/ui/textarea";

const frameworks = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
];

function ProjectIndex() {
  const [editProject, setEditProject] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [getProject, setGetProject] = useState([]);
  const [getTag, setGetTag] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    github_url: "",
    live_url: "",
    image: null,
    tags: [],
  });

  const getProjects = async () => {
    try {
      const data = await apiFetch("projects");
      setGetProject(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  const getTags = async () => {
    try {
      const data = await apiFetch("tags");
      setGetTag(data);
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
  };

  const tagOptions = getTag.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const getCategories = async () => {
    try {
      const data = await apiFetch("categories");
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("title", formData.title);
      body.append("description", formData.description);
      body.append("category_id", formData.category_id);
      body.append("github_url", formData.github_url);
      body.append("live_url", formData.live_url);
      body.append("image", formData.image);

      if (formData.image) {
        body.append("image", formData.image);
      }

      formData.tags.forEach((tag) => {
        body.append("tags[]", tag.value);
      });

      const data = await apiFetch("add-project", {
        method: "POST",
        body,
      });

      toast.success(data.message);
      getProjects();

      resetForm();
    } catch (err) {
      toast.error(`Failed to add new: ${err.message}`);
    }
  };

  const handleEdit = (item) => {
    setEditProject(item);

    setFormData({
      title: item.title || "",
      description: item.description || "",
      category_id: item.category?.id ? String(item.category.id) : "",
      github_url: item.github_url || "",
      live_url: item.live_url || "",
      image: item.image || null,

      tags: (item.tags || []).map((tag) => ({
        value: tag.id,
        label: tag.name,
      })),
    });

    setIsEditOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category_id: "",
      github_url: "",
      live_url: "",
      image: null,
      tags: [],
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("title", formData.title);
      body.append("description", formData.description);
      body.append("category_id", formData.category_id);
      body.append("github_url", formData.github_url);
      body.append("live_url", formData.live_url);

      // Tell Laravel this POST request is actually an update
      body.append("_method", "PUT");

      if (formData.image) {
        body.append("image", formData.image);
      }

      formData.tags.forEach((tag) => {
        body.append("tags[]", tag.value);
      });

      const data = await apiFetch(`projects/project-${editProject.id}`, {
        method: "POST",
        body,
      });

      toast.success(data.message);

      getProjects();

      resetForm();

      setEditProject(null);
      setIsEditOpen(false);
    } catch (err) {
      console.log("error", err);
      toast.error(`Failed to update certificate: ${err.message}`);
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
    getTags();
    getCategories();
  }, []);

  return (
    <>
      <h1 className="!mb-15">Welcome Master JC!</h1>

      {/* Add Form */}
      <Dialog>
        <DialogTrigger className="py-2 px-6 bg-[var(--bg-secondary)] text-white rounded-md flex gap-4 items-center float-end">
          <FaPlusCircle />
          Add Project
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="!text-xl">Add New Project</DialogTitle>
              <DialogDescription className="mb-4">
                Add a new project for your portfolio. Enter the details below
                and click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  placeholder="The Legen of JC"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="category">Category</Label>

                <Select
                  value={formData.category_id}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category_id: value,
                    })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <Label htmlFor="tag">Tags</Label>
                <ReactSelect
                  defaultValue={frameworks[1]}
                  isMulti
                  name="frameworks"
                  options={tagOptions}
                  value={formData.tags}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      tags: selected || [],
                    }))
                  }
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Field>

              <Field>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  name="description"
                  placeholder="Project description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="github_url">Github Url</Label>
                <Input
                  id="github_url"
                  name="github_url"
                  placeholder="JC Github"
                  value={formData.github_url}
                  onChange={(e) =>
                    setFormData({ ...formData, github_url: e.target.value })
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="live_url">Live Url</Label>
                <Input
                  id="live_url"
                  name="live_url"
                  placeholder="https://jcdev21.vercel.app/"
                  value={formData.live_url}
                  onChange={(e) =>
                    setFormData({ ...formData, live_url: e.target.value })
                  }
                />
              </Field>

              <Field>
                <Label htmlFor="image">Certificate Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0],
                    })
                  }
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
                      <DropdownMenuItem asChild>
                        <Button
                          variant="outline"
                          className="flex gap-2 items-center w-full"
                          onClick={() => handleEdit(item)}
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

      {/* Edit MOdal */}
      <Dialog
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);

          if (!open) {
            resetForm();
            setEditProject(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle className="!text-xl">Add New Project</DialogTitle>
              <DialogDescription className="mb-4">
                Add a new project for your portfolio. Enter the details below
                and click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  placeholder="The Legen of JC"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="category">Category</Label>

                <Select
                  value={formData.category_id}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category_id: value,
                    })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <Label htmlFor="tag">Tags</Label>
                <ReactSelect
                  defaultValue={frameworks[1]}
                  isMulti
                  name="frameworks"
                  options={tagOptions}
                  value={formData.tags}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      tags: selected || [],
                    }))
                  }
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Field>

              <Field>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  name="description"
                  placeholder="Project description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="github_url">Github Url</Label>
                <Input
                  id="github_url"
                  name="github_url"
                  placeholder="JC Github"
                  value={formData.github_url}
                  onChange={(e) =>
                    setFormData({ ...formData, github_url: e.target.value })
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="live_url">Live Url</Label>
                <Input
                  id="live_url"
                  name="live_url"
                  placeholder="https://jcdev21.vercel.app/"
                  value={formData.live_url}
                  onChange={(e) =>
                    setFormData({ ...formData, live_url: e.target.value })
                  }
                />
              </Field>

              <Field>
                <Label htmlFor="image">Certificate Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0],
                    })
                  }
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
    </>
  );
}

export default ProjectIndex;

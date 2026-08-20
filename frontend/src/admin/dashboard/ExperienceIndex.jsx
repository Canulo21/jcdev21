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

function ExperienceIndex() {
  const [isLoading, setIsLoading] = useState(false);
  const [editCompany, setEditCompany] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [getCompany, setGetCompany] = useState([]);

  const emptyForm = {
    company_name: "",
    company_addresse: "",
    company_website: "",
    experiences: [
      {
        position: "",
        duration: "",
        description: "",
      },
    ],
  };

  const [formData, setFormData] = useState(emptyForm);

  // =========================
  // GET COMPANIES
  // =========================

  const getCompanies = async () => {
    try {
      const data = await apiFetch("companies");

      setGetCompany(data);
    } catch (err) {
      console.error("Failed to fetch companies:", err);
      toast.error("Failed to load companies.");
    }
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setFormData({
      company_name: "",
      company_addresse: "",
      company_website: "",
      experiences: [
        {
          position: "",
          duration: "",
          description: "",
        },
      ],
    });
  };

  // =========================
  // COMPANY INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // EXPERIENCE INPUT CHANGE
  // =========================

  const handleExperienceChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((experience, i) =>
        i === index
          ? {
              ...experience,
              [field]: value,
            }
          : experience,
      ),
    }));
  };

  // =========================
  // ADD EXPERIENCE FIELD
  // =========================

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          position: "",
          duration: "",
          description: "",
        },
      ],
    }));
  };

  // =========================
  // REMOVE EXPERIENCE FIELD
  // =========================

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  // =========================
  // CREATE COMPANY
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const data = await apiFetch("add-experience", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      toast.success(data.message);

      await getCompanies();

      resetForm();
    } catch (err) {
      console.error("Error:", err);
      toast.error(`Failed to add company: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (company) => {
    setEditCompany(company);

    setFormData({
      company_name: company.company_name || "",
      company_addresse: company.company_addresse || "",
      company_website: company.company_website || "",

      experiences:
        company.experiences?.length > 0
          ? company.experiences.map((experience) => ({
              id: experience.id,
              position: experience.position || "",
              duration: experience.duration || "",
              description: experience.description || "",
            }))
          : [
              {
                id: null,
                position: "",
                duration: "",
                description: "",
              },
            ],
    });

    setIsEditOpen(true);
  };

  // =========================
  // UPDATE COMPANY
  // =========================

  const handleUpdate = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!editCompany) return;

    try {
      const data = await apiFetch(`experiences/experience-${editCompany.id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      toast.success(data.message);

      await getCompanies();

      setIsEditOpen(false);
      setEditCompany(null);
      resetForm();
    } catch (err) {
      console.error("Update error:", err);
      toast.error(`Failed to update company: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete it?")) {
      return;
    }

    try {
      const data = await apiFetch(`experiences/experiences-${id}`, {
        method: "DELETE",
      });

      toast.success(data.message);

      await getCompanies();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(`Failed to delete company: ${err.message}`);
    }
  };

  // =========================
  // GET DATA ON LOAD
  // =========================

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <>
      <h1 className="!mb-15">Welcome Master JC!</h1>

      {/* =========================
          ADD COMPANY
      ========================= */}

      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            resetForm();
          }
        }}
      >
        <DialogTrigger className="py-2 px-6 bg-[var(--bg-secondary)] text-white rounded-md flex gap-4 items-center float-end">
          <FaPlusCircle />
          Add Experience
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="!text-xl">Add New Experience</DialogTitle>

              <DialogDescription className="mb-4">
                Add a new work experience. Enter the details below.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              {/* COMPANY NAME */}

              <Field>
                <Label htmlFor="company_name">Company Name</Label>

                <Input
                  id="company_name"
                  name="company_name"
                  placeholder="ABC Company"
                  value={formData.company_name}
                  onChange={handleChange}
                />
              </Field>

              {/* ADDRESS */}

              <Field>
                <Label htmlFor="company_addresse">Address</Label>

                <Input
                  id="company_addresse"
                  name="company_addresse"
                  placeholder="Cebu City"
                  value={formData.company_addresse}
                  onChange={handleChange}
                />
              </Field>

              {/* WEBSITE */}

              <Field>
                <Label htmlFor="company_website">Website</Label>

                <Input
                  id="company_website"
                  name="company_website"
                  placeholder="https://example.com"
                  value={formData.company_website}
                  onChange={handleChange}
                />
              </Field>

              {/* EXPERIENCES */}

              {formData.experiences.map((experience, index) => (
                <div key={index} className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold !text-xl">
                      Experience {index + 1}
                    </h3>

                    {formData.experiences.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeExperience(index)}
                      >
                        <FaTrashAlt />
                      </Button>
                    )}
                  </div>

                  {/* POSITION */}

                  <Field>
                    <Label>Position</Label>

                    <Input
                      placeholder="WordPress Developer"
                      value={experience.position}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "position",
                          e.target.value,
                        )
                      }
                    />
                  </Field>

                  {/* DURATION */}

                  <Field>
                    <Label>Duration</Label>

                    <Input
                      placeholder="2021 - 2023"
                      value={experience.duration}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "duration",
                          e.target.value,
                        )
                      }
                    />
                  </Field>

                  {/* DESCRIPTION */}

                  <Field>
                    <Label>Description</Label>

                    <textarea
                      className="border rounded-md p-2 w-full"
                      placeholder="Describe your responsibilities..."
                      value={experience.description}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                </div>
              ))}

              {/* ADD ANOTHER EXPERIENCE */}

              <Button type="button" variant="outline" onClick={addExperience}>
                <FaPlusCircle />
                Add Another Experience
              </Button>
            </FieldGroup>

            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline">Cancel</Button>} />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* =========================
          TABLE
      ========================= */}

      <Table>
        <TableCaption>A list of your work experience.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">No.</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {getCompany.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{i + 1}</TableCell>

              <TableCell className="font-bold">{item.company_name}</TableCell>

              <TableCell>{item.company_addresse}</TableCell>

              <TableCell>
                <a
                  href={item.company_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600"
                >
                  {item.company_website}
                </a>
              </TableCell>

              <TableCell>{item.experiences?.[0]?.position}</TableCell>

              <TableCell>{item.experiences?.[0]?.duration}</TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="px-4 py-2 border-2 border-red-600 bg-transparent data-[state=open]:text-white data-[state=open]:bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)] hover:text-white rounded-sm">
                    ...
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      {/* EDIT */}

                      <DropdownMenuItem asChild>
                        <Button
                          variant="outline"
                          className="flex gap-2 items-center w-full"
                          onClick={() => handleEdit(item)}
                        >
                          <FaPencilAlt />
                          Edit
                        </Button>
                      </DropdownMenuItem>

                      {/* DELETE */}

                      <DropdownMenuItem asChild>
                        <Button
                          variant="destructive"
                          className="flex gap-2 items-center w-full"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrashAlt />
                          Remove
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

      {/* =========================
          EDIT MODAL
      ========================= */}

      <Dialog
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);

          if (!open) {
            resetForm();
            setEditCompany(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle className="!text-xl">Edit Experience</DialogTitle>

              <DialogDescription className="mb-4">
                Update your work experience.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              {/* COMPANY NAME */}

              <Field>
                <Label htmlFor="edit_company_name">Company Name</Label>

                <Input
                  id="edit_company_name"
                  value={formData.company_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      company_name: e.target.value,
                    })
                  }
                />
              </Field>

              {/* ADDRESS */}

              <Field>
                <Label htmlFor="edit_company_addresse">Address</Label>

                <Input
                  id="edit_company_addresse"
                  value={formData.company_addresse}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      company_addresse: e.target.value,
                    })
                  }
                />
              </Field>

              {/* WEBSITE */}

              <Field>
                <Label htmlFor="edit_company_website">Website</Label>

                <Input
                  id="edit_company_website"
                  value={formData.company_website}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      company_website: e.target.value,
                    })
                  }
                />
              </Field>

              {/* EXPERIENCES */}

              {formData.experiences.map((experience, index) => (
                <div key={index} className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold !text-xl">
                      Experience {index + 1}
                    </h3>

                    {formData.experiences.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeExperience(index)}
                      >
                        <FaTrashAlt />
                      </Button>
                    )}
                  </div>

                  <Field>
                    <Label>Position</Label>

                    <Input
                      value={experience.position}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "position",
                          e.target.value,
                        )
                      }
                    />
                  </Field>

                  <Field>
                    <Label>Duration</Label>

                    <Input
                      value={experience.duration}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "duration",
                          e.target.value,
                        )
                      }
                    />
                  </Field>

                  <Field>
                    <Label>Description</Label>

                    <textarea
                      className="border rounded-md p-2 w-full"
                      value={experience.description}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                </div>
              ))}

              {/* ADD ANOTHER EXPERIENCE */}
              <Button type="button" variant="outline" onClick={addExperience}>
                <FaPlusCircle />
                Add Another Experience
              </Button>
            </FieldGroup>

            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline">Cancel</Button>} />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExperienceIndex;

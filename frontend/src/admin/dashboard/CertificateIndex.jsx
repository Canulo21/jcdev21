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

function CertificateIndex() {
  const [editCertificate, setEditCertificate] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [getCertificate, setGetCertificate] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    completed: "",
    cred_id: "",
    url: "",
    image: null,
  });

  const getCertificates = async () => {
    try {
      const data = await apiFetch("certifications");
      setGetCertificate(data);
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("title", formData.title);
      body.append("provider", formData.provider);
      body.append("completed", formData.completed);
      body.append("cred_id", formData.cred_id);
      body.append("url", formData.url);

      if (formData.image) {
        body.append("image", formData.image);
      }

      const data = await apiFetch("add-certificate", {
        method: "POST",
        body,
      });

      toast.success(data.message);
      getCertificates();

      setFormData({
        title: "",
        provider: "",
        completed: "",
        cred_id: "",
        url: "",
        image: null,
      });
    } catch (err) {
      toast.error(`Failed to add new: ${err.message}`);
    }
  };

  const handleEdit = (item) => {
    setEditCertificate(item);

    setFormData({
      title: item.title || "",
      provider: item.provider || "",
      completed: item.completed || "",
      cred_id: item.cred_id || "",
      url: item.url || "",
    });

    setIsEditOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("title", formData.title);
      body.append("provider", formData.provider);
      body.append("completed", formData.completed);
      body.append("cred_id", formData.cred_id);
      body.append("url", formData.url);

      // Tell Laravel this POST request is actually an update
      body.append("_method", "PUT");

      if (formData.image) {
        body.append("image", formData.image);
      }

      const data = await apiFetch(
        `certificates/certificate-${editCertificate.id}`,
        {
          method: "POST",
          body,
        },
      );

      toast.success(data.message);

      getCertificates();

      setFormData({
        title: "",
        provider: "",
        completed: "",
        cred_id: "",
        url: "",
        image: null,
      });

      setEditCertificate(null);
      setIsEditOpen(false);
    } catch (err) {
      console.log("error", err);
      toast.error(`Failed to update certificate: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await apiFetch(`certificates/certificate-${id}`, {
        method: "DELETE",
      });

      toast.success(response.message);

      getCertificates();
    } catch (err) {
      console.error("Failed to delete certificate:", err);
      toast.error("Failed to delete certificate.");
    }
  };

  useEffect(() => {
    getCertificates();
  }, []);

  return (
    <>
      <h1 className="!mb-15">Welcome Master JC!</h1>

      {/* Add Form */}
      <Dialog>
        <DialogTrigger className="py-2 px-6 bg-[var(--bg-secondary)] text-white rounded-md flex gap-4 items-center float-end">
          <FaPlusCircle />
          Add Certiicate
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="!text-xl">Add New Certiicate</DialogTitle>
              <DialogDescription className="mb-4">
                Add a new certificate to your portfolio. Enter the certificate
                details below and click Save when you're done.
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
                <Label htmlFor="provider">Provider</Label>
                <Input
                  id="provider"
                  name="provider"
                  placeholder="JC"
                  value={formData.provider}
                  onChange={(e) =>
                    setFormData({ ...formData, provider: e.target.value })
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="completed">Completed</Label>
                <Input
                  id="completed"
                  name="completed"
                  placeholder="May 30, 1997"
                  value={formData.completed}
                  onChange={(e) =>
                    setFormData({ ...formData, completed: e.target.value })
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="cred_id">Credential ID</Label>
                <Input
                  id="cred_id"
                  name="cred_id"
                  placeholder="123 abc !@#"
                  value={formData.cred_id}
                  onChange={(e) =>
                    setFormData({ ...formData, cred_id: e.target.value })
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="url">Url</Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="https://"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
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
        <TableCaption>A list of your certificates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Credential Id</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getCertificate.map((item, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell className="uppercase font-bold">
                {item.provider}
              </TableCell>
              <TableCell className="truncate">{item.cred_id}</TableCell>
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

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle className="!text-xl">Edit Certiicate</DialogTitle>
              <DialogDescription className="mb-4">
                Enter the details below and click save when you&apos;re done.
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
                <Label htmlFor="provider">Provider</Label>
                <Input
                  id="provider"
                  name="provider"
                  placeholder="JC"
                  value={formData.provider}
                  onChange={(e) =>
                    setFormData({ ...formData, provider: e.target.value })
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="completed">Completed</Label>
                <Input
                  id="completed"
                  name="completed"
                  placeholder="May 30, 1997"
                  value={formData.completed}
                  onChange={(e) =>
                    setFormData({ ...formData, completed: e.target.value })
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="cred_id">Credential ID</Label>
                <Input
                  id="cred_id"
                  name="cred_id"
                  placeholder="123 abc !@#"
                  value={formData.cred_id}
                  onChange={(e) =>
                    setFormData({ ...formData, cred_id: e.target.value })
                  }
                />
              </Field>
              <Field>
                <Label htmlFor="url">Url</Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="https://"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
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

export default CertificateIndex;

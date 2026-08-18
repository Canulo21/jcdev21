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

function CertificateIndex() {
  const [getCertificate, setGetCertificate] = useState([]);

  const getCertificates = async () => {
    try {
      const data = await apiFetch("certifications");
      setGetCertificate(data);
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    } finally {
      setIsLoading(false);
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

export default CertificateIndex;

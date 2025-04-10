import { useState } from "react";
import { format } from "date-fns";
import { 
  Check, ChevronDown, ExternalLink, Search, Mail, 
  X, Filter, Send, Pencil, Trash2 
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getInquiries, updateInquiry, deleteInquiry } from "@/services/inquiryService";
import { Inquiry } from "@/types/inquiry";

// Helper function to safely format dates
const formatDate = (date: Date | null | undefined): string => {
  if (!date) return 'N/A';
  
  try {
    return format(date, 'MMM d, yyyy h:mm a');
  } catch (error) {
    console.error('Error formatting date:', error, date);
    return 'Invalid date';
  }
};

// Status options and display names
const INQUIRY_STATUS = ["new", "in-progress", "resolved"];
const statusDisplayNames = {
  'new': 'New',
  'in-progress': 'In Progress',
  'resolved': 'Resolved'
};

// Get status badge variant based on status
const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'new':
      return "destructive";
    case 'in-progress':
      return "secondary"; 
    case 'resolved':
      return "outline"; 
    default:
      return "secondary";
  }
};

const AdminInquiries = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [editFormData, setEditFormData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
  }>({
    name: "",
    email: "",
    subject: "",
    message: "",
    status: "new"
  });

  // React Query - Fetch inquiries
  const { data: inquiries = [], isLoading } = useQuery({
    queryKey: ['inquiries'],
    queryFn: () => getInquiries()
  });

  // Update inquiry mutation
  const updateInquiryMutation = useMutation({
    mutationFn: (params: {id: string, data: any}) => 
      updateInquiry(params.id, params.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      toast({
        title: "Success",
        description: "Inquiry has been updated successfully.",
      });
    }
  });

  // Delete inquiry mutation
  const deleteInquiryMutation = useMutation({
    mutationFn: deleteInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      toast({
        title: "Success",
        description: "Inquiry has been deleted successfully.",
      });
    }
  });

  // Filter inquiries based on search term and status
  const filteredInquiries = inquiries.filter((inquiry) => {
    // Apply status filter
    if (statusFilter && inquiry.status !== statusFilter) return false;
    
    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        inquiry.name.toLowerCase().includes(searchLower) ||
        inquiry.email.toLowerCase().includes(searchLower) ||
        inquiry.subject.toLowerCase().includes(searchLower) ||
        inquiry.message.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Handle opening the view dialog
  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsViewDialogOpen(true);
  };

  // Handle opening the edit dialog
  const handleOpenEditDialog = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setEditFormData({
      name: inquiry.name,
      email: inquiry.email,
      subject: inquiry.subject,
      message: inquiry.message,
      status: inquiry.status
    });
    setIsEditDialogOpen(true);
  };

  // Handle opening the delete confirmation dialog
  const handleOpenDeleteDialog = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDeleteDialogOpen(true);
  };

  // Handle opening the reply dialog
  const handleOpenReplyDialog = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsReplyDialogOpen(true);
  };

  // Handle status change
  const handleStatusChange = (inquiry: Inquiry, status: string) => {
    updateInquiryMutation.mutate({
      id: inquiry.id,
      data: { status }
    });
  };

  // Handle sending reply
  const handleSendReply = async () => {
    if (!selectedInquiry || !replyMessage) return;

    // In a real app, you would send the email here using EmailJS or similar
    toast({
      title: "Reply Sent",
      description: `Your reply to ${selectedInquiry.name} has been sent successfully.`,
    });

    if (selectedInquiry.id) {
      updateInquiryMutation.mutate({
        id: selectedInquiry.id,
        data: { status: 'in-progress', response: replyMessage }
      });
    }

    setReplyMessage("");
    setIsReplyDialogOpen(false);
  };

  // Handle edit form changes
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle edit form submission
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry?.id) return;
    
    updateInquiryMutation.mutate({
      id: selectedInquiry.id,
      data: editFormData
    });
    
    setIsEditDialogOpen(false);
  };

  // Handle delete inquiry
  const handleDeleteInquiry = () => {
    if (!selectedInquiry?.id) return;
    
    deleteInquiryMutation.mutate(selectedInquiry.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <AdminLayout title="Contact Inquiries">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl font-bold">Contact Inquiries</h2>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inquiries..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  <span>
                    {statusFilter === null
                      ? 'All Status' 
                      : statusDisplayNames[statusFilter as keyof typeof statusDisplayNames]}
                  </span>
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All Status
                </DropdownMenuItem>
                {INQUIRY_STATUS.map(status => (
                  <DropdownMenuItem 
                    key={status} 
                    onClick={() => setStatusFilter(status)}
                  >
                    {statusDisplayNames[status as keyof typeof statusDisplayNames]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
            <p>Loading inquiries...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <Mail size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Inquiries Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter
                ? 'No inquiries match your search criteria.' 
                : 'No contact inquiries have been received yet.'}
            </p>
            {(searchTerm || statusFilter) && (
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter(null);
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => {
                  return (
                    <TableRow key={inquiry.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{inquiry.name}</div>
                          <div className="text-sm text-muted-foreground">{inquiry.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{inquiry.subject}</TableCell>
                      <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(inquiry.status)}>
                          {statusDisplayNames[inquiry.status as keyof typeof statusDisplayNames]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {/* View button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewInquiry(inquiry)}
                            title="View Details"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          
                          {/* Edit button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEditDialog(inquiry)}
                            title="Edit Inquiry"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          
                          {/* Delete button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-destructive"
                            onClick={() => handleOpenDeleteDialog(inquiry)}
                            title="Delete Inquiry"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          
                          {/* Reply button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenReplyDialog(inquiry)}
                            title="Reply to Inquiry"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* View Inquiry Dialog */}
      {selectedInquiry && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Inquiry Details</DialogTitle>
              <DialogDescription>
                Submitted on {formatDate(selectedInquiry.createdAt)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-1">Name</h4>
                  <p>{selectedInquiry.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Email</h4>
                  <p>{selectedInquiry.email}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-semibold mb-1">Subject</h4>
                  <p>{selectedInquiry.subject}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-semibold mb-1">Message</h4>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsViewDialogOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false);
                  setIsReplyDialogOpen(true);
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Inquiry Dialog */}
      {selectedInquiry && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Inquiry</DialogTitle>
              <DialogDescription>
                Make changes to this inquiry
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={editFormData.email}
                      onChange={handleEditFormChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={editFormData.subject}
                    onChange={handleEditFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={editFormData.message}
                    onChange={handleEditFormChange}
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditFormChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    {INQUIRY_STATUS.map(status => (
                      <option key={status} value={status}>
                        {statusDisplayNames[status as keyof typeof statusDisplayNames]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedInquiry && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this inquiry? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 border rounded-md bg-muted/50">
              <p><strong>From:</strong> {selectedInquiry.name}</p>
              <p><strong>Subject:</strong> {selectedInquiry.subject}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteInquiry}
                disabled={deleteInquiryMutation.isPending}
              >
                {deleteInquiryMutation.isPending ? (
                  <>
                    <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reply Dialog */}
      {selectedInquiry && (
        <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Reply to {selectedInquiry.name}</DialogTitle>
              <DialogDescription>
                Send an email response to this inquiry
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-1">To</h4>
                <p>{selectedInquiry.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Subject</h4>
                <p>Re: {selectedInquiry.subject}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Message</h4>
                <Textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  rows={8}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsReplyDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendReply}
                disabled={!replyMessage}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
};

export default AdminInquiries;

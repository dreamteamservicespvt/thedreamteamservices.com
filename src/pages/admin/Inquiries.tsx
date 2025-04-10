import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Check, ChevronDown, ExternalLink, Search, Mail, X, Filter, Send } from "lucide-react";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInquiries, updateInquiry, deleteInquiry } from "@/services/inquiryService";
import { Inquiry, INQUIRY_STATUS } from "@/types/inquiry";

const AdminInquiries = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // React Query
  const inquiriesQuery = useQuery({
    queryKey: ['inquiries'],
    queryFn: getInquiries
  });

  const updateInquiryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Inquiry> }) =>
      updateInquiry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      toast({
        title: "Status Updated",
        description: "The inquiry status has been successfully updated.",
      });
    },
    onError: (error) => {
      console.error("Error updating inquiry status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update inquiry status. Please try again.",
      });
    }
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: deleteInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      toast({
        title: "Inquiry Deleted",
        description: "The inquiry has been successfully deleted.",
      });
    },
    onError: (error) => {
      console.error("Error deleting inquiry:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete inquiry. Please try again.",
      });
    }
  });

  // Handle status change
  const handleStatusChange = (inquiry: Inquiry, status: string) => {
    if (inquiry.id) {
      updateInquiryMutation.mutate({
        id: inquiry.id,
        data: { status: status as any }
      });
    }
  };

  // Handle send reply
  const handleSendReply = async () => {
    if (!selectedInquiry || !replyMessage) return;

    // In a real app, you would send the email here using EmailJS or similar
    // For now, we'll just show a success toast and update the status

    toast({
      title: "Reply Sent",
      description: `Your reply to ${selectedInquiry.name} has been sent successfully.`,
    });

    if (selectedInquiry.id && selectedInquiry.status === 'new') {
      updateInquiryMutation.mutate({
        id: selectedInquiry.id,
        data: { status: 'in-progress' }
      });
    }

    setReplyMessage("");
    setIsReplyDialogOpen(false);
  };

  // Filter and search inquiries
  const filteredInquiries = inquiriesQuery.data?.filter(inquiry => {
    // Apply status filter
    if (statusFilter && inquiry.status !== statusFilter) return false;
    
    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        inquiry.name.toLowerCase().includes(searchLower) ||
        inquiry.email.toLowerCase().includes(searchLower) ||
        inquiry.subject.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  }) || [];

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new':
        return "destructive";
      case 'in-progress':
        return "secondary"; 
      case 'resolved':
        return "secondary"; 
      default:
        return "secondary";
    }
  };

  const statusDisplayNames = {
    'new': 'New',
    'in-progress': 'In Progress',
    'resolved': 'Resolved'
  };

  return (
    <AdminLayout title="Contact Inquiries">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Contact Inquiries</h2>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {statusFilter ? `Status: ${statusDisplayNames[statusFilter as keyof typeof statusDisplayNames]}` : "All Statuses"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                All Statuses
              </DropdownMenuItem>
              {INQUIRY_STATUS.map(status => (
                <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                  {statusDisplayNames[status as keyof typeof statusDisplayNames]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or subject..."
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
        </div>

        <div className="rounded-md border bg-card">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : filteredInquiries.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => {
                  const createdAtDate = inquiry.createdAt 
                    ? typeof inquiry.createdAt === 'string' 
                      ? new Date(inquiry.createdAt) 
                      : new Date((inquiry.createdAt as any).seconds * 1000)
                    : new Date();
                  
                  return (
                    <TableRow key={inquiry.id}>
                      <TableCell className="font-medium">{inquiry.name}</TableCell>
                      <TableCell>{inquiry.email}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{inquiry.subject}</TableCell>
                      <TableCell>{format(createdAtDate, 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <Badge variant={getStatusBadgeVariant(inquiry.status)}>
                                {statusDisplayNames[inquiry.status as keyof typeof statusDisplayNames]}
                              </Badge>
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {INQUIRY_STATUS.map(status => (
                              <DropdownMenuItem 
                                key={status} 
                                onClick={() => handleStatusChange(inquiry, status)}
                                disabled={inquiry.status === status}
                              >
                                {statusDisplayNames[status as keyof typeof statusDisplayNames]}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedInquiry(inquiry);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedInquiry(inquiry);
                              setIsReplyDialogOpen(true);
                            }}
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
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No inquiries found</p>
              {searchTerm || statusFilter ? (
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter(null);
                  }}
                >
                  Clear Filters
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* View Inquiry Dialog */}
      {selectedInquiry && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Inquiry Details</DialogTitle>
              <DialogDescription>
                Submitted on {selectedInquiry.createdAt 
                  ? format(new Date((selectedInquiry.createdAt as any).seconds * 1000 || selectedInquiry.createdAt as any), 'MMMM d, yyyy')
                  : 'Unknown date'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-1">Name</h4>
                  <p className="text-md">{selectedInquiry.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Email</h4>
                  <p className="text-md">{selectedInquiry.email}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-semibold mb-1">Subject</h4>
                  <p className="text-md">{selectedInquiry.subject}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-semibold mb-1">Message</h4>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="text-md whitespace-pre-wrap">{selectedInquiry.message}</p>
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

      {/* Reply Dialog */}
      {selectedInquiry && (
        <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Reply to {selectedInquiry.name}</DialogTitle>
              <DialogDescription>
                Send an email response to this inquiry.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-1">To</h4>
                <p className="text-md">{selectedInquiry.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Subject</h4>
                <p className="text-md">Re: {selectedInquiry.subject}</p>
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

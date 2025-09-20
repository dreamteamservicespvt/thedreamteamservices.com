import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Star, 
  Check, 
  X, 
  Eye, 
  Trash2, 
  Filter, 
  Search, 
  Plus,
  Calendar,
  User,
  Building,
  MessageSquare,
  Image as ImageIcon,
  Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useToast } from "@/hooks/use-toast";
import { Review, ReviewStatus, CreateReviewData } from "@/types/review";
import { 
  getReviews, 
  approveReview, 
  rejectReview, 
  deleteReview, 
  createAdminReview, 
  updateReview,
  getReviewStats,
  uploadReviewImage
} from "@/services/reviewService";

const ReviewsAdmin = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "all">("all");
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    averageRating: 0
  });

  // Form state for adding new review
  const [newReview, setNewReview] = useState<CreateReviewData>({
    name: "",
    position: "",
    company: "",
    content: "",
    rating: 5,
    projectType: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for editing review
  const [editReview, setEditReview] = useState<CreateReviewData & { status?: ReviewStatus }>({
    name: "",
    position: "",
    company: "",
    content: "",
    rating: 5,
    projectType: "",
    status: "pending"
  });
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string>("");
  const [removeExistingImage, setRemoveExistingImage] = useState(false);

  useEffect(() => {
    loadReviews();
    loadStats();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [reviews, searchTerm, statusFilter, ratingFilter]);

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      const data = await getReviews();
      setReviews(data);
    } catch (error) {
      console.error("Error loading reviews:", error);
      toast({
        variant: "destructive",
        title: "Error loading reviews",
        description: "Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await getReviewStats();
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const filterReviews = () => {
    let filtered = reviews;

    if (statusFilter !== "all") {
      filtered = filtered.filter(review => review.status === statusFilter);
    }

    if (ratingFilter !== "all") {
      filtered = filtered.filter(review => review.rating === ratingFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(review =>
        review.name.toLowerCase().includes(term) ||
        review.company.toLowerCase().includes(term) ||
        review.content.toLowerCase().includes(term) ||
        review.position.toLowerCase().includes(term)
      );
    }

    setFilteredReviews(filtered);
  };

  const handleApprove = async (reviewId: string) => {
    try {
      await approveReview(reviewId);
      await loadReviews();
      await loadStats();
      toast({
        title: "Review approved",
        description: "The review is now public."
      });
    } catch (error) {
      console.error("Error approving review:", error);
      toast({
        variant: "destructive",
        title: "Error approving review",
        description: "Please try again."
      });
    }
  };

  const handleReject = async (reviewId: string) => {
    try {
      await rejectReview(reviewId);
      await loadReviews();
      await loadStats();
      toast({
        title: "Review rejected",
        description: "The review has been rejected."
      });
    } catch (error) {
      console.error("Error rejecting review:", error);
      toast({
        variant: "destructive",
        title: "Error rejecting review",
        description: "Please try again."
      });
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      await loadReviews();
      await loadStats();
      toast({
        title: "Review deleted",
        description: "The review has been permanently deleted."
      });
    } catch (error) {
      console.error("Error deleting review:", error);
      toast({
        variant: "destructive",
        title: "Error deleting review",
        description: "Please try again."
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select an image smaller than 5MB."
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitNewReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createAdminReview(newReview, imageFile || undefined);
      
      setShowAddDialog(false);
      setNewReview({
        name: "",
        position: "",
        company: "",
        content: "",
        rating: 5,
        projectType: ""
      });
      setImageFile(null);
      setImagePreview("");
      
      await loadReviews();
      await loadStats();

      toast({
        title: "Review added",
        description: "The review has been added and is now public."
      });
    } catch (error) {
      console.error("Error adding review:", error);
      toast({
        variant: "destructive",
        title: "Error adding review",
        description: "Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit handlers
  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setEditReview({
      name: review.name,
      position: review.position,
      company: review.company,
      content: review.content,
      rating: review.rating,
      projectType: review.projectType || "",
      image: review.image,
      status: review.status
    });
    setEditImagePreview(review.image || "");
    setEditImageFile(null);
    setRemoveExistingImage(false);
    setShowEditDialog(true);
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select an image smaller than 5MB."
        });
        return;
      }

      setEditImageFile(file);
      setRemoveExistingImage(false);
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveEditImage = () => {
    setEditImageFile(null);
    setEditImagePreview("");
    setRemoveExistingImage(true);
  };

  const handleSubmitEditReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    setIsSubmitting(true);

    try {
      await updateReview(
        editingReview.id,
        {
          ...editReview,
          image: editReview.image
        },
        editImageFile || undefined,
        removeExistingImage
      );
      
      setShowEditDialog(false);
      setEditingReview(null);
      setEditReview({
        name: "",
        position: "",
        company: "",
        content: "",
        rating: 5,
        projectType: "",
        status: "pending"
      });
      setEditImageFile(null);
      setEditImagePreview("");
      setRemoveExistingImage(false);
      
      await loadReviews();
      await loadStats();

      toast({
        title: "Review updated",
        description: "The review has been successfully updated."
      });
    } catch (error) {
      console.error("Error updating review:", error);
      toast({
        variant: "destructive",
        title: "Error updating review",
        description: "Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadgeVariant = (status: ReviewStatus) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-foreground/10 rounded w-1/4"></div>
          <div className="h-32 bg-foreground/10 rounded"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-foreground/10 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Review Management</h2>
          <p className="text-foreground/70">Manage client reviews and testimonials</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-2" />
              Add Review
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Review</DialogTitle>
              <DialogDescription>
                Add a new review directly to the approved reviews.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmitNewReview} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="add-name">Name</Label>
                  <Input
                    id="add-name"
                    value={newReview.name}
                    onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-position">Position</Label>
                  <Input
                    id="add-position"
                    value={newReview.position}
                    onChange={(e) => setNewReview(prev => ({ ...prev, position: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="add-company">Company</Label>
                  <Input
                    id="add-company"
                    value={newReview.company}
                    onChange={(e) => setNewReview(prev => ({ ...prev, company: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-project">Project Type</Label>
                  <Input
                    id="add-project"
                    value={newReview.projectType}
                    onChange={(e) => setNewReview(prev => ({ ...prev, projectType: e.target.value }))}
                    placeholder="e.g., Web Development"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className="p-1"
                    >
                      <Star
                        size={20}
                        className={`${
                          star <= newReview.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="add-content">Review Content</Label>
                <Textarea
                  id="add-content"
                  value={newReview.content}
                  onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-24"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Photo</Label>
                {imagePreview ? (
                  <div className="flex items-center space-x-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Review"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Review Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogDescription>
              Update the review details below.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitEditReview} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editReview.name}
                  onChange={(e) => setEditReview(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-position">Position</Label>
                <Input
                  id="edit-position"
                  value={editReview.position}
                  onChange={(e) => setEditReview(prev => ({ ...prev, position: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-company">Company</Label>
                <Input
                  id="edit-company"
                  value={editReview.company}
                  onChange={(e) => setEditReview(prev => ({ ...prev, company: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-project">Project Type</Label>
                <Input
                  id="edit-project"
                  value={editReview.projectType}
                  onChange={(e) => setEditReview(prev => ({ ...prev, projectType: e.target.value }))}
                  placeholder="e.g., Web Development"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={editReview.status} onValueChange={(value: ReviewStatus) => setEditReview(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEditReview(prev => ({ ...prev, rating: star }))}
                    className="p-1"
                  >
                    <Star
                      size={20}
                      className={`${
                        star <= editReview.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-foreground/30"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-content">Review Content</Label>
              <Textarea
                id="edit-content"
                value={editReview.content}
                onChange={(e) => setEditReview(prev => ({ ...prev, content: e.target.value }))}
                className="min-h-24"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Photo</Label>
              {editImagePreview && !removeExistingImage ? (
                <div className="flex items-center space-x-4">
                  <img
                    src={editImagePreview}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveEditImage}
                    >
                      Remove
                    </Button>
                    <Label htmlFor="edit-image-input" className="cursor-pointer">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <span>Change</span>
                      </Button>
                    </Label>
                  </div>
                </div>
              ) : (
                <div>
                  <Input
                    id="edit-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Review"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-foreground/70">Total Reviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
            <div className="text-sm text-foreground/70">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-500">{stats.approved}</div>
            <div className="text-sm text-foreground/70">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
            <div className="text-sm text-foreground/70">Rejected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold flex items-center">
              {stats.averageRating.toFixed(1)}
              <Star size={16} className="ml-1 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="text-sm text-foreground/70">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-foreground/50" />
              <Input
                placeholder="Search reviews..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={(value: ReviewStatus | "all") => setStatusFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={ratingFilter.toString()} onValueChange={(value) => setRatingFilter(value === "all" ? "all" : parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="text-sm text-foreground/70 flex items-center">
              Showing {filteredReviews.length} of {reviews.length} reviews
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare size={48} className="mx-auto mb-4 text-foreground/30" />
              <p className="text-foreground/70">No reviews found matching your filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Review Image */}
                    <div className="shrink-0">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-foreground/10">
                        {review.image ? (
                          <OptimizedImage
                            src={review.image}
                            alt={review.name}
                            className="w-full h-full object-cover"
                            width={64}
                            height={64}
                            showErrorOverlay={false}
                          />
                        ) : (
                          <div className="w-full h-full bg-dts-purple/20 flex items-center justify-center">
                            <span className="text-dts-purple font-semibold">
                              {review.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg">{review.name}</h3>
                          <p className="text-sm text-foreground/70">
                            {review.position} at {review.company}
                          </p>
                          {review.projectType && (
                            <p className="text-xs text-dts-purple">{review.projectType}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusBadgeVariant(review.status)}>
                            {review.status}
                          </Badge>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={`${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="text-foreground/80">{review.content}</p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-foreground/10">
                        <div className="text-xs text-foreground/50">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              Submitted: {formatDate(review.submittedAt)}
                            </span>
                            {review.reviewedAt && (
                              <span className="flex items-center gap-1">
                                Reviewed: {formatDate(review.reviewedAt)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {review.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApprove(review.id)}
                                className="text-green-600 hover:bg-green-50"
                              >
                                <Check size={14} className="mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(review.id)}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <X size={14} className="mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditReview(review)}
                            className="text-blue-600 hover:bg-blue-50"
                          >
                            <Edit size={14} className="mr-1" />
                            Edit
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Eye size={14} className="mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Review Details</DialogTitle>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-foreground/10 shrink-0">
                                    {review.image ? (
                                      <OptimizedImage
                                        src={review.image}
                                        alt={review.name}
                                        className="w-full h-full object-cover"
                                        width={80}
                                        height={80}
                                        showErrorOverlay={false}
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-dts-purple/20 flex items-center justify-center">
                                        <span className="text-dts-purple font-semibold text-lg">
                                          {review.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-xl">{review.name}</h3>
                                    <p className="text-foreground/70">
                                      {review.position} at {review.company}
                                    </p>
                                    {review.projectType && (
                                      <p className="text-sm text-dts-purple">{review.projectType}</p>
                                    )}
                                    <div className="flex items-center gap-2 mt-2">
                                      <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                            key={star}
                                            size={16}
                                            className={`${
                                              star <= review.rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-foreground/30"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <Badge variant={getStatusBadgeVariant(review.status)}>
                                        {review.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-2">Review Content</h4>
                                  <p className="text-foreground/80 bg-foreground/5 p-4 rounded-lg">
                                    {review.content}
                                  </p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium">Submitted:</span>
                                    <br />
                                    {formatDate(review.submittedAt)}
                                  </div>
                                  {review.reviewedAt && (
                                    <div>
                                      <span className="font-medium">Reviewed:</span>
                                      <br />
                                      {formatDate(review.reviewedAt)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                                <Trash2 size={14} className="mr-1" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Review</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this review? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(review.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsAdmin;
import { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Plus, Pencil, Trash2, X, Check, Github, Twitter, Linkedin, FileImage, GripVertical } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  getTeamMembers, 
  createTeamMember, 
  updateTeamMember, 
  deleteTeamMember 
} from "@/services/teamService";
import { TeamMember, TeamMemberFormData } from "@/types/team";
import { OptimizedImage } from "@/components/ui/optimized-image";

const AdminTeam = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Dialog state
  const [teamMemberDialogOpen, setTeamMemberDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderMode, setOrderMode] = useState(false);
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: "",
    role: "",
    image: "",
    bio: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      github: "",
    },
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  // Fetch team members
  const { 
    data: teamMembers = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: getTeamMembers
  });

  // Create team member mutation
  const createMutation = useMutation({
    mutationFn: (data: { teamMember: TeamMemberFormData, imageFile: File | null }) => {
      return createTeamMember(data.teamMember, data.imageFile || undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      setTeamMemberDialogOpen(false);
      resetForm();
      toast({
        title: "Team Member Created",
        description: "The team member has been successfully added.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create team member. Please try again.",
      });
      console.error("Error creating team member:", error);
    }
  });

  // Update team member mutation
  const updateMutation = useMutation({
    mutationFn: (data: { id: string, teamMember: Partial<TeamMemberFormData>, imageFile: File | null }) => {
      return updateTeamMember(data.id, data.teamMember, data.imageFile || undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      setTeamMemberDialogOpen(false);
      resetForm();
      toast({
        title: "Team Member Updated",
        description: "The team member has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update team member. Please try again.",
      });
      console.error("Error updating team member:", error);
    }
  });

  // Delete team member mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteTeamMember(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      setDeleteDialogOpen(false);
      toast({
        title: "Team Member Deleted",
        description: "The team member has been successfully removed.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete team member. Please try again.",
      });
      console.error("Error deleting team member:", error);
    }
  });

  // Update team members order mutation
  const updateOrderMutation = useMutation({
    mutationFn: (orderedTeamMembers: TeamMember[]) => {
      const updates = orderedTeamMembers.map((member, index) => 
        updateTeamMember(member.id, { order: index })
      );
      return Promise.all(updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      setOrderMode(false);
      toast({
        title: "Order Updated",
        description: "Team members order has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update team members order. Please try again.",
      });
      console.error("Error updating team members order:", error);
    }
  });

  // Reset form state
  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      image: "",
      bio: "",
      socialLinks: {
        linkedin: "",
        twitter: "",
        github: "",
      },
    });
    setImageFile(null);
    setImagePreview("");
    setIsEditing(false);
    setCurrentTeamMember(null);
  };

  // Handle new team member button click
  const handleNewTeamMember = () => {
    resetForm();
    setTeamMemberDialogOpen(true);
  };

  // Handle edit team member button click
  const handleEditTeamMember = (teamMember: TeamMember) => {
    setIsEditing(true);
    setCurrentTeamMember(teamMember);
    setFormData({
      name: teamMember.name,
      role: teamMember.role,
      image: teamMember.image,
      bio: teamMember.bio,
      socialLinks: {
        linkedin: teamMember.socialLinks.linkedin || "",
        twitter: teamMember.socialLinks.twitter || "",
        github: teamMember.socialLinks.github || "",
      },
    });
    setImagePreview(teamMember.image);
    setTeamMemberDialogOpen(true);
  };

  // Handle delete button click
  const handleDeleteClick = (teamMember: TeamMember) => {
    setCurrentTeamMember(teamMember);
    setDeleteDialogOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith("socialLinks.")) {
      const socialKey = name.split(".")[1] as keyof typeof formData.socialLinks;
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [socialKey]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role || (!imageFile && !formData.image)) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields and provide an image.",
      });
      return;
    }
    
    if (isEditing && currentTeamMember) {
      updateMutation.mutate({
        id: currentTeamMember.id,
        teamMember: formData,
        imageFile
      });
    } else {
      createMutation.mutate({
        teamMember: formData,
        imageFile
      });
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (currentTeamMember) {
      deleteMutation.mutate(currentTeamMember.id);
    }
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(teamMembers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update the order values as items are dragged
    const itemsWithUpdatedOrder = items.map((item, index) => ({
      ...item,
      order: index
    }));
    
    queryClient.setQueryData(["teamMembers"], itemsWithUpdatedOrder);
  };

  // Save the new order
  const saveOrder = () => {
    // Get the current order from the state
    const orderedTeamMembers = teamMembers.map((member, index) => ({
      ...member,
      order: index
    }));
    
    updateOrderMutation.mutate(orderedTeamMembers as TeamMember[]);
  };

  // Toggle order mode
  const toggleOrderMode = () => {
    if (!orderMode) {
      // When entering order mode, ensure we use sorted members
      const sortedMembers = [...teamMembers].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      queryClient.setQueryData(["teamMembers"], sortedMembers);
    } else {
      // If we're exiting order mode without saving, reset to original order
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    }
    setOrderMode(!orderMode);
  };

  return (
    <AdminLayout title="Team">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Team Members</h2>
          <div className="flex gap-3">
            {teamMembers.length > 1 && (
              <Button 
                variant={orderMode ? "default" : "outline"} 
                onClick={toggleOrderMode}
              >
                {orderMode ? "Exit Order Mode" : "Arrange Order"}
              </Button>
            )}
            <Button onClick={handleNewTeamMember} disabled={orderMode}>
              <Plus size={16} className="mr-2" />
              Add Team Member
            </Button>
          </div>
        </div>

        {orderMode && teamMembers.length > 0 && (
          <div className="bg-muted/50 p-4 rounded-md flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Order Mode</h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop team members to reorder them. Click Save Order when finished.
              </p>
            </div>
            <Button 
              onClick={saveOrder} 
              disabled={updateOrderMutation.isPending}
            >
              {updateOrderMutation.isPending ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                  Saving...
                </>
              ) : (
                "Save Order"
              )}
            </Button>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
            <p>Loading team members...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-destructive">
            <p>Error loading team members. Please try refreshing.</p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <FileImage size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Team Members Yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first team member to showcase your team.
            </p>
            <Button onClick={handleNewTeamMember}>
              <Plus size={16} className="mr-2" />
              Create Team Member
            </Button>
          </div>
        ) : orderMode ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="team-members">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {teamMembers.map((member, index) => (
                    <Draggable key={member.id} draggableId={member.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center p-3 bg-card border rounded-lg"
                        >
                          <div 
                            {...provided.dragHandleProps}
                            className="mr-3 p-2 cursor-move text-muted-foreground hover:text-foreground"
                          >
                            <GripVertical size={20} />
                          </div>
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-12 h-12 rounded-full object-cover mr-4"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4">
                              <FileImage size={20} className="text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                          <div className="ml-auto text-sm text-muted-foreground">
                            Position: {index + 1} {member.order !== undefined && member.order !== index ? `(was ${member.order + 1})` : ''}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...teamMembers]
              .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
              .map((teamMember) => (
              <motion.div
                key={teamMember.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg overflow-hidden border bg-card hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  {teamMember.image ? (
                    <OptimizedImage
                      src={teamMember.image}
                      alt={teamMember.name}
                      className="w-full h-full"
                      width={400}
                      height={300}
                      fallbackSrc="/images/placeholder-person.jpg"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-muted">
                      <FileImage className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{teamMember.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{teamMember.role}</p>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {teamMember.bio}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {teamMember.socialLinks.linkedin && (
                        <a
                          href={teamMember.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-accent transition-colors"
                        >
                          <Linkedin size={16} />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      )}
                      {teamMember.socialLinks.twitter && (
                        <a
                          href={teamMember.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-accent transition-colors"
                        >
                          <Twitter size={16} />
                          <span className="sr-only">Twitter</span>
                        </a>
                      )}
                      {teamMember.socialLinks.github && (
                        <a
                          href={teamMember.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-accent transition-colors"
                        >
                          <Github size={16} />
                          <span className="sr-only">GitHub</span>
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTeamMember(teamMember)}
                        className="p-1.5 rounded-md hover:bg-accent transition-colors"
                      >
                        <Pencil size={16} />
                        <span className="sr-only">Edit team member</span>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(teamMember)}
                        className="p-1.5 rounded-md hover:bg-accent text-destructive/80 hover:text-destructive transition-colors"
                      >
                        <Trash2 size={16} />
                        <span className="sr-only">Delete team member</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Team Member Dialog */}
      <Dialog open={teamMemberDialogOpen} onOpenChange={setTeamMemberDialogOpen}>
        <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">
              {isEditing ? "Edit Team Member" : "Add New Team Member"}
            </DialogTitle>
            <DialogDescription className="text-base">
              {isEditing
                ? "Update your team member information below."
                : "Fill in the details to add a new team member to your team."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name*
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Team Member Name"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium mb-2">
                    Role/Position*
                  </label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="e.g. CEO, CTO, Developer"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium mb-2">
                    Bio*
                  </label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Brief description of the team member"
                    rows={4}
                    required
                    className="w-full resize-none"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="image" className="block text-sm font-medium mb-2">
                    Profile Image*
                  </label>
                  <div className="flex flex-col gap-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full"
                    />
                    {imagePreview && (
                      <div className="relative aspect-[4/3] bg-muted overflow-hidden rounded-md">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-4">Social Links</h4>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Linkedin size={16} className="mr-2 text-blue-500" />
                      <Input
                        id="socialLinks.linkedin"
                        name="socialLinks.linkedin"
                        value={formData.socialLinks.linkedin}
                        onChange={handleInputChange}
                        placeholder="LinkedIn URL"
                        type="url"
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center">
                      <Twitter size={16} className="mr-2 text-sky-400" />
                      <Input
                        id="socialLinks.twitter"
                        name="socialLinks.twitter"
                        value={formData.socialLinks.twitter}
                        onChange={handleInputChange}
                        placeholder="Twitter URL"
                        type="url"
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center">
                      <Github size={16} className="mr-2" />
                      <Input
                        id="socialLinks.github"
                        name="socialLinks.github"
                        value={formData.socialLinks.github}
                        onChange={handleInputChange}
                        placeholder="GitHub URL"
                        type="url"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setTeamMemberDialogOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createMutation.isPending || updateMutation.isPending}
                className="w-full sm:w-auto"
              >
                {createMutation.isPending || updateMutation.isPending ? (
                  <>
                    <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Check size={16} className="mr-2" />
                    {isEditing ? "Update" : "Create"}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-semibold">{currentTeamMember?.name}</span> from
              your team.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminTeam;
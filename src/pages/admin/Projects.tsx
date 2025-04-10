import { useState, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X, Check, ExternalLink, FileImage } from "lucide-react";
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
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject 
} from "@/services/projectService";
import { Project, ProjectFormData } from "@/types/project";

const categories = [
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile App" },
  { value: "ai", label: "AI Solution" },
  { value: "security", label: "Security" },
  { value: "marketing", label: "Marketing" },
];

const AdminProjects = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Dialog state
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    category: "web",
    image: "",
    tags: [],
    projectUrl: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  // Fetch projects
  const { 
    data: projects = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects
  });

  // Create project mutation
  const createMutation = useMutation({
    mutationFn: (data: { project: ProjectFormData, imageFile: File | null }) => {
      return createProject(data.project, data.imageFile || undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setProjectDialogOpen(false);
      resetForm();
      toast({
        title: "Project Created",
        description: "The project has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create project. Please try again.",
      });
      console.error("Create project error:", error);
    }
  });

  // Update project mutation
  const updateMutation = useMutation({
    mutationFn: (data: { id: string, project: Partial<ProjectFormData>, imageFile: File | null }) => {
      return updateProject(data.id, data.project, data.imageFile || undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setProjectDialogOpen(false);
      resetForm();
      toast({
        title: "Project Updated",
        description: "The project has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update project. Please try again.",
      });
      console.error("Update project error:", error);
    }
  });

  // Delete project mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setDeleteDialogOpen(false);
      setCurrentProject(null);
      toast({
        title: "Project Deleted",
        description: "The project has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete project. Please try again.",
      });
      console.error("Delete project error:", error);
    }
  });

  // Reset form state
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "web",
      image: "",
      tags: [],
      projectUrl: "",
    });
    setTagInput("");
    setImageFile(null);
    setImagePreview("");
    setIsEditing(false);
    setCurrentProject(null);
  };

  // Handle dialog open for new project
  const handleNewProject = () => {
    resetForm();
    setProjectDialogOpen(true);
  };

  // Handle dialog open for edit project
  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image,
      tags: project.tags,
      projectUrl: project.projectUrl || "",
    });
    setIsEditing(true);
    setImagePreview(project.image);
    setProjectDialogOpen(true);
  };

  // Handle dialog open for delete confirmation
  const handleDeleteClick = (project: Project) => {
    setCurrentProject(project);
    setDeleteDialogOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle tag input
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || (!imageFile && !formData.image)) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields and provide an image.",
      });
      return;
    }
    
    if (isEditing && currentProject) {
      updateMutation.mutate({
        id: currentProject.id,
        project: formData,
        imageFile
      });
    } else {
      createMutation.mutate({
        project: formData,
        imageFile
      });
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (currentProject) {
      deleteMutation.mutate(currentProject.id);
    }
  };

  return (
    <AdminLayout title="Projects">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Projects</h2>
          <Button onClick={handleNewProject}>
            <Plus size={16} className="mr-2" />
            Add Project
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
            <p>Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-destructive">
            <p>Error loading projects. Please try refreshing.</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <FileImage size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Projects Yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first project to showcase your work.
            </p>
            <Button onClick={handleNewProject}>
              <Plus size={16} className="mr-2" />
              Create Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg overflow-hidden border bg-card hover:shadow-md transition-shadow"
              >
                <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-muted">
                      <FileImage className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {project.category}
                    </span>
                    <div className="flex gap-2">
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-accent transition-colors"
                        >
                          <ExternalLink size={16} />
                          <span className="sr-only">Visit project</span>
                        </a>
                      )}
                      <button
                        onClick={() => handleEditProject(project)}
                        className="p-1.5 rounded-md hover:bg-accent transition-colors"
                      >
                        <Pencil size={16} />
                        <span className="sr-only">Edit project</span>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(project)}
                        className="p-1.5 rounded-md hover:bg-accent text-destructive/80 hover:text-destructive transition-colors"
                      >
                        <Trash2 size={16} />
                        <span className="sr-only">Delete project</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Project Dialog */}
      <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update your project information below."
                : "Fill in the details to add a new project to your portfolio."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 py-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title*
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Project Title"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description*
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your project"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-2">
                  Project Image*
                </label>
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="relative aspect-[16/9] bg-muted overflow-hidden rounded-md">
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
                <label htmlFor="projectUrl" className="block text-sm font-medium mb-2">
                  Project URL
                </label>
                <Input
                  id="projectUrl"
                  name="projectUrl"
                  value={formData.projectUrl}
                  onChange={handleInputChange}
                  placeholder="https://yourproject.com"
                  type="url"
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-2">
                  Tags
                </label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag (e.g., React, Python)"
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary/20"
                      >
                        <X size={12} />
                        <span className="sr-only">Remove tag</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setProjectDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createMutation.isPending || updateMutation.isPending}
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
              <span className="font-semibold">{currentProject?.title}</span> from
              your portfolio.
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

export default AdminProjects;

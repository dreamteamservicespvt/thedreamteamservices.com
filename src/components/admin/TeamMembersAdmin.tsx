import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  order: number;
}

const TeamMembersAdmin = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch team members from your data source
    const fetchTeamMembers = async () => {
      try {
        // Replace with your actual data fetching logic
        const response = await fetch('/api/team-members');
        const data = await response.json();
        
        // Sort by the order property
        const sortedMembers = data.sort((a: TeamMember, b: TeamMember) => a.order - b.order);
        setTeamMembers(sortedMembers);
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeamMembers();
  }, []);
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(teamMembers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update order property for each item
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));
    
    setTeamMembers(updatedItems);
    
    // Save the new order to your data source
    saveTeamMemberOrder(updatedItems);
  };
  
  const saveTeamMemberOrder = async (members: TeamMember[]) => {
    try {
      // Replace with your actual API call
      await fetch('/api/team-members/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ members }),
      });
    } catch (error) {
      console.error('Failed to save team member order:', error);
    }
  };
  
  if (isLoading) return <div className="text-center py-10">Loading team members...</div>;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Team Members Order</h1>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="team-members">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="bg-white rounded-lg shadow-md"
            >
              {teamMembers.map((member, index) => (
                <Draggable key={member.id} draggableId={member.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center p-4 border-b last:border-b-0"
                    >
                      <div className="mr-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="8" y1="6" x2="21" y2="6"></line>
                          <line x1="8" y1="12" x2="21" y2="12"></line>
                          <line x1="8" y1="18" x2="21" y2="18"></line>
                          <line x1="3" y1="6" x2="3.01" y2="6"></line>
                          <line x1="3" y1="12" x2="3.01" y2="12"></line>
                          <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                      </div>
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.position}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        Order: {index + 1}
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
      
      <div className="mt-6 text-right">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={() => saveTeamMemberOrder(teamMembers)}
        >
          Save Order
        </button>
      </div>
    </div>
  );
};

export default TeamMembersAdmin;

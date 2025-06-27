"use client"
import { useState } from "react";
import { StoryRing } from "./storyRight";
import { StoryViewer } from "./stroryView";
import { CreateStory } from "./createStory";
import { useStories } from "@/hooks/story/useStory";
import { StoryGroup } from "@/types/story";

export const Stories = () => {
  const { storyGroups, currentUser, addStory, markAsViewed } = useStories();
  const [selectedStoryGroup, setSelectedStoryGroup] = useState<StoryGroup | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleStoryClick = (storyGroup: StoryGroup) => {
    if (storyGroup.user.id === currentUser.id && storyGroup.stories.length === 0) {
      setIsCreateOpen(true);
    } else {
      setSelectedStoryGroup(storyGroup);
      setIsViewerOpen(true);
    }
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedStoryGroup(null);
  };

  const handleCreateStory = (content: string, image?: string) => {
    addStory(content, image);
  };

  // Adicionar o usuário atual se ele não tiver stories
  const myStoryGroup = storyGroups.find(group => group.user.id === currentUser.id);
  const displayStoryGroups = myStoryGroup 
    ? storyGroups 
    : [{ user: currentUser, stories: [], hasUnseenStories: false }, ...storyGroups];

  return (
    <div className="w-full h-[5rem] ">
      {/* Stories Container */}
      <div className="h-[5rem] shadow-sm p-1 mb-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {displayStoryGroups.map((storyGroup) => (
            <StoryRing
              key={storyGroup.user.id}
              avatar={storyGroup.user.avatar}
              name={storyGroup.user.name}
              hasUnseenStories={storyGroup.hasUnseenStories}
              isOwn={storyGroup.user.id === currentUser.id && storyGroup.stories.length === 0}
              onClick={() => handleStoryClick(storyGroup)}
            />
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {selectedStoryGroup && (
        <StoryViewer
          stories={selectedStoryGroup.stories}
          initialIndex={0}
          isOpen={isViewerOpen}
          onClose={handleCloseViewer}
          onStoryViewed={markAsViewed}
        />
      )}

      {/* Create Story Modal */}
      <CreateStory
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreateStory={handleCreateStory}
      />
    </div>
  );
};
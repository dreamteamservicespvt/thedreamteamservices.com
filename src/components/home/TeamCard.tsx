import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { TeamMember } from "@/types/team";
import { OptimizedImage } from "@/components/ui/optimized-image";
import "./team-card-styles.css";

interface TeamCardProps {
  member: TeamMember;
  index: number;
  onImageError?: (error: Error) => void;
  variants?: any;
}

/**
 * Desktop Team Card Component
 * This component is used for desktop/tablet screens (≥768px)
 * For mobile screens, TeamCardMobile is used instead
 */
const TeamCard = ({ member, index, onImageError, variants }: TeamCardProps) => {
  const handleImageError = (error: Error) => {
    console.error(`TeamCard: Failed to load image for ${member.name}:`, {
      error: error.message,
      memberId: member.id,
      imageUrl: member.image,
    });
    if (onImageError) {
      onImageError(error);
    }
  };

  return (
    <motion.div
      key={`${member.id}-${index}`}
      variants={variants}
      className="group bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-dts-cyan/40 hover:shadow-xl hover:shadow-dts-cyan/5 transition-all duration-500 hover:scale-[1.02] flex flex-col w-full"
    >
      <div className="team-image-container rounded-t-2xl bg-gradient-to-br from-dts-blue-dark/20 to-dts-purple/20 p-3">
        <OptimizedImage
          key={`${member.id}-image-${index}`}
          src={member.image || ''}
          alt={member.name}
          className="team-image group-hover:scale-105"
          width={280}
          height={280}
          fallbackSrc="/placeholder.svg"
          onError={handleImageError}
        />
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold mb-1 text-foreground/90 group-hover:text-dts-cyan transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-dts-purple font-medium text-sm mb-3">
          {member.role}
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
          {member.bio}
        </p>
        
        <div className="flex items-center gap-3 mt-auto">
          {member.socialLinks?.linkedin && (
            <a
              href={member.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 min-h-[44px] min-w-[44px] rounded-full bg-background/50 hover:bg-dts-cyan/10 hover:text-dts-cyan transition-all duration-300"
              aria-label={`${member.name}'s LinkedIn profile`}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          
          {member.socialLinks?.twitter && (
            <a
              href={member.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 min-h-[44px] min-w-[44px] rounded-full bg-background/50 hover:bg-dts-cyan/10 hover:text-dts-cyan transition-all duration-300"
              aria-label={`${member.name}'s Twitter profile`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
          )}
          
          {member.socialLinks?.github && (
            <a
              href={member.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 min-h-[44px] min-w-[44px] rounded-full bg-background/50 hover:bg-dts-cyan/10 hover:text-dts-cyan transition-all duration-300"
              aria-label={`${member.name}'s GitHub profile`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;

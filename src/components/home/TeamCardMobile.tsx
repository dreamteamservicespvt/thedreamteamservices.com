import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin } from "lucide-react";
import { TeamMember } from "@/types/team";
import { OptimizedImage } from "@/components/ui/optimized-image";
import "./team-card-mobile-styles.css";

interface TeamCardMobileProps {
  member: TeamMember;
  index: number;
  onImageError?: (error: Error) => void;
}

const TeamCardMobile = ({ member, index, onImageError }: TeamCardMobileProps) => {
  const [showBio, setShowBio] = useState(false);

  const handleToggleBio = useCallback(() => {
    setShowBio(prev => !prev);
  }, []);

  const handleImageError = useCallback((error: Error) => {
    console.error(`TeamCardMobile: Failed to load image for ${member.name}:`, {
      error: error.message,
      memberId: member.id,
      imageUrl: member.image,
    });
    if (onImageError) {
      onImageError(error);
    }
  }, [member.name, member.id, member.image, onImageError]);

  // Memoize the image key to prevent re-renders
  const imageKey = useMemo(() => `${member.id}-${member.image}`, [member.id, member.image]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="mobile-team-card"
      onClick={handleToggleBio}
    >
      {/* Profile Image Section */}
      <div className="mobile-team-card-image-wrapper">
        <div 
          className="mobile-team-card-image-container"
          style={{
            borderRadius: '50%',
            overflow: 'hidden',
            clipPath: 'circle(50% at center)',
            WebkitClipPath: 'circle(50% at center)'
          }}
        >
          {/* Inner wrapper to ensure perfect circle containment */}
          <div 
            className="mobile-team-card-image-wrapper-inner"
            style={{
              borderRadius: '50%',
              overflow: 'hidden',
              clipPath: 'circle(50% at center)',
              WebkitClipPath: 'circle(50% at center)'
            }}
          >
            <OptimizedImage
              key={imageKey}
              src={member.image || ''}
              alt={member.name}
              className="mobile-team-card-image"
              width={200}
              height={200}
              fallbackSrc="/placeholder.svg"
              onError={handleImageError}
              showErrorOverlay={false}
              style={{
                borderRadius: '50%',
                overflow: 'hidden',
                clipPath: 'circle(50% at center)',
                WebkitClipPath: 'circle(50% at center)'
              } as React.CSSProperties}
            />
          </div>
          {/* Decorative Ring */}
          <div className="mobile-team-card-ring"></div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mobile-team-card-info">
        <h3 className="mobile-team-card-name">{member.name}</h3>
        <p className="mobile-team-card-role">{member.role}</p>
        
        {/* Social Links */}
        <div className="mobile-team-card-social">
          {member.socialLinks?.linkedin && (
            <a
              href={member.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-team-card-social-link"
              aria-label={`${member.name}'s LinkedIn profile`}
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          
          {member.socialLinks?.twitter && (
            <a
              href={member.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-team-card-social-link"
              aria-label={`${member.name}'s Twitter profile`}
              onClick={(e) => e.stopPropagation()}
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
              className="mobile-team-card-social-link"
              aria-label={`${member.name}'s GitHub profile`}
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
            </a>
          )}
        </div>

        {/* Tap indicator */}
        <div className="mobile-team-card-tap-hint">
          Tap to {showBio ? 'hide' : 'view'} bio
        </div>
      </div>

      {/* Bio Overlay */}
      <AnimatePresence>
        {showBio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-team-card-bio-overlay"
            onClick={(e) => {
              e.stopPropagation();
              setShowBio(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mobile-team-card-bio-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="mobile-team-card-bio-close"
                onClick={() => setShowBio(false)}
                aria-label="Close bio"
              >
                ✕
              </button>
              <h4 className="mobile-team-card-bio-title">{member.name}</h4>
              <p className="mobile-team-card-bio-role">{member.role}</p>
              <p className="mobile-team-card-bio-text">{member.bio}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TeamCardMobile;

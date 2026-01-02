import React, { useState, useEffect } from 'react';
import { SOCIAL_MEDIA } from '../constants';
import LiquidGlassCard from './LiquidGlassCard';
import { ExternalLink } from 'lucide-react';
import { fetchAllSocialMediaStats, SocialMediaStats } from '../services/socialMediaService';

const Socials: React.FC = () => {
  const [socialStats, setSocialStats] = useState<SocialMediaStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Generate repeating pattern of social media words with randomized order
  const generateSocialPattern = (count: number): string => {
    const words = ['Tiktok', 'Youtube', 'X', 'LinkedIn'];
    // Shuffle the words array for this line
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    let pattern = '';
    for (let i = 0; i < count; i++) {
      const word = shuffledWords[i % shuffledWords.length];
      pattern += word;
    }
    return pattern;
  };

  // Fetch follower counts on component mount
  useEffect(() => {
    const fetchFollowers = async () => {
      setIsLoading(true);
      try {
        const stats = await fetchAllSocialMediaStats(SOCIAL_MEDIA);
        setSocialStats(stats);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error fetching social media stats:', error);
        // Set default values on error
        setSocialStats(SOCIAL_MEDIA.map(social => ({
          name: social.name,
          followers: 0,
          error: 'Failed to fetch',
        })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowers();

    // Refresh every 5 minutes
    const interval = setInterval(fetchFollowers, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Get follower count for a specific platform
  const getFollowerCount = (name: string): number => {
    const stat = socialStats.find(s => s.name === name);
    return stat?.followers || 0;
  };

  // Calculate total followers (excluding Twitter and YouTube which show "coming soon")
  const totalFollowers = socialStats
    .filter(stat => stat.name !== 'X (Twitter)' && stat.name !== 'YouTube')
    .reduce((sum, stat) => sum + stat.followers, 0);

  // Calculate total likes (excluding Twitter and YouTube which show "coming soon")
  const totalLikes = socialStats
    .filter(stat => stat.name !== 'X (Twitter)' && stat.name !== 'YouTube')
    .reduce((sum, stat) => sum + (stat.likes || 0), 0);

  // Format follower count
  const formatFollowers = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <section id="socials" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-20 border-b border-black pb-8">
           <h2 className="text-[10vw] md:text-8xl font-display font-bold text-swiss-black leading-none tracking-tighter">
              SOCIALS<span className="text-swiss-lime">.</span>
           </h2>
        </div>

      </div>

      {/* Red Section with Background Pattern */}
      <div className="relative overflow-hidden bg-swiss-red py-24">
        {/* Large Background Text - Repeating Pattern */}
        <div className="absolute inset-0 z-0 overflow-hidden socials-bg-pattern">
          <div className="socials-bg-text-container">
            {Array(15).fill(null).map((_, i) => (
              <div key={i} className="socials-bg-text-row">
                <span className="font-display font-black text-black/10 select-none pointer-events-none socials-bg-text">
                  {generateSocialPattern(50)}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Total Followers and Likes Display */}
          <div className="mb-16 flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Total Followers */}
            <div className="inline-block">
              {isLoading ? (
                <>
                  <div className="text-6xl md:text-8xl font-display font-black text-black mb-2 animate-pulse">
                    ...
                  </div>
                  <p className="text-2xl font-display font-bold text-black">
                    Loading...
                  </p>
                </>
              ) : (
                <>
                  <div className="text-6xl md:text-8xl font-display font-black text-black mb-2">
                    {formatFollowers(totalFollowers)}
                  </div>
                  <p className="text-2xl font-display font-bold text-black">
                    Total Followers
                  </p>
                </>
              )}
            </div>

            {/* Total Likes */}
            <div className="inline-block">
              {isLoading ? (
                <>
                  <div className="text-6xl md:text-8xl font-display font-black text-black mb-2 animate-pulse">
                    ...
                  </div>
                  <p className="text-2xl font-display font-bold text-black">
                    Loading...
                  </p>
                </>
              ) : (
                <>
                  <div className="text-6xl md:text-8xl font-display font-black text-black mb-2">
                    {formatFollowers(totalLikes)}
                  </div>
                  <p className="text-2xl font-display font-bold text-black">
                    Total Likes
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Social Media Cards */}
          <div className="flex flex-col gap-8">
            {SOCIAL_MEDIA.map((social, index) => {
              const followerCount = getFollowerCount(social.name);
              const stat = socialStats.find(s => s.name === social.name);
              const hasError = stat?.error;

              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <LiquidGlassCard 
                    className="group py-12 px-8 rounded-3xl transition-all duration-500 ease-out cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="flex-1">
                        <h3 className="text-4xl font-display font-bold text-swiss-black mb-2">
                          {social.name}
                        </h3>
                        <p className="text-2xl font-display font-bold text-black/60">
                          {social.description || 'Coming soon'}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center gap-2">
                        <span className="text-lg font-display font-bold text-black/60 group-hover:text-black transition-colors">
                          Visit Profile
                        </span>
                        <ExternalLink className="w-6 h-6 text-black/60 group-hover:text-black transition-colors" />
                      </div>
                    </div>
                  </LiquidGlassCard>
                </a>
              );
            })}
            
            {/* Closing Border */}
            <div className="border-t border-black/10 mt-8"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Socials;


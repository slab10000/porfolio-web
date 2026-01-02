/**
 * Service to fetch follower counts from social media platforms
 * Uses public APIs and scraping techniques where possible
 */

export interface SocialMediaStats {
  name: string;
  followers: number;
  likes?: number;
  error?: string;
}

/**
 * Try multiple CORS proxies in sequence
 */
const fetchWithProxy = async (url: string, retries = 2): Promise<string> => {
  // Use working CORS proxies (removed cors-anywhere.herokuapp.com as it's blocked/requires authorization)
  const proxies = [
    import.meta.env.VITE_CORS_PROXY || 'https://api.allorigins.win/raw?url=',
    'https://api.codetabs.com/v1/proxy?quest=',
    'https://corsproxy.io/?',
  ];

  for (let i = 0; i < proxies.length && retries > 0; i++) {
    try {
      const proxyUrl = proxies[i];
      let fullUrl: string;
      
      if (proxyUrl.includes('allorigins.win')) {
        fullUrl = `${proxyUrl}${encodeURIComponent(url)}`;
      } else if (proxyUrl.includes('codetabs.com')) {
        fullUrl = `${proxyUrl}${encodeURIComponent(url)}`;
      } else if (proxyUrl.includes('corsproxy.io')) {
        fullUrl = `${proxyUrl}${encodeURIComponent(url)}`;
      } else {
        fullUrl = proxyUrl.endsWith('=') || proxyUrl.endsWith('/') 
          ? `${proxyUrl}${encodeURIComponent(url)}`
          : `${proxyUrl}${url}`;
      }
      
      const response = await fetch(fullUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });
      
      if (response.ok) {
        const text = await response.text();
        if (text && text.length > 100) { // Basic validation that we got HTML
          return text;
        }
      } else if (response.status === 403 || response.status === 401) {
        // Skip this proxy if it's blocked/requires auth
        console.warn(`Proxy ${i + 1} blocked (${response.status}), trying next...`);
        continue;
      }
    } catch (error) {
      console.warn(`Proxy ${i + 1} failed:`, error);
      if (i < proxies.length - 1) continue; // Try next proxy
    }
    retries--;
  }
  
  throw new Error('All CORS proxies failed');
};

/**
 * Fetch TikTok follower count and likes using public page scraping
 */
export const fetchTikTokStats = async (url: string): Promise<{ followers: number; likes: number }> => {
  try {
    const match = url.match(/@([^/?]+)/);
    if (!match) {
      throw new Error('Invalid TikTok URL');
    }
    const username = match[1];

    // Use CORS proxy to fetch TikTok profile page
    try {
      const targetUrl = `https://www.tiktok.com/@${username}`;
      const html = await fetchWithProxy(targetUrl);
      
      if (html) {
        let followers = 0;
        let likes = 0;

        // TikTok stores stats in JSON-LD or in script tags
        // Look for follower count in various formats
        const followerMatch = html.match(/"followerCount":\s*(\d+)/);
        if (followerMatch) {
          followers = parseInt(followerMatch[1]);
        } else {
          // Alternative: Look in meta tags or structured data
          const metaMatch = html.match(/followers["\s:]+([\d,]+)/i);
          if (metaMatch) {
            followers = parseInt(metaMatch[1].replace(/,/g, ''));
          }
        }

        // Look for total likes/hearts count
        const likesMatch = html.match(/"heartCount":\s*(\d+)/) || 
                          html.match(/"diggCount":\s*(\d+)/) ||
                          html.match(/"totalLikes":\s*(\d+)/) ||
                          html.match(/"likes":\s*(\d+)/);
        if (likesMatch) {
          likes = parseInt(likesMatch[1]);
        } else {
          // Alternative: Look for likes in structured data
          const likesMetaMatch = html.match(/likes["\s:]+([\d,]+)/i) || 
                                html.match(/hearts["\s:]+([\d,]+)/i);
          if (likesMetaMatch) {
            likes = parseInt(likesMetaMatch[1].replace(/,/g, ''));
          }
        }

        // Try to find in JSON data structures
        const jsonDataMatch = html.match(/<script[^>]*id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>(.*?)<\/script>/);
        if (jsonDataMatch) {
          try {
            const jsonData = JSON.parse(jsonDataMatch[1]);
            const jsonStr = JSON.stringify(jsonData);
            
            // Look for follower count
            if (!followers) {
              const followerJsonMatch = jsonStr.match(/"followerCount":\s*(\d+)/);
              if (followerJsonMatch) {
                followers = parseInt(followerJsonMatch[1]);
              }
            }
            
            // Look for likes/hearts
            if (!likes) {
              const likesJsonMatch = jsonStr.match(/"heartCount":\s*(\d+)/) || 
                                    jsonStr.match(/"totalHeart":\s*(\d+)/) ||
                                    jsonStr.match(/"totalLikes":\s*(\d+)/);
              if (likesJsonMatch) {
                likes = parseInt(likesJsonMatch[1]);
              }
            }
          } catch (e) {
            // JSON parse failed, continue with regex matches
          }
        }

        if (followers > 0 || likes > 0) {
          return { followers, likes };
        }
      }
    } catch (proxyError) {
      console.warn('TikTok scraping failed:', proxyError);
    }

    throw new Error('Unable to fetch TikTok stats');
  } catch (error) {
    console.error('Error fetching TikTok stats:', error);
    throw error;
  }
};

/**
 * Fetch Instagram follower count using public page scraping
 */
export const fetchInstagramFollowers = async (url: string): Promise<number> => {
  try {
    const match = url.match(/instagram\.com\/([^/?]+)/);
    if (!match) {
      throw new Error('Invalid Instagram URL');
    }
    const username = match[1];

    // Use CORS proxy to fetch Instagram profile page
    try {
      const targetUrl = `https://www.instagram.com/${username}/`;
      const html = await fetchWithProxy(targetUrl);
      
      if (html) {
        // Try multiple patterns for Instagram follower count
        const patterns = [
          /"edge_followed_by":\s*{\s*"count":\s*(\d+)/,
          /"follower_count":\s*(\d+)/,
          /"followers":\s*{\s*"count":\s*(\d+)/,
          /followers["\s:]+([\d,]+)/i,
          /(\d+[\d,]*)\s*followers/i,
          /"userInteractionCount":\s*(\d+)/,
        ];
        
        for (const pattern of patterns) {
          const match = html.match(pattern);
          if (match) {
            const count = parseInt(match[1].replace(/,/g, ''));
            if (count > 0) return count;
          }
        }
        
        // Try to find in window._sharedData or similar JSON structures
        const sharedDataMatch = html.match(/window\._sharedData\s*=\s*({.+?});/);
        if (sharedDataMatch) {
          try {
            const sharedData = JSON.parse(sharedDataMatch[1]);
            const entryData = sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user;
            if (entryData?.edge_followed_by?.count) {
              return entryData.edge_followed_by.count;
            }
          } catch (e) {
            // JSON parse failed, continue
          }
        }
        
        // Try to find in script tags with JSON-LD
        const scriptMatches = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs);
        if (scriptMatches) {
          for (const script of scriptMatches) {
            try {
              const json = JSON.parse(script.replace(/<[^>]*>/g, ''));
              const interactionStat = json?.interactionStatistic?.find(
                (stat: any) => stat.interactionType === 'https://schema.org/FollowAction'
              );
              if (interactionStat?.userInteractionCount) {
                return parseInt(interactionStat.userInteractionCount);
              }
            } catch (e) {
              // Continue searching
            }
          }
        }
      }
    } catch (proxyError) {
      console.warn('Instagram scraping failed:', proxyError);
    }

    throw new Error('Unable to fetch Instagram followers');
  } catch (error) {
    console.error('Error fetching Instagram followers:', error);
    throw error;
  }
};

/**
 * Fetch all social media follower counts
 */
export const fetchAllSocialMediaStats = async (
  socialMedia: Array<{ name: string; url: string }>
): Promise<SocialMediaStats[]> => {
  const results: SocialMediaStats[] = [];

  // Fetch all in parallel for better performance
  const promises = socialMedia.map(async (social) => {
    try {
      // Skip fetching for Twitter and YouTube (showing "coming soon")
      if (social.name === 'X (Twitter)' || social.name === 'YouTube') {
        return {
          name: social.name,
          followers: 0,
          likes: 0,
        };
      }

      let followers = 0;
      let likes = 0;

      switch (social.name) {
        case 'TikTok':
          const tiktokStats = await fetchTikTokStats(social.url);
          followers = tiktokStats.followers;
          likes = tiktokStats.likes;
          break;
        case 'Instagram':
          followers = await fetchInstagramFollowers(social.url);
          likes = 0; // Instagram doesn't have total likes on profile
          break;
        default:
          throw new Error(`Unknown platform: ${social.name}`);
      }

      console.log(`✅ ${social.name}: ${followers} followers, ${likes} likes`);
      return {
        name: social.name,
        followers,
        likes,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ ${social.name} error:`, errorMessage);
      return {
        name: social.name,
        followers: 0,
        likes: 0,
        error: errorMessage,
      };
    }
  });

  const fetchedResults = await Promise.all(promises);
  return fetchedResults;
};


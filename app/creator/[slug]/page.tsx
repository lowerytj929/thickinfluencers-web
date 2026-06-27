"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { BadgeCheck, ImageIcon, Eye, Users, Calendar, ExternalLink, Share2, Crown, Lock } from "lucide-react";
import Link from "next/link";
import MediaCard from "@/components/shared/MediaCard";
import { createClient } from "@/lib/supabase/client";

// Creator data keyed by slug
const creatorsData: Record<string, {
  displayName: string;
  username: string;
  bio: string;
  about: string;
  isVerified: boolean;
  avatarSrc?: string;
  stats: { galleries: number; views: number; members: number };
  joinedDate: string;
  location: string;
  website?: string;
  instagram?: string;
  onlyfans?: string;
  galleries: { id: string; title: string; viewCount: number; likeCount: number; isPremium: boolean; tags: string[]; imageSrc?: string }[];
}> = {
  "graciebon": {
    displayName: "Gracie Bon",
    username: "@graciebon",
    bio: "Panamanian plus-size model & international thicc icon | Body positivity",
    about: "Gracie Bon is a world-renowned model and content creator known for her iconic hourglass figure and empowering body positivity message. She has amassed millions of loyal fans across Instagram and OnlyFans, regularly releasing high-glam photo sets and exclusive behind-the-scenes vault videos.",
    isVerified: true,
    avatarSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    stats: { galleries: 42, views: 1420000, members: 54000 },
    joinedDate: "January 2024",
    location: "Panama City, PA",
    instagram: "graciebon",
    onlyfans: "graciebon",
    galleries: [
      { id: "1", title: "Summer Poolside Glow 2025", viewCount: 28400, likeCount: 3200, isPremium: false, tags: ["summer", "pool", "thicc", "bikini"], imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80" },
      { id: "2", title: "Miami Yacht Party VIP Leaks", viewCount: 45200, likeCount: 6100, isPremium: true, tags: ["yacht", "vip", "exclusive"], imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80" },
      { id: "3", title: "Casual Street Style Fit Check", viewCount: 19700, likeCount: 2400, isPremium: false, tags: ["streetwear", "curvy", "casual"], imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80" },
    ],
  },
  "sammydraper": {
    displayName: "Sammy Draper",
    username: "@sammydraper",
    bio: "Curvy fitness influencer & lifestyle creator | Spreading good vibes ✨",
    about: "Sammy Draper is a viral fitness and lifestyle model famous for her stunning athletic curves and infectious personality. Her content blends gym motivation, glamorous fashion check-ins, and spicy exclusive sets for her inner circle.",
    isVerified: true,
    avatarSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
    stats: { galleries: 38, views: 980000, members: 32000 },
    joinedDate: "March 2024",
    location: "Los Angeles, CA",
    instagram: "sammydraper",
    onlyfans: "sammydraper",
    galleries: [
      { id: "4", title: "Morning Gym Routine & Leg Day", viewCount: 22100, likeCount: 2900, isPremium: false, tags: ["fitness", "gym", "workout"], imageSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80" },
      { id: "5", title: "Late Night Bedroom Try-On Haul", viewCount: 38400, likeCount: 4900, isPremium: true, tags: ["try-on", "lingerie", "exclusive"], imageSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80" },
    ],
  },
  "sophiehall": {
    displayName: "Sophie Hall",
    username: "@sophiehall",
    bio: "British baddie | High fashion curve model | London & LA",
    about: "Sophie Hall bridges the gap between high-end runway aesthetics and sultry curve modeling. With flawless makeup styling and striking outfits, she delivers premium visual experiences that set the standard for modern influencers.",
    isVerified: true,
    avatarSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
    stats: { galleries: 31, views: 850000, members: 28000 },
    joinedDate: "February 2024",
    location: "London, UK",
    instagram: "sophiehall",
    onlyfans: "sophiehall",
    galleries: [
      { id: "6", title: "London Studio Editorial", viewCount: 34100, likeCount: 4100, isPremium: true, tags: ["editorial", "london", "glam"], imageSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80" },
      { id: "7", title: "Sunkissed in Ibiza", viewCount: 18900, likeCount: 2100, isPremium: false, tags: ["ibiza", "travel", "sun"], imageSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80" },
    ],
  },
  "miamalkova": {
    displayName: "Mia Malkova",
    username: "@miamalkova",
    bio: "Legendary superstar creator | Gamer | Twitch streamer & VIP entertainer",
    about: "Mia Malkova is an absolute legend in the entertainment industry. From viral Twitch streaming to producing cinematic top-tier adult content, Mia continues to dominate web traffic and captivate millions worldwide.",
    isVerified: true,
    avatarSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Mia_Malkova_2016.jpg?width=600",
    stats: { galleries: 64, views: 4200000, members: 110000 },
    joinedDate: "November 2023",
    location: "Austin, TX",
    instagram: "miamalkova",
    onlyfans: "miamalkova",
    galleries: [
      { id: "8", title: "Twitch Setup Tour & Cosplay Reveal", viewCount: 52100, likeCount: 7800, isPremium: false, tags: ["gamer", "cosplay", "streamer"], imageSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Mia_Malkova_2016.jpg?width=600" },
      { id: "9", title: "Uncensored Vault Masterpiece Collection", viewCount: 98400, likeCount: 14200, isPremium: true, tags: ["uncensored", "vip", "masterpiece"], imageSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Mia_Malkova_2016.jpg?width=600" },
    ],
  },
  "abelladanger": {
    displayName: "Abella Danger",
    username: "@abelladanger",
    bio: "Miami queen | Viral sensation | Unstoppable energy 🔥",
    about: "Abella Danger brings high-octane energy and charismatic charm wherever she goes. Whether starring in chart-topping productions or sharing candid vlog moments, Abella is a undisputed powerhouse.",
    isVerified: true,
    avatarSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Abella_Danger_2016.jpg?width=600",
    stats: { galleries: 55, views: 3900000, members: 95000 },
    joinedDate: "December 2023",
    location: "Miami, FL",
    instagram: "abelladanger",
    onlyfans: "abelladanger",
    galleries: [
      { id: "10", title: "South Beach Weekend Vibes", viewCount: 41200, likeCount: 5300, isPremium: false, tags: ["miami", "beach", "party"], imageSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Abella_Danger_2016.jpg?width=600" },
    ],
  },
  "violetmyers": {
    displayName: "Violet Myers",
    username: "@violetmyers",
    bio: "Your favorite anime waifu | Gamer girl | Cosplay enthusiast 💜",
    about: "Violet Myers combines geek culture with ultimate sex appeal. Known for her hilarious YouTube videos, custom anime cosplays, and jaw-dropping curves, Violet has built one of the most dedicated fanbases on the internet.",
    isVerified: true,
    avatarSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Violet_Myers_(hru,_2022,_23minA).jpg?width=600",
    stats: { galleries: 47, views: 2800000, members: 74000 },
    joinedDate: "January 2024",
    location: "Los Angeles, CA",
    instagram: "waifu_violet",
    onlyfans: "violetmyers",
    galleries: [
      { id: "11", title: "Custom Anime Waifu Cosplay Photoshoot", viewCount: 36700, likeCount: 4800, isPremium: false, tags: ["cosplay", "anime", "waifu"], imageSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Violet_Myers_(hru,_2022,_23minA).jpg?width=600" },
      { id: "12", title: "VIP Private Stream Highlights", viewCount: 61200, likeCount: 8900, isPremium: true, tags: ["private", "stream", "vip"], imageSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Violet_Myers_(hru,_2022,_23minA).jpg?width=600" },
    ],
  },
  "moriahmills": {
    displayName: "Moriah Mills",
    username: "@moriahmills",
    bio: "Actress | Model | Singer | The ultimate curve sensation",
    about: "Moriah Mills is a multi-talented entertainer and model whose dramatic curves and fearless attitudes make headlines. Her vault contains some of the most sought-after exclusive sets online.",
    isVerified: true,
    avatarSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
    stats: { galleries: 29, views: 1900000, members: 41000 },
    joinedDate: "February 2024",
    location: "Atlanta, GA",
    instagram: "moriahmills",
    onlyfans: "moriahmills",
    galleries: [
      { id: "13", title: "Atlanta Mansion VIP Set", viewCount: 29400, likeCount: 3400, isPremium: true, tags: ["mansion", "atlanta", "vip"], imageSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80" },
    ],
  },
  "angelawhite": {
    displayName: "Angela White",
    username: "@angelawhite",
    bio: "Hall of Fame Icon | Award-winning director & performer | Australian Royalty 👑",
    about: "Angela White is global royalty. As a Hall of Fame performer, director, and academic scholar, she exemplifies beauty, intelligence, and unmatched sensual power.",
    isVerified: true,
    avatarSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Angela_White_2019_by_Glenn_Francis_(cropped).jpg?width=600",
    stats: { galleries: 72, views: 5800000, members: 145000 },
    joinedDate: "October 2023",
    location: "Melbourne / LA",
    instagram: "theangelawhite",
    onlyfans: "angelawhite",
    galleries: [
      { id: "14", title: "Golden Goddess Cinematic Series", viewCount: 78400, likeCount: 11200, isPremium: true, tags: ["goddess", "cinematic", "royalty"], imageSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Angela_White_2019_by_Glenn_Francis_(cropped).jpg?width=600" },
    ],
  },
  "zoespencer": {
    displayName: "Zoe Spencer",
    username: "@zoespencer",
    bio: "Viral Thicc Icon | Try-on haul queen | Unfiltered aesthetic 🔥",
    about: "Zoe Spencer dominates social media feeds with her jaw-dropping curves and bold try-on hauls. Her exclusive vault sets feature raw, candid moments and viral wardrobe clips.",
    isVerified: true,
    avatarSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
    stats: { galleries: 34, views: 2400000, members: 58000 },
    joinedDate: "January 2024",
    location: "Miami, FL",
    instagram: "zoespencer",
    onlyfans: "zoespencer",
    galleries: [
      { id: "15", title: "Zoe Spencer VIP Wardrobe Try-On & Slip Compilation", viewCount: 64200, likeCount: 8900, isPremium: false, tags: ["tryon", "slip", "thicc", "viral"], imageSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80" },
    ],
  },
  "aspenkartier": {
    displayName: "Aspen Kartier",
    username: "@aspenkartier",
    bio: "Atlanta baddie | Poolside live streams | Uncensored vibes 👑",
    about: "Aspen Kartier is the definition of luxury and allure. Known for her viral stream moments and exclusive bikini sets, she brings unmatched glamour to the platform.",
    isVerified: true,
    avatarSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    stats: { galleries: 28, views: 1800000, members: 42000 },
    joinedDate: "February 2024",
    location: "Atlanta, GA",
    instagram: "aspenkartier",
    onlyfans: "aspenkartier",
    galleries: [
      { id: "16", title: "Aspen Kartier Uncensored Poolside Stream Highlights", viewCount: 58100, likeCount: 7400, isPremium: true, tags: ["pool", "stream", "baddie", "bikini"], imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80" },
    ],
  },
  "amouranth": {
    displayName: "Amouranth",
    username: "@amouranth",
    bio: "Top Twitch Streamer | Entrepreneur | Hot Tub Legend 💖",
    about: "Kaitlyn 'Amouranth' Siragusa is one of the most successful live streamers in internet history. Famous for her viral hot tub streams and ASMR broadcasts.",
    isVerified: true,
    avatarSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Amouranth_in_2022.jpg?width=600",
    stats: { galleries: 88, views: 9200000, members: 210000 },
    joinedDate: "August 2023",
    location: "Houston, TX",
    instagram: "amouranth",
    onlyfans: "amouranth",
    galleries: [
      { id: "17", title: "Amouranth Hot Tub Stream Viral Malfunction & Slips Vault", viewCount: 112000, likeCount: 18400, isPremium: false, tags: ["twitch", "hottub", "clip", "slip"], imageSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Amouranth_in_2022.jpg?width=600" },
    ],
  },
  "corinnakopf": {
    displayName: "Corinna Kopf",
    username: "@corinnakopf",
    bio: "Vlog Squad Royalty | Top OF Earner | Unfiltered Celeb 🌟",
    about: "Corinna Kopf broke records across the internet with her bold personality and exclusive content drops. Her vault features candid afterparty streams and viral slips.",
    isVerified: true,
    avatarSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
    stats: { galleries: 52, views: 6400000, members: 165000 },
    joinedDate: "September 2023",
    location: "Los Angeles, CA",
    instagram: "corinnakopf",
    onlyfans: "corinnakopf",
    galleries: [
      { id: "18", title: "Celeb Slips: Corinna VIP Stream Afterparty Leaks", viewCount: 94300, likeCount: 15100, isPremium: true, tags: ["celeb", "slip", "afterparty", "vip"], imageSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80" },
    ],
  },
  "skybri": {
    displayName: "Sky Bri",
    username: "@skybri",
    bio: "Viral Podcast Star | Model | Unstoppable Internet Sensation 🔥",
    about: "Sky Bri skyrocketed to fame with her stunning looks and fearless podcast appearances. Explore her behind-the-scenes vault and unreleased footage.",
    isVerified: true,
    avatarSrc: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=80",
    stats: { galleries: 41, views: 4100000, members: 89000 },
    joinedDate: "December 2023",
    location: "Los Angeles, CA",
    instagram: "realskybri",
    onlyfans: "skybri",
    galleries: [
      { id: "19", title: "Sky Bri Podcast Raw Cut & Behind The Scenes Slips", viewCount: 82100, likeCount: 12300, isPremium: false, tags: ["podcast", "raw", "bts", "slip"], imageSrc: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=80" },
    ],
  },
  "alinity": {
    displayName: "Alinity",
    username: "@alinity",
    bio: "Twitch Partner | Gaming Star | Viral Wardrobe Clip Queen 🎮",
    about: "Alinity has been entertaining Twitch audiences for years. Famous for her viral live broadcast clips and candid gaming moments.",
    isVerified: true,
    avatarSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
    stats: { galleries: 45, views: 3800000, members: 72000 },
    joinedDate: "October 2023",
    location: "Colombia / Canada",
    instagram: "alinitydivine",
    onlyfans: "alinity",
    galleries: [
      { id: "20", title: "Alinity Gaming Chair Wardrobe Slip & Viral Twitch Clip", viewCount: 76500, likeCount: 9800, isPremium: false, tags: ["twitch", "gaming", "slip", "viral"], imageSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80" },
    ],
  },
};

export default function CreatorProfilePage() {
  const params = useParams();
  const slug = (params.slug as string)?.toLowerCase();
  const creator = creatorsData[slug];
  const [liveGalleries, setLiveGalleries] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    if (!creator) return;
    async function fetchLivePosts() {
      const { data } = await supabase
        .from("galleries")
        .select("*")
        .eq("visibility", "public")
        .order("created_at", { ascending: false });

      if (data) {
        const filtered = data.filter((g: any) => {
          const tList = g.tags || [];
          return tList.includes(`ig:${creator.instagram}`) ||
                 tList.includes(`of:${creator.onlyfans}`) ||
                 tList.includes(slug) ||
                 g.title.toLowerCase().includes(creator.displayName.toLowerCase());
        }).map((g: any) => ({
          id: g.slug || g.id,
          title: g.title,
          viewCount: g.view_count || 1540,
          likeCount: g.like_count || 210,
          isPremium: g.is_premium || false,
          tags: g.tags || ["vault", "live"],
          imageSrc: g.cover_url || creator.avatarSrc,
        }));
        setLiveGalleries(filtered);
      }
    }
    fetchLivePosts();
  }, [creator, slug, supabase]);

  if (!creator) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-bg-surface flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-text-muted" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Creator Not Found</h1>
          <p className="text-text-secondary mb-6">
            The model profile you are looking for has not been indexed yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-pink text-white font-semibold rounded-xl hover:opacity-90 transition-all"
          >
            Back to Browse Feed
          </Link>
        </div>
      </div>
    );
  }

  const allGalleries = [...liveGalleries, ...creator.galleries];

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      {/* ─── Profile Header ─── */}
      <div className="relative">
        {/* Cover gradient */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-accent-pink/30 via-accent-purple/20 to-[#110c1c] border-b border-border-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(217,29,91,0.2),transparent_60%)]" />
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="relative -mt-20 md:-mt-24 flex flex-col md:flex-row md:items-end gap-6 md:gap-8 pb-8 border-b border-border-dark">
            {/* Avatar */}
            <div className="relative shrink-0 mx-auto md:mx-0">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-3xl overflow-hidden border-4 border-bg-primary bg-bg-surface shadow-2xl relative flex items-center justify-center bg-gradient-to-tr from-accent-pink/30 to-accent-purple/30">
                {creator.avatarSrc ? (
                  <Image fill src={creator.avatarSrc} alt={creator.displayName} sizes="176px" className="object-cover" />
                ) : (
                  <span className="text-5xl md:text-6xl font-black text-white drop-shadow-md">
                    {creator.displayName.charAt(0)}
                  </span>
                )}
              </div>
              {creator.isVerified && (
                <BadgeCheck className="absolute -bottom-1 -right-1 w-9 h-9 text-accent-pink fill-bg-primary drop-shadow-md" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pb-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-2 md:gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-black text-text-primary truncate flex items-center justify-center md:justify-start gap-2">
                  {creator.displayName}
                  {creator.isVerified && <BadgeCheck className="w-7 h-7 text-accent-pink shrink-0" />}
                </h1>
              </div>
              <p className="text-base font-semibold text-accent-pink mb-2">{creator.username}</p>
              <p className="text-sm text-text-secondary max-w-2xl">{creator.bio}</p>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-5 py-3 px-6 bg-bg-surface/80 rounded-2xl border border-border-dark w-fit mx-auto md:mx-0">
                <div className="flex items-center gap-2 text-sm">
                  <ImageIcon className="w-4 h-4 text-accent-pink" />
                  <span className="font-bold text-text-primary">{allGalleries.length}</span>
                  <span className="text-text-muted">Sets</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="w-4 h-4 text-accent-purple" />
                  <span className="font-bold text-text-primary">{formatCount(creator.stats.views)}</span>
                  <span className="text-text-muted">Views</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-accent-gold" />
                  <span className="font-bold text-text-primary">{formatCount(creator.stats.members)}</span>
                  <span className="text-text-muted">Fans</span>
                </div>
              </div>
            </div>

            {/* Social Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 pt-4 md:pt-0">
              {creator.instagram && (
                <a
                  href={`https://instagram.com/${creator.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-black text-sm shadow-lg hover:opacity-95 transition-all flex items-center gap-2 hover:scale-105"
                >
                  📸 Follow on IG
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {creator.onlyfans && (
                <a
                  href={`https://onlyfans.com/${creator.onlyfans}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-[#00aff0] text-white font-black text-sm shadow-lg hover:bg-[#0096ce] transition-all flex items-center gap-2 hover:scale-105"
                >
                  🔒 OnlyFans VIP
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── About + Gallery Grid ─── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              {/* About */}
              <div className="bg-bg-card border border-border-dark rounded-2xl p-6 shadow-md">
                <h3 className="text-xs font-bold text-text-muted mb-3 uppercase tracking-wider flex items-center gap-2">
                  ℹ️ About Model
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed font-medium">
                  {creator.about}
                </p>
              </div>

              {/* Details */}
              <div className="bg-bg-card border border-border-dark rounded-2xl p-6 space-y-4 shadow-md">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-accent-pink shrink-0" />
                  <span className="text-text-secondary font-medium">Joined {creator.joinedDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-accent-purple shrink-0" />
                  <span className="text-text-secondary font-medium">{creator.location}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Gallery Grid */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-text-primary flex items-center gap-2">
                🎬 Vault Galleries
                <span className="text-sm font-bold px-3 py-1 bg-bg-surface border border-border-dark rounded-full text-accent-pink">
                  {allGalleries.length}
                </span>
              </h2>
            </div>
            <div className="grid-gallery">
              {allGalleries.map((gallery: any) => (
                <Link key={gallery.id} href={`/gallery/${gallery.id}`}>
                  <MediaCard
                    title={gallery.title}
                    creatorName={creator.displayName}
                    viewCount={gallery.viewCount}
                    likeCount={gallery.likeCount}
                    isPremium={gallery.isPremium}
                    tags={gallery.tags}
                    imageSrc={gallery.imageSrc || creator.avatarSrc}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}
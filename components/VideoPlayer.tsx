"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function VideoPlayer({ videoId = "Xt_RLNx1eBM", title = "Product Demo", coverImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" }: { videoId?: string, title?: string, coverImage?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video bg-black border border-white/10 overflow-hidden group">
      {!isPlaying ? (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 group-hover:bg-black/40 transition-colors cursor-pointer" onClick={() => setIsPlaying(true)}>
           {/* Placeholder Image */}
           <Image 
             src={coverImage}
             alt="Video Cover"
             fill
             className="object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-500"
           />
           <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40"></div>
           
           <div className="relative z-20 flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/10">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
                <div className="text-center">
                    <p className="text-xs font-mono text-blue-400 mb-2 tracking-widest uppercase">Watch Demo</p>
                    <h3 className="text-2xl font-light text-white tracking-tight">{title}</h3>
                </div>
           </div>
        </div>
      ) : (
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`} 
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus, Users, MapPin, Target, AlertCircle } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  type: "person" | "location" | "object" | "threat";
  confidence: number;
}

export const IntelligenceTagging = () => {
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", name: "VLADIMIR KOZLOV", type: "person", confidence: 94 },
    { id: "2", name: "KHORRAMSHAHR PORT", type: "location", confidence: 87 },
    { id: "3", name: "CARGO VESSEL", type: "object", confidence: 76 },
    { id: "4", name: "SUSPICIOUS ACTIVITY", type: "threat", confidence: 82 },
  ]);
  
  const [newTag, setNewTag] = useState("");

  const getTagIcon = (type: Tag["type"]) => {
    switch (type) {
      case "person": return <Users className="h-3 w-3" />;
      case "location": return <MapPin className="h-3 w-3" />;
      case "object": return <Target className="h-3 w-3" />;
      case "threat": return <AlertCircle className="h-3 w-3" />;
    }
  };

  const getTagColor = (type: Tag["type"]) => {
    switch (type) {
      case "person": return "text-gotham-accent border-gotham-accent/40";
      case "location": return "text-gotham-ok border-gotham-ok/40";
      case "object": return "text-gotham-text-1 border-gotham-line-2";
      case "threat": return "text-gotham-alert border-gotham-alert/40";
    }
  };

  const addTag = () => {
    if (!newTag.trim()) return;
    
    const tag: Tag = {
      id: Date.now().toString(),
      name: newTag.toUpperCase(),
      type: "object",
      confidence: Math.floor(Math.random() * 30) + 70,
    };
    
    setTags([...tags, tag]);
    setNewTag("");
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-gotham-line-1 pb-2">
        <h3 className="text-section font-mono uppercase tracking-wider text-gotham-text-1">
          INTELLIGENCE TAGGING
        </h3>
        <p className="text-label font-mono text-gotham-text-2">
          PERSONS / OBJECTS / LOCATIONS OF INTEREST
        </p>
      </div>

      <div className="space-y-3">
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-center justify-between">
            <div className={`intelligence-tag flex items-center gap-2 px-2 py-1 text-label font-mono ${getTagColor(tag.type)}`}>
              {getTagIcon(tag.type)}
              <span>{tag.name}</span>
            </div>
            <div className="text-label font-mono text-gotham-text-2">
              {tag.confidence}%
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="ADD NEW TAG..."
          className="h-8 bg-gotham-bg-1 border-gotham-line-1 text-label font-mono uppercase text-gotham-text-1"
          onKeyPress={(e) => e.key === "Enter" && addTag()}
        />
        <button
          onClick={addTag}
          className="gotham-button h-8 w-8 flex items-center justify-center"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
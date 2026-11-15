import {
  Users, Zap, Trophy, Target, Shield, Flame,
  Heart, Sparkles, FileCheck2, Star,
  MapPin, Dumbbell, Video, type LucideProps,
} from "lucide-react";
import type { IconName } from "@/data/team-theme";

const MAP: Record<IconName, React.ComponentType<LucideProps>> = {
  users: Users,
  zap: Zap,
  trophy: Trophy,
  target: Target,
  shield: Shield,
  flame: Flame,
  heart: Heart,
  sparkles: Sparkles,
  "file-check": FileCheck2,
  star: Star,
  "map-pin": MapPin,
  dumbbell: Dumbbell,
  video: Video,
};

export function TeamIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = MAP[name] ?? Star;
  return <Icon {...props} />;
}
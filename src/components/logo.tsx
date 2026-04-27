import { Heart } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Heart className="h-7 w-7 text-primary fill-primary/10" />
      <h1 className="text-xl font-bold tracking-tighter text-foreground">
        Lovely Tools
      </h1>
    </div>
  );
}

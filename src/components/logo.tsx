import { BookHeart } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <BookHeart className="h-7 w-7 text-primary" />
      <h1 className="text-xl font-bold tracking-tighter text-foreground">
        pypapers.in
      </h1>
    </div>
  );
}

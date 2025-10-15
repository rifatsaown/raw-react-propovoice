import { Card, CardContent, CardHeader } from './ui/card';

interface ImageCardProps {
  imageSrc: string;
  title: string;
  caption: string;
}

export default function ImageCard({
  imageSrc,
  title,
  caption,
}: ImageCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-auto object-cover rounded-t-xl"
        />
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {caption}
        </p>
      </CardContent>
    </Card>
  );
}

// Example usage:
export function ImageCardExample() {
  return (
    <div className="p-6">
      <ImageCard
        imageSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center"
        title="Beautiful Mountain View"
        caption="A stunning landscape featuring snow-capped mountains under a clear blue sky, perfect for nature enthusiasts and adventure seekers."
      />
    </div>
  );
}

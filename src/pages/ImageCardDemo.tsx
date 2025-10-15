import ImageCard from '@/components/ImageCard';

export default function ImageCardDemo() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          ImageCard Component Demo
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example 1: Nature */}
          <ImageCard
            imageSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center"
            title="Mountain Landscape"
            caption="A breathtaking view of snow-capped mountains under a clear blue sky, perfect for nature enthusiasts and adventure seekers."
          />

          {/* Example 2: Architecture */}
          <ImageCard
            imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=center"
            title="Modern Architecture"
            caption="Contemporary building design showcasing clean lines and innovative structural elements in urban environments."
          />

          {/* Example 3: Technology */}
          <ImageCard
            imageSrc="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center"
            title="Technology Innovation"
            caption="Cutting-edge technology and digital transformation reshaping the way we interact with the modern world."
          />

          {/* Example 4: Food */}
          <ImageCard
            imageSrc="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center"
            title="Gourmet Cuisine"
            caption="Artfully prepared dishes that combine flavors, textures, and presentation to create memorable dining experiences."
          />

          {/* Example 5: Travel */}
          <ImageCard
            imageSrc="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop&crop=center"
            title="Wanderlust Adventures"
            caption="Exploring new destinations and cultures while creating unforgettable memories around the globe."
          />

          {/* Example 6: Art */}
          <ImageCard
            imageSrc="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center"
            title="Creative Expression"
            caption="Artistic creativity and visual storytelling that captures emotions and inspires imagination."
          />
        </div>
      </div>
    </div>
  );
}

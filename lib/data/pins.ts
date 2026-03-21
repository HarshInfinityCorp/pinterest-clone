export interface Pin {
  id: string
  image: string
  video?: string
  title: string
  author: {
    name: string
    avatar: string
  }
  height: number
}

const sampleImages = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  'https://plus.unsplash.com/premium_photo-1773452093235-06429f4c844d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400',
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
  'https://images.unsplash.com/photo-1503602642458-232111445657?w=400',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
  'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400',
  'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400',
  'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
  'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400',
  'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400',
  'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400',
  'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=400',
  'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400',
  'https://images.unsplash.com/photo-1563903530908-afdd155d057a?w=400',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
]

const sampleTitles = [
  'Beautiful interior design ideas for your home',
  'Minimalist workspace setup inspiration',
  'Healthy breakfast recipes to try',
  'Fashion trends for 2024',
  'DIY home decor projects',
  'Travel destinations bucket list',
  'Cute pet photography ideas',
  'Wedding planning inspiration',
  'Fitness motivation and workout tips',
  'Delicious dessert recipes',
  'Garden landscaping ideas',
  'Modern architecture inspiration',
  'Art and illustration collection',
  'Photography composition tips',
  'Makeup and beauty tutorials',
  'Car enthusiast collection',
  'Tech gadgets review',
  'Book recommendations',
  'Movie poster collection',
  'Music album artwork',
  'Street style fashion',
  'Luxury lifestyle inspiration',
  'Vintage aesthetic collection',
  'Nature photography showcase',
  'Cooking and food styling',
  'Handmade crafts and DIY',
  'Yoga and meditation space',
  'Bedroom design ideas',
  'Bathroom renovation inspiration',
  'Kitchen organization hacks',
]

const sampleAuthors = [
  { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { name: 'Mike Chen', avatar: 'https://i.pravatar.cc/150?u=mike' },
  { name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?u=emma' },
  { name: 'David Park', avatar: 'https://i.pravatar.cc/150?u=david' },
  { name: 'Lisa Anderson', avatar: 'https://i.pravatar.cc/150?u=lisa' },
  { name: 'James Brown', avatar: 'https://i.pravatar.cc/150?u=james' },
  { name: 'Nina Patel', avatar: 'https://i.pravatar.cc/150?u=nina' },
  { name: 'Tom Wilson', avatar: 'https://i.pravatar.cc/150?u=tom' },
  { name: 'Sophie Turner', avatar: 'https://i.pravatar.cc/150?u=sophie' },
  { name: 'Alex Kim', avatar: 'https://i.pravatar.cc/150?u=alex' },
]

// Sample video URLs for some pins (using public domain videos)
const sampleVideos = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
]

function generateHeight(index: number): number {
  // Pinterest uses a range of aspect ratios for masonry effect
  // Use index-based selection instead of Math.random() to keep SSR & client in sync
  const heights = [280, 320, 380, 420, 480, 520, 580, 620, 380, 420]
  return heights[index % heights.length]
}

export const pins: Pin[] = Array.from({ length: 100 }, (_, i) => {
  // Use a deterministic pattern instead of Math.random() to avoid SSR/client mismatch
  const hasVideo = i % 7 === 0 // every 7th pin has a video (~14%)

  return {
    id: `pin-${i}`,
    image: `https://picsum.photos/seed/pinterest${i}/400/${generateHeight(i)}`,
    ...(hasVideo && { video: sampleVideos[i % sampleVideos.length] }),
    title: sampleTitles[i % sampleTitles.length],
    author: sampleAuthors[i % sampleAuthors.length],
    height: generateHeight(i),
  }
})

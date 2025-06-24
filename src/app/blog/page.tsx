'use client';

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from '../../contexts/LanguageContext';

export default function Blog() {
  const { t } = useLanguage();

  const blogPosts = [
    {
      key: 'youthBand',
      image: "/assets/Full youth band practicing for worship.jpg",
      alt: "Full youth band practicing for worship",
      content: `We're grateful to God for the musical talents in our community. Our youth band has been practicing to prepare for this week's worship service. We're learning that worship isn't just about music, but about offering our best to God.

Every Tuesday and Thursday evening, our youth gather in the church basement to practice songs for Sunday worship. This week, they've been working on "How Great Thou Art" and "Amazing Grace" - two timeless hymns that remind us of God's majesty and love.

Pastor Nguyen often reminds us that worship is not about performance, but about connecting with God and helping others connect with Him too. The youth band members are learning this important lesson as they practice not just the notes, but the heart behind the music.

We're also thankful for the support of our church family who donated the instruments and sound equipment. Your generosity is helping young people develop their gifts and serve God through music.

If you're interested in joining the youth band or have musical talents to share, please talk to Pastor Nguyen or any of our youth leaders. We believe everyone has gifts that can be used to glorify God.`
    },
    {
      key: 'crossCultural',
      image: "/assets/Meredith and Nguyen Anh duet Thank you Jesus for the Blood.jpg",
      alt: "Meredith and Nguyen Anh duet Thank you Jesus for the Blood",
      content: `We're thankful for the special collaboration between Meredith and Nguyen Anh in our worship service. The song "Thank You Jesus for the Blood" reminded us of God's unconditional love. We're learning that music can transcend language and cultural barriers.

Meredith, who has been attending our church for the past year, approached Nguyen Anh with the idea of singing this powerful worship song together. Despite the language differences, they found common ground in their love for God and desire to worship Him.

The song "Thank You Jesus for the Blood" speaks of the sacrifice Jesus made on the cross for our sins. As they sang together - Meredith in English and Nguyen Anh in Vietnamese - the congregation was moved by the beautiful harmony of two cultures united in worship.

Pastor Nguyen shared after the service that this moment reminded him of Revelation 7:9, which describes people from every nation, tribe, and language standing before the throne of God. "This is what heaven will be like," he said, "people from all backgrounds worshiping God together."

We're grateful for how God is working in our church to break down cultural barriers and bring people together in worship. This collaboration has inspired other members to consider how they can use their gifts to bridge cultural divides.

If you're interested in participating in our worship ministry or have ideas for cross-cultural collaborations, please speak with our worship team leaders.`
    },
    {
      key: 'youthFellowship',
      image: "/assets/Youth gathers at house for fellowship and karaoke.jpg",
      alt: "Youth gathers at house for fellowship and karaoke",
      content: `We believe friendship and fellowship are important parts of Christian life. Our youth had a wonderful evening at a member's home, singing karaoke and sharing life together. We're learning that God wants us to have fun and enjoy friendship with each other.

The event was organized by our youth leaders as a way to build deeper relationships outside of regular church activities. About 15 young people gathered at the home of the Nguyen family, who generously opened their home for this fellowship time.

The evening started with prayer and a short devotion about friendship in the Bible. We looked at the friendship between David and Jonathan, and how they supported each other through difficult times. This reminded us that true friendship is a gift from God.

Then the karaoke fun began! We sang both Vietnamese and English songs, from traditional hymns to contemporary Christian music. It was amazing to see how music brought everyone together, regardless of language or cultural background.

Between songs, we shared snacks and stories about our week. Many of the youth talked about challenges they're facing at school or work, and others offered encouragement and prayer. This is what Christian fellowship is all about - supporting each other in both good times and bad.

We ended the evening with a group prayer, thanking God for the gift of friendship and asking Him to help us be better friends to each other. Everyone left feeling encouraged and connected.

If you're a young person looking for Christian fellowship and friendship, we'd love to have you join our youth group. Contact Pastor Nguyen or any of our youth leaders for more information.`
    },
    {
      key: 'tetCelebration',
      image: "/assets/Tet Holiday Event 2025 _ Ladies in Traditional Dress.jpg",
      alt: "Tet Holiday Event 2025 _ Ladies in Traditional Dress",
      content: `We're grateful to God for the opportunity to celebrate Tet in our community. The ladies wore beautiful traditional dresses, showing pride in Vietnamese culture. We're learning that God loves cultural diversity and wants us to honor Him through our culture.

Our Tet celebration was a wonderful blend of traditional Vietnamese customs and Christian worship. The event began with a special prayer service, where we thanked God for the past year and asked for His blessing in the new year.

The highlight of the celebration was the traditional dress parade, where women and girls of all ages wore their most beautiful ao dai. The vibrant colors and elegant designs reminded us of the beauty and creativity that God has given to Vietnamese culture.

We also enjoyed traditional Tet foods like banh chung, banh tet, and various sweets. The children especially loved receiving lucky money (li xi) from the elders, a custom that teaches respect for older generations.

Pastor Nguyen shared a message about how God created different cultures and languages, and how each one reflects different aspects of His character. "Vietnamese culture," he said, "emphasizes family, respect, and community - all values that are important to God."

The celebration included traditional music and dance performances, as well as modern worship songs in Vietnamese. It was a beautiful reminder that we can worship God in our own cultural context while still being part of the global Christian family.

We're thankful for all the volunteers who helped organize this special event, and for the support of our church family in making it a success. May God continue to bless our Vietnamese community and help us share His love with others.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-300 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-2xl">✝</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{t('church.name')}</h1>
                  <p className="text-sm text-gray-700 font-semibold">{t('church.subtitle')}</p>
                </div>
              </Link>
            </div>
            <Link href="/" className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-xl text-lg">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
            {t('stories.title')}
          </h1>
          <p className="text-2xl text-gray-800 leading-relaxed font-semibold">
            {t('stories.subtitle')}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-20">
            {blogPosts.map((post, index) => (
              <article key={post.key} className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow border-2 border-gray-200">
                <div className="relative h-96 lg:h-[500px]">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                
                <div className="p-12">
                  <div className="flex items-center space-x-4 mb-8">
                    <span className="text-orange-500 text-3xl">📅</span>
                    <span className="text-xl text-gray-700 font-bold">{t(`stories.posts.${post.key}.date`)}</span>
                  </div>
                  
                  <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-tight">
                    {t(`stories.posts.${post.key}.title`)}
                  </h2>
                  
                  <div className="prose prose-lg max-w-none">
                    {post.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-800 leading-relaxed font-semibold text-lg mb-6">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  <div className="mt-12 pt-8 border-t-2 border-gray-200">
                    <Link href="/" className="text-orange-600 font-bold hover:text-orange-700 text-xl">
                      ← Back to Home
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-2xl">✝</span>
            </div>
            <div>
              <h4 className="text-2xl font-black">{t('church.name')}</h4>
              <p className="text-gray-400 font-semibold">{t('church.subtitle')}</p>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed mb-8 font-semibold text-lg max-w-4xl mx-auto">
            {t('footer.description')}
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/" className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-xl text-lg">
              {t('footer.planVisit')}
            </Link>
          </div>
          <div className="border-t-2 border-gray-800 mt-12 pt-8">
            <p className="font-bold text-lg text-gray-400">{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
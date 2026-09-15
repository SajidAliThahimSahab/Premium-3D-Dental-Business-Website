import { useMemo, useState } from 'react'
import { Play } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider.jsx'
import Lightbox from '../components/ui/Lightbox.jsx'
import InteractiveExplorer from '../components/3d/InteractiveExplorer.jsx'
import { galleryCategories, galleryItems } from '../data/galleryData.js'
import { videoTestimonials } from '../data/testimonialsData.js'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxItem, setLightboxItem] = useState(null)

  const filtered = useMemo(
    () => (activeCategory === 'All' ? galleryItems : galleryItems.filter((g) => g.category === activeCategory)),
    [activeCategory]
  )

  return (
    <div>
      <section className="container-aura py-20 lg:py-24">
        <SectionHeading
          eyebrow="Gallery & Case Studies"
          title="See the transformation, not just the after"
          description="Drag any slider to compare, or click a tile to view it larger."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
                  : 'border-white/15 text-porcelain-100/65 hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div key={item.id} className="cursor-pointer" onClick={() => setLightboxItem(item)}>
              <BeforeAfterSlider before={item.before} after={item.after} title={item.title} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-900/40 py-24">
        <div className="container-aura">
          <SectionHeading
            eyebrow="3D Dental Explorer"
            title="Click a tooth zone to see what we treat there"
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <InteractiveExplorer className="h-[380px] sm:h-[420px]" />
          </div>
        </div>
      </section>

      <section className="container-aura py-24">
        <SectionHeading eyebrow="Patient Stories" title="Video testimonials" align="center" />
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          {videoTestimonials.map((video) => (
            <button
              key={video.id}
              type="button"
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-ink-800 to-ink-900 text-left"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <Play size={20} className="ml-0.5 fill-cyan-300 text-cyan-300" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 to-transparent p-4">
                <p className="text-sm font-semibold text-porcelain-50">{video.name}</p>
                <p className="text-xs text-porcelain-100/55">{video.treatment} · {video.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  )
}

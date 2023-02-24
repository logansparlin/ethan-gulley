import { urlFor } from "@lib/sanity";
import Image from 'next/image'

export const Preload = ({ projects }) => {
  return (
    <div style={{ visibility: 'hidden', position: 'absolute', pointerEvents: 'none' }} aria-hidden={true}>
      {projects.map((project) => {
        const img = project.images?.length > 1
          ? urlFor(project.images[0]).auto('format').width(1000).dpr(2).quality(90).url()
          : urlFor(project.image.src).auto('format').width(1000).dpr(2).quality(90).url();
        return (
          <Image src={img} width={1200} height={800} alt="" aria-hidden={true} key={project._id} loading="lazy" />
        )
      })}
    </div>
  )
}
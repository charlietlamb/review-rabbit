import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'

export function Testimonials() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">
          Testimonials
        </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          What our users say
        </h2>
      </div>
      <p className="text-lg text-muted-foreground text-balance max-w-lg text-center">
        What developers and founders of top companies around the internet are
        saying about remio.
      </p>
      <div className="columns-1 gap-7 md:columns-2 lg:columns-3">
        <Card className="mt-7 inline-block break-inside-avoid shadow-lg">
          <CardContent className="flex flex-col items-start gap-4 divide-y p-7">
            <p className="text-foreground">
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Quisque nec ultrices orci. Vivamus ante arcu, hendrerit.&quot;
            </p>
            <div className="flex items-center gap-4 w-full pt-4">
              <div className="relative size-10">
                <Image
                  alt="Picture"
                  src="/images/testimonial-1.avif"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold leading-none text-foreground">
                  John
                </p>
                <p className="mt-1 leading-none text-muted-foreground">
                  @johndoe
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-7 inline-block break-inside-avoid shadow-lg">
          <CardContent className="flex flex-col items-start gap-4 divide-y p-7">
            <p className="text-foreground">
              &quot;Mauris tincidunt porttitor risus, et posuere erat malesuada
              eu. Praesent volutpat ut ipsum ac congue. Vestibulum nec orci
              ornare, imperdiet metus vel.&quot;
            </p>
            <div className="flex items-center gap-4 w-full pt-4">
              <div className="relative size-10">
                <Image
                  alt="Picture"
                  src="/images/testimonial-2.avif"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold leading-none text-foreground">
                  Max
                </p>
                <p className="mt-1 leading-none text-muted-foreground">
                  @maxcook
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-7 inline-block break-inside-avoid shadow-lg">
          <CardContent className="flex flex-col items-start gap-4 divide-y p-7">
            <p className="text-foreground">
              &quot;Curabitur at quam eget eros semper euismod vitae at neque.
              Ut ultrices ut tortor et feugiat. Etiam vitae nisi eleifend,
              blandit ligula quis, sodales neque.&quot;
            </p>
            <div className="flex items-center gap-4 w-full pt-4">
              <div className="relative size-10">
                <Image
                  alt="Picture"
                  src="/images/testimonial-3.avif"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold leading-none text-foreground">
                  Bob
                </p>
                <p className="mt-1 leading-none text-muted-foreground">
                  @thisisbob
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-7 inline-block break-inside-avoid shadow-lg">
          <CardContent className="flex flex-col items-start gap-4 divide-y p-7">
            <p className="text-foreground">
              &quot;Suspendisse a velit elit. Curabitur augue libero, vulputate
              sed dui id, sodales venenatis sem. Suspendisse dapibus neque eu
              justo volutpat gravida.&quot;
            </p>
            <div className="flex items-center gap-4 w-full pt-4">
              <div className="relative size-10">
                <Image
                  alt="Picture"
                  src="/images/testimonial-4.avif"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold leading-none text-foreground">
                  Emily
                </p>
                <p className="mt-1 leading-none text-muted-foreground">
                  @emilysmith
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-7 inline-block break-inside-avoid shadow-lg">
          <CardContent className="flex flex-col items-start gap-4 divide-y p-7">
            <p className="text-foreground">
              &quot;Vivamus dignissim porta orci, finibus tempus risus
              consectetur dapibus. Donec quis ornare elit. Curabitur
              tempor.&quot;
            </p>
            <div className="flex items-center gap-4 w-full pt-4">
              <div className="relative size-10">
                <Image
                  alt="Picture"
                  src="/images/testimonial-5.avif"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold leading-none text-foreground">
                  Micheal
                </p>
                <p className="mt-1 leading-none text-muted-foreground">
                  @michael
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-7 inline-block break-inside-avoid shadow-lg">
          <CardContent className="flex flex-col items-start gap-4 divide-y p-7">
            <p className="text-foreground">
              &quot;Nullam non lorem vitae risus volutpat dictum non sed magna.
              Aliquam in venenatis quam. Morbi feugiat tristique leo, vel
              ultrices dolor varius non.&quot;
            </p>
            <div className="flex items-center gap-4 w-full pt-4">
              <div className="relative size-10">
                <Image
                  alt="Picture"
                  src="/images/testimonial-6.avif"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold leading-none text-foreground">
                  Linda
                </p>
                <p className="mt-1 leading-none text-muted-foreground">
                  @thisislinda
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

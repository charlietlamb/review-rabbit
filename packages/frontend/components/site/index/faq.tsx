import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

export function Faq() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">
          Faq
        </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          Frequently Asked Questions
        </h2>
      </div>
      <p className="text-lg text-muted-foreground text-balance max-w-lg text-center">
        For any other questions, please feel free to contact us.
      </p>
      <Accordion
        type="single"
        collapsible
        className="mt-6 w-full divide-y max-w-3xl"
      >
        <AccordionItem value="item-0" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            How is remio different than tools like Framer or Webflow?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            remio is focused on developers and it&apos;s built on top of
            Next.js, Tailwind CSS and Shadcn UI, the most popular tech stack for
            building landing pages in the React ecosystem. This means that you
            can export your remio website to a Next.js project and continue
            building your app with the same tech stack.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            What is the learning curve for remio?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            remio is built on top of popular technologies that most frontend
            developers are familiar with. You don&apos;t have to learn new
            mental models or frameworks. If you&apos;re familiar with HTML,
            React & Tailwind, building with remio will feel like writing code
            but visually.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            Is the generated code high quality?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            Yes, we care a lot about giving you code that you can easily mantain
            and customize. If you&apos;re familiar with Next.js and Tailwind,
            the code will be very familiar and you&apos;ll be able to customize
            it with no issues.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            Do you plan to add more sections and templates?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            Yes! We&apos;re planning to add a lot more sections and templates
            for landing pages & marketing websites. If you have specific
            requests, feel free to ask in our Discord.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="border-b-0">
          <AccordionTrigger className="py-6 text-left text-lg hover:no-underline">
            Will the exported website look exactly like the preview?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-muted-foreground">
            Yes, the exported website will look exactly like you see in the
            editor and in the preview.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

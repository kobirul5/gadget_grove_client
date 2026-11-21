import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Here to Help | Gadget Grove",
  description:
    "Find helpful information about Gadget Grove products, delivery, and placing an order.",
};

const helpTopics = [
  {
    icon: ShoppingBag,
    title: "Choosing a product",
    description:
      "Review the available model, price, and specifications on each product page before adding it to your cart.",
    href: "/products",
    link: "Browse products",
  },
  {
    icon: PackageCheck,
    title: "Delivery information",
    description:
      "See what to expect from the delivery process and how cash-on-delivery checkout is shown.",
    href: "/delivery",
    link: "Read about delivery",
  },
  {
    icon: ShieldCheck,
    title: "Checking product details",
    description:
      "Use our practical checklist for model names, packaging, proof of purchase, and item-specific warranty terms.",
    href: "/genuine-products",
    link: "View the product checklist",
  },
];

const questions = [
  {
    question: "How do I add an item to my cart?",
    answer:
      "Open a product page and choose Add to Cart. You can review or update saved items from the cart panel in the header or visit the full cart page.",
    href: "/cart",
    link: "Go to your cart",
  },
  {
    question: "Can I place an order on this site?",
    answer:
      "The checkout is a storefront preview. It saves demo order details in this browser only; the store does not receive or fulfill those orders.",
    href: "/checkout",
    link: "View checkout",
  },
  {
    question: "Where can I find warranty information?",
    answer:
      "Warranty coverage can vary by product. Check the specific product listing and any documentation provided with the item.",
    href: "/genuine-products",
    link: "See what to check",
  },
];

export default function HelpPage() {
  return (
    <main className="bg-background text-text-primary">
      <section className="bg-background-soft">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <CircleHelp aria-hidden="true" className="size-5" />
              Here to help
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              A little help goes a long way.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
              Whether you’re comparing gadgets or figuring out checkout, start
              here for straightforward answers and useful links.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="help-topics-heading"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
            Useful places to start
          </p>
          <h2
            className="mt-2 text-3xl font-semibold tracking-tight"
            id="help-topics-heading"
          >
            What can we help with?
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {helpTopics.map(({ icon: Icon, title, description, href, link }) => (
            <article
              className="flex flex-col border-t border-border pt-5"
              key={title}
            >
              <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 flex-1 leading-7 text-text-secondary">
                {description}
              </p>
              <Link
                className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                href={href}
              >
                {link}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="common-questions-heading"
        className="border-t border-border bg-background-soft"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Quick answers
            </p>
            <h2
              className="mt-2 text-3xl font-semibold tracking-tight"
              id="common-questions-heading"
            >
              Common questions
            </h2>
          </div>

          <div className="mt-7 max-w-3xl divide-y divide-border border-y border-border">
            {questions.map(({ question, answer, href, link }) => (
              <details className="group py-5" key={question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                  {question}
                  <span
                    aria-hidden="true"
                    className="text-xl font-normal text-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
                  {answer}{" "}
                  <Link
                    className="font-medium text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    href={href}
                  >
                    {link}
                  </Link>
                  .
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Still browsing? We can help with that.
          </h2>
          <p className="mt-2 text-text-secondary">
            Explore the collection and take your time comparing the details.
          </p>
        </div>
        <Link
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          href="/products"
        >
          Browse products
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </section>
    </main>
  );
}

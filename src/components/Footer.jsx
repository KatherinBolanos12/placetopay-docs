import { forwardRef, Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Transition } from '@headlessui/react'

import { Button } from '@/components/Button'
import { useNavigation } from '@/hooks/useNavigation'
import { useLocale } from './LocaleProvider'
import { Logo } from '@/components/Logo'
import { ROUTES_WITH_INDEX } from '@/constants/routes-with-index'

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="10" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m6.75 10.813 2.438 2.437c1.218-4.469 4.062-6.5 4.062-6.5"
      />
    </svg>
  )
}

function FeedbackButton(props) {
  const router = useRouter()
  const [href, setHref] = useState(process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL)

  useEffect(() => {
    if (router.pathname) {
      setHref(
        process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL +
          '?RefererUrl=' +
          window.location.origin +
          router.pathname
      )
    }
  }, [router.pathname])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-gray-900/10 px-3 text-sm font-medium text-gray-600 transition hover:bg-gray-900/2.5 hover:text-gray-900 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
      {...props}
    />
  )
}

const FeedbackByLocale = {
  es: {
    title: 'Nos importa tu experiencia,',
    description: '¡Déjanos un comentario!',
    thanks: '¡Gracias por tus comentarios!',
  },
  en: {
    title: 'We care about your experience,',
    description: 'Leave us a comment!',
    thanks: 'Thanks for your feedback!',
  },
}

const FeedbackForm = forwardRef(function FeedbackForm(
  { onSubmit, locale },
  ref
) {
  return (
    <div ref={ref} className="flex items-center gap-3">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {FeedbackByLocale[locale].title}
      </p>
      <FeedbackButton onClick={onSubmit}>
        {FeedbackByLocale[locale].description}
      </FeedbackButton>
    </div>
  )
})

const FeedbackThanks = forwardRef(function FeedbackThanks({ locale }, ref) {
  return (
    <div
      ref={ref}
      className="absolute inset-0 flex justify-center md:justify-start"
    >
      <div className="flex items-center gap-3 rounded-full bg-primary-50/50 py-1 pl-1.5 pr-3 text-sm text-primary-900 ring-1 ring-inset ring-primary-500/20 dark:bg-primary-500/5 dark:text-primary-200 dark:ring-primary-500/30">
        <CheckIcon className="h-5 w-5 flex-none fill-primary-500 stroke-white dark:fill-primary-200/20 dark:stroke-primary-200" />
        {FeedbackByLocale[locale].thanks}
      </div>
    </div>
  )
})

function Feedback() {
  const { locale } = useLocale()

  let [submitted, setSubmitted] = useState(false)

  return (
    <div className="relative h-8">
      <Transition
        show={!submitted}
        as={Fragment}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        leave="pointer-events-none duration-300"
      >
        <FeedbackForm locale={locale} onSubmit={() => setSubmitted(true)} />
      </Transition>
      <Transition
        show={submitted}
        as={Fragment}
        enterFrom="opacity-0"
        enterTo="opacity-100"
        enter="delay-150 duration-300"
      >
        <FeedbackThanks locale={locale} />
      </Transition>
    </div>
  )
}

function PageLink({ label, page, previous = false, locale, hasPrefix }) {
  const href = hasPrefix ? `/${locale}${page.href}` : page.href

  if (!href) {
    return null
  }

  return (
    <>
      <Button
        href={href}
        aria-label={`${label}: ${page.title}`}
        variant="secondary"
        arrow={previous ? 'left' : 'right'}
      >
        {label}
      </Button>
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="text-base font-semibold text-gray-900 transition hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
      >
        {page.title}
      </Link>
    </>
  )
}

const PAGE_NAVIGATION_LABELS = {
  es: {
    previous: 'Anterior',
    next: 'Siguiente',
  },
  en: {
    previous: 'Previous',
    next: 'Next',
  },
}

function PageNavigation() {
  let { hasPrefix, locale } = useLocale()
  let navigation = useNavigation()
  let router = useRouter()
  let allPages = navigation.flatMap((group) => group.links)
  let currentPageIndex = allPages.findIndex((page) => {
    const pathname = hasPrefix ? router.pathname.slice(3) : router.pathname
    return page.href === pathname
  })

  if (currentPageIndex === -1) {
    return null
  }

  let previousPage = allPages[currentPageIndex - 1]
  let nextPage = allPages[currentPageIndex + 1]

  if (!previousPage && !nextPage) {
    return null
  }

  return (
    <div className="flex">
      {previousPage && (
        <div className="flex flex-col items-start gap-3">
          <PageLink
            label={PAGE_NAVIGATION_LABELS[locale].previous}
            page={previousPage}
            previous
            locale={locale}
            hasPrefix={hasPrefix}
          />
        </div>
      )}
      {nextPage && (
        <div className="ml-auto flex flex-col items-end gap-3">
          <PageLink
            label={PAGE_NAVIGATION_LABELS[locale].next}
            page={nextPage}
            locale={locale}
            hasPrefix={hasPrefix}
          />
        </div>
      )}
    </div>
  )
}

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M16.712 6.652c.01.146.01.29.01.436 0 4.449-3.267 9.579-9.242 9.579v-.003a8.963 8.963 0 0 1-4.98-1.509 6.379 6.379 0 0 0 4.807-1.396c-1.39-.027-2.608-.966-3.035-2.337.487.097.99.077 1.467-.059-1.514-.316-2.606-1.696-2.606-3.3v-.041c.45.26.956.404 1.475.42C3.18 7.454 2.74 5.486 3.602 3.947c1.65 2.104 4.083 3.382 6.695 3.517a3.446 3.446 0 0 1 .94-3.217 3.172 3.172 0 0 1 4.596.148 6.38 6.38 0 0 0 2.063-.817 3.357 3.357 0 0 1-1.428 1.861 6.283 6.283 0 0 0 1.865-.53 6.735 6.735 0 0 1-1.62 1.744Z" />
    </svg>
  )
}

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.667c-4.605 0-8.334 3.823-8.334 8.544 0 3.78 2.385 6.974 5.698 8.106.417.075.573-.182.573-.406 0-.203-.011-.875-.011-1.592-2.093.397-2.635-.522-2.802-1.002-.094-.246-.5-1.005-.854-1.207-.291-.16-.708-.556-.01-.567.656-.01 1.124.62 1.281.876.75 1.292 1.948.93 2.427.705.073-.555.291-.93.531-1.143-1.854-.213-3.791-.95-3.791-4.218 0-.929.322-1.698.854-2.296-.083-.214-.375-1.09.083-2.265 0 0 .698-.224 2.292.876a7.576 7.576 0 0 1 2.083-.288c.709 0 1.417.096 2.084.288 1.593-1.11 2.291-.875 2.291-.875.459 1.174.167 2.05.084 2.263.53.599.854 1.357.854 2.297 0 3.278-1.948 4.005-3.802 4.219.302.266.563.78.563 1.58 0 1.143-.011 2.061-.011 2.35 0 .224.156.491.573.405a8.365 8.365 0 0 0 4.11-3.116 8.707 8.707 0 0 0 1.567-4.99c0-4.721-3.73-8.545-8.334-8.545Z"
      />
    </svg>
  )
}

function DiscordIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M16.238 4.515a14.842 14.842 0 0 0-3.664-1.136.055.055 0 0 0-.059.027 10.35 10.35 0 0 0-.456.938 13.702 13.702 0 0 0-4.115 0 9.479 9.479 0 0 0-.464-.938.058.058 0 0 0-.058-.027c-1.266.218-2.497.6-3.664 1.136a.052.052 0 0 0-.024.02C1.4 8.023.76 11.424 1.074 14.782a.062.062 0 0 0 .024.042 14.923 14.923 0 0 0 4.494 2.272.058.058 0 0 0 .064-.02c.346-.473.654-.972.92-1.496a.057.057 0 0 0-.032-.08 9.83 9.83 0 0 1-1.404-.669.058.058 0 0 1-.029-.046.058.058 0 0 1 .023-.05c.094-.07.189-.144.279-.218a.056.056 0 0 1 .058-.008c2.946 1.345 6.135 1.345 9.046 0a.056.056 0 0 1 .059.007c.09.074.184.149.28.22a.058.058 0 0 1 .023.049.059.059 0 0 1-.028.046 9.224 9.224 0 0 1-1.405.669.058.058 0 0 0-.033.033.056.056 0 0 0 .002.047c.27.523.58 1.022.92 1.495a.056.056 0 0 0 .062.021 14.878 14.878 0 0 0 4.502-2.272.055.055 0 0 0 .016-.018.056.056 0 0 0 .008-.023c.375-3.883-.63-7.256-2.662-10.246a.046.046 0 0 0-.023-.021Zm-9.223 8.221c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.717 1.814-1.618 1.814Zm5.981 0c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.71 1.814-1.618 1.814Z" />
    </svg>
  )
}

function SocialLink({ href, icon: Icon, children }) {
  return (
    <Link href={href} className="group">
      <span className="sr-only">{children}</span>
      <Icon className="h-5 w-5 fill-gray-700 transition group-hover:fill-gray-900 dark:group-hover:fill-gray-500" />
    </Link>
  )
}

function SmallPrint() {
  return (
    <div className="flex flex-col items-center justify-between gap-5 border-t border-gray-900/5 pt-8 dark:border-white/5 sm:flex-row">
      <Link href="/" aria-label="Home">
        <Logo className="h-6" />
      </Link>

      <div className="flex gap-4">
        {/* <SocialLink href="#" icon={TwitterIcon}>
          Follow us on Twitter
        </SocialLink>
        <SocialLink href="#" icon={GitHubIcon}>
          Follow us on GitHub
        </SocialLink>
        <SocialLink href="#" icon={DiscordIcon}>
          Join our Discord server
        </SocialLink> */}
        <p className="text-xs">
          <span className="text-gray-300">© {new Date().getFullYear()} </span>
          <Link
            href="https://placetopay.dev/"
            target="_blank"
            aria-label="Home"
            className="font-semibold text-gray-200 hover:text-primary-500"
          >
            Evertec PlacetoPay
          </Link>
        </p>

        <Link
          className="text-xs text-gray-300 hover:text-primary-500"
          href="https://www.placetopay.com/web/politicas-de-privacidad/"
          target="_blank"
          aria-label="Política de Privacidad Placetopay"
        >
          Política de Privacidad
        </Link>
      </div>
    </div>
  )
}

const EditThisPageText = {
  es: 'Edita esta página',
  en: 'Edit this page',
}

function EditThisPage() {
  const { locale } = useLocale()
  const router = useRouter()

  const getHref = (pathname) => {
    if (pathname === '/') {
      return process.env.NEXT_PUBLIC_GITHUB_REPO_URL + '/src/pages/index.mdx'
    }

    if (ROUTES_WITH_INDEX.includes(pathname.slice(1))) {
      return (
        process.env.NEXT_PUBLIC_GITHUB_REPO_URL +
        '/src/pages' +
        pathname +
        '/index.mdx'
      )
    }

    return (
      process.env.NEXT_PUBLIC_GITHUB_REPO_URL + '/src/pages' + pathname + '.mdx'
    )
  }

  return (
    <a
      href={getHref(router.pathname)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex cursor-pointer gap-3 text-xs font-normal text-slate-600 underline underline-offset-4 dark:text-slate-400"
    >
      {EditThisPageText[locale]}
      <GitHubIcon className="h-6 w-6 fill-slate-950 dark:fill-slate-200" />
    </a>
  )
}

export function Footer({ withouLinks }) {
  return (
    <footer className="mx-auto max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
      {!withouLinks && <PageNavigation />}
      <div className="flex w-full justify-between">
        <Feedback />
        <EditThisPage />
      </div>
      <SmallPrint />
    </footer>
  )
}
